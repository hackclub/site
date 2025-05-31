import os
import re
import subprocess
import io
import json
import mimetypes
import concurrent.futures
import time
from pathlib import Path
import shutil  # For cleaning up temp directory
import threading  # For running HTTP server
import http.server
import socketserver

try:
    from PIL import Image
except ImportError:
    print("Pillow library not found. Please install it: pip install Pillow")
    exit(1)
try:
    import requests
except ImportError:
    print("Requests library not found. Please install it: pip install requests")
    exit(1)
try:
    from pathspec import PathSpec
    from pathspec.patterns import GitWildMatchPattern
except ImportError:
    print("pathspec library not found. Please install it: pip install pathspec")
    PathSpec = None

# --- Configuration ---
CDN_DOMAIN = "hc-cdn.hel1.your-objectstorage.com"
CDN_URL_PATTERN = re.compile(rf"https?://{re.escape(CDN_DOMAIN)}/[^\s\"\'\`\<\>]+")
HC_CDN_API_ENDPOINT = "https://cdn.hackclub.com/api/v3/new"
HC_CDN_API_KEY = "beans"

WEBP_CONVERTIBLE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}
GIF_EXTENSION = ".gif"
SVG_EXTENSION = ".svg"

BINARY_CHECK_CHUNK_SIZE = 1024 * 1024
MAX_CDN_UPLOAD_RETRIES = 3
INITIAL_RETRY_DELAY_SECONDS = 5
TEMP_ASSET_DIR_NAME = "temp_optimized_assets_for_cdn"
LOCAL_SERVER_PORT = 8001  # Choose an available port


# --- HTTP Server ---
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=TEMP_ASSET_DIR_NAME, **kwargs)


httpd_server_global = None  # To control the server


def start_local_http_server(port, directory):
    global httpd_server_global
    # Ensure directory exists
    Path(directory).mkdir(parents=True, exist_ok=True)

    # Change CWD for SimpleHTTPRequestHandler to serve from the correct directory
    # This is a bit of a hack for SimpleHTTPRequestHandler. A more robust server
    # would take the directory as a direct argument for serving.
    # For this script, we'll manage it by ensuring the handler is initialized
    # with the directory.

    # The Handler class is already modified to use the `directory` parameter.
    # So, we don't need to os.chdir here if the Handler is correctly set up.

    try:
        httpd_server_global = socketserver.TCPServer(("", port), Handler)
        print(f"Serving optimized files locally on http://localhost:{port}")
        print(f"Serving from directory: {Path(directory).resolve()}")
        httpd_server_global.serve_forever()
    except OSError as e:
        print(f"!!! Could not start local HTTP server on port {port}: {e}")
        print("!!! Please ensure the port is free or change LOCAL_SERVER_PORT.")
        httpd_server_global = None  # Ensure it's None if failed
    except Exception as e:
        print(f"!!! Local HTTP server error: {e}")
        httpd_server_global = None


def stop_local_http_server():
    global httpd_server_global
    if httpd_server_global:
        print("Shutting down local HTTP server...")
        httpd_server_global.shutdown()
        httpd_server_global.server_close()
        httpd_server_global = None
        print("Local HTTP server stopped.")


# --- Helper Functions (is_binary_file, get_gitignore_spec, get_project_files remain the same) ---
def is_binary_file(filepath):
    try:
        with open(filepath, "rb") as f:
            chunk = f.read(BINARY_CHECK_CHUNK_SIZE)
        if not chunk:
            return False
        return b"\0" in chunk
    except IOError:
        return True


def get_gitignore_spec(project_root_path):
    if not PathSpec:
        return None
    gitignore_path = project_root_path / ".gitignore"
    patterns = []
    if gitignore_path.is_file():
        with open(gitignore_path, "r", encoding="utf-8") as f:
            patterns = [
                line
                for line in f.read().splitlines()
                if line.strip() and not line.startswith("#")
            ]
    if patterns:
        return PathSpec.from_lines(GitWildMatchPattern, patterns)
    return None


def get_project_files(project_root):
    project_root_path = Path(project_root).resolve()
    gitignore_spec = get_gitignore_spec(project_root_path)
    default_ignores = {".git", "node_modules", TEMP_ASSET_DIR_NAME}

    for root, dirs, files in os.walk(project_root_path, topdown=True):
        current_path = Path(root)
        dirs_to_remove = set()
        for d_name in dirs:
            dir_path = current_path / d_name
            dir_rel_path = dir_path.relative_to(project_root_path)
            if d_name in default_ignores or (
                gitignore_spec
                and (
                    gitignore_spec.match_file(str(dir_rel_path))
                    or gitignore_spec.match_file(str(dir_rel_path) + "/")
                )
            ):
                dirs_to_remove.add(d_name)
        dirs[:] = [d for d in dirs if d not in dirs_to_remove]

        for filename in files:
            file_path = current_path / filename
            relative_file_path = file_path.relative_to(project_root_path)
            if gitignore_spec and gitignore_spec.match_file(str(relative_file_path)):
                continue
            if any(part in default_ignores for part in relative_file_path.parts):
                continue
            if not is_binary_file(file_path):
                yield file_path


def process_single_url(url_info, temp_dir_path, url_counter):
    original_url = url_info["url"]
    print(f"Processing URL: {original_url}")
    try:
        response = requests.get(original_url, timeout=30)
        response.raise_for_status()
        content_bytes = response.content
        original_size = len(content_bytes)
    except requests.RequestException as e:
        print(f"Error downloading {original_url}: {e}")
        return None

    file_ext_original = Path(original_url).suffix.lower()
    original_filename_stem = Path(original_url).stem
    optimized_content_bytes = content_bytes
    new_file_ext = file_ext_original
    optimization_applied = False

    try:
        if file_ext_original in WEBP_CONVERTIBLE_EXTENSIONS:
            img = Image.open(io.BytesIO(content_bytes))
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGBA")
            buffer = io.BytesIO()
            img.save(buffer, format="WEBP", quality=80)
            optimized_content_bytes = buffer.getvalue()
            new_file_ext = ".webp"
            optimization_applied = True
        elif file_ext_original == GIF_EXTENSION:
            img = Image.open(io.BytesIO(content_bytes))
            buffer = io.BytesIO()
            img.save(buffer, format="GIF", save_all=True, optimize=True)
            temp_opt = buffer.getvalue()
            if len(temp_opt) < len(content_bytes):
                optimized_content_bytes = temp_opt
                optimization_applied = True
            # new_file_ext remains .gif
        elif file_ext_original == SVG_EXTENSION:
            svg_text = content_bytes.decode("utf-8", errors="replace")
            process = subprocess.run(
                ["svgo", "-", "-o", "-"],
                input=svg_text,
                capture_output=True,
                text=True,
                check=False,
                encoding="utf-8",
            )
            if process.returncode == 0:
                opt_svg_bytes = process.stdout.encode("utf-8")
                if len(opt_svg_bytes) < len(content_bytes):
                    optimized_content_bytes = opt_svg_bytes
                    optimization_applied = True
                new_file_ext = ".svg"  # remains svg
            else:
                print(f"SVGO failed for {original_url}: {process.stderr}")
    except Exception as e:
        print(f"Error optimizing {original_url}: {e}")
        optimized_content_bytes = content_bytes
        optimization_applied = False

    optimized_size = len(optimized_content_bytes)
    local_filename = None
    publicly_accessible_url_via_tunnel = None  # This will be filled later

    if (
        optimization_applied
        and optimized_size < original_size
        or (optimization_applied and new_file_ext != file_ext_original)
    ):
        # Create a unique-ish local filename
        # Using a counter + original stem + new extension
        safe_stem = re.sub(r"[^\w\-_\.]", "_", original_filename_stem)  # Sanitize stem
        local_filename = f"{url_counter}_{safe_stem}{new_file_ext}"
        local_filepath = temp_dir_path / local_filename
        try:
            with open(local_filepath, "wb") as f:
                f.write(optimized_content_bytes)
            print(f"  Saved optimized version locally as: {local_filepath.name}")
        except IOError as e:
            print(f"  Error saving optimized file {local_filename}: {e}")
            local_filename = None  # Failed to save
    else:
        print(f"  No effective optimization for {original_url}, skipping local save.")

    return {
        "original_url": original_url,
        "original_size": original_size,
        "optimized_size": optimized_size,
        "local_filename": local_filename,  # Filename within TEMP_ASSET_DIR_NAME
        "publicly_accessible_url_via_tunnel": publicly_accessible_url_via_tunnel,
        "original_file_paths": url_info["original_file_paths"],
        "optimization_applied_successfully": local_filename is not None,
    }


def main(project_dir_str):
    project_dir = Path(project_dir_str).resolve()
    temp_assets_full_path = project_dir / TEMP_ASSET_DIR_NAME

    # Clean up old temp directory if it exists
    if temp_assets_full_path.exists():
        print(f"Removing old temporary directory: {temp_assets_full_path}")
        shutil.rmtree(temp_assets_full_path)
    temp_assets_full_path.mkdir(parents=True, exist_ok=True)
    print(f"Created temporary directory for optimized assets: {temp_assets_full_path}")

    print(f"Scanning project: {project_dir}")
    all_urls_map = {}
    # ... (get_project_files logic as before)
    for file_path in get_project_files(project_dir):
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            found_urls = CDN_URL_PATTERN.findall(content)
            for url in found_urls:
                if url not in all_urls_map:
                    all_urls_map[url] = set()
                all_urls_map[url].add(file_path)
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")

    if not all_urls_map:
        print("No matching CDN URLs found.")
        shutil.rmtree(temp_assets_full_path)
        return

    print(f"Found {len(all_urls_map)} unique CDN URLs to process.")

    url_processing_args = []
    for i, (url, paths) in enumerate(all_urls_map.items()):
        url_processing_args.append(
            {
                "url_info": {"url": url, "original_file_paths": paths},
                "temp_dir_path": temp_assets_full_path,
                "url_counter": i,
            }
        )

    processed_results = []
    with concurrent.futures.ThreadPoolExecutor(
        max_workers=os.cpu_count() or 4
    ) as executor:
        future_to_url_info = {
            executor.submit(process_single_url, **arg): arg
            for arg in url_processing_args
        }
        for future in concurrent.futures.as_completed(future_to_url_info):
            try:
                result = future.result()
                if result:
                    processed_results.append(result)
            except Exception as exc:
                print(f"A worker thread generated an exception: {exc}")

    items_to_serve_locally = [
        res for res in processed_results if res.get("local_filename")
    ]

    if not items_to_serve_locally:
        print("\nNo files were effectively optimized and saved locally.")
        shutil.rmtree(temp_assets_full_path)
        return

    print(
        f"\nSuccessfully optimized and saved {len(items_to_serve_locally)} assets to '{TEMP_ASSET_DIR_NAME}/'"
    )

    # Start local HTTP server in a separate thread
    server_thread = threading.Thread(
        target=start_local_http_server,
        args=(LOCAL_SERVER_PORT, str(temp_assets_full_path)),  # Pass full path
        daemon=True,
    )
    server_thread.start()
    time.sleep(2)  # Give server a moment to start

    if httpd_server_global is None:  # Check if server started successfully
        print("Local HTTP server failed to start. Cannot proceed with localtunnel.")
        shutil.rmtree(temp_assets_full_path)
        return

    print("\n--- ACTION REQUIRED ---")
    print(f"1. A local HTTP server is running on http://localhost:{LOCAL_SERVER_PORT}")
    print(f"   It's serving files from: {temp_assets_full_path}")
    print("2. In a NEW terminal window, run localtunnel to expose this port:")
    print(f"   lt --port {LOCAL_SERVER_PORT}")
    print("3. Localtunnel will give you a public URL (e.g., https://xyz.loca.lt).")
    localtunnel_base_url = ""
    while not localtunnel_base_url.startswith("https://"):
        localtunnel_base_url = input(
            "4. Paste your public localtunnel URL here and press Enter: "
        ).strip()
        if not localtunnel_base_url.startswith("https://"):
            print("Invalid URL. It must start with 'https://'. Please try again.")

    # Ensure no trailing slash from user input for consistency
    localtunnel_base_url = localtunnel_base_url.rstrip("/")

    urls_for_cdn_api = []
    for item in items_to_serve_locally:
        item["publicly_accessible_url_via_tunnel"] = (
            f"{localtunnel_base_url}/{item['local_filename']}"
        )
        urls_for_cdn_api.append(item["publicly_accessible_url_via_tunnel"])

    url_replacement_map = {}
    if urls_for_cdn_api:
        print(
            f"\nAttempting to register {len(urls_for_cdn_api)} assets with HC CDN via localtunnel URLs..."
        )
        headers = {
            "Authorization": f"Bearer {HC_CDN_API_KEY}",
            "Content-Type": "application/json",
        }
        payload = json.dumps(urls_for_cdn_api)  # List of public URLs

        for attempt in range(MAX_CDN_UPLOAD_RETRIES):
            try:
                print(
                    f"Sending to CDN API: {urls_for_cdn_api[:3]} ... (and more if any)"
                )  # Log a few
                response = requests.post(
                    HC_CDN_API_ENDPOINT, headers=headers, data=payload, timeout=180
                )
                response.raise_for_status()
                cdn_response_data = response.json()

                if "files" in cdn_response_data and len(
                    cdn_response_data["files"]
                ) == len(items_to_serve_locally):
                    print("CDN registration successful.")
                    for i, cdn_file_info in enumerate(cdn_response_data["files"]):
                        # Match based on the order, assuming API returns in same order
                        original_item_info = items_to_serve_locally[i]
                        old_url = original_item_info["original_url"]
                        new_cdn_url = cdn_file_info["deployedUrl"]
                        url_replacement_map[old_url] = new_cdn_url
                        print(f"  Mapped: {old_url} \n  To New: {new_cdn_url}")
                    break
                else:
                    # ... (error handling as before) ...
                    print(
                        "CDN API response issue: 'files' array missing or length mismatch."
                    )
                    print(f"Response: {cdn_response_data}")
                    if attempt == MAX_CDN_UPLOAD_RETRIES - 1:
                        print("Max retries for CDN structural issue.")

            except requests.exceptions.HTTPError as e:
                # ... (error handling as before) ...
                print(f"HTTP error during CDN registration: {e}")
                if e.response is not None:
                    print(
                        f"Status: {e.response.status_code}, Body: {e.response.text[:200]}"
                    )
                if (
                    e.response is not None and e.response.status_code < 500
                ) or attempt == MAX_CDN_UPLOAD_RETRIES - 1:
                    break
                time.sleep(INITIAL_RETRY_DELAY_SECONDS * (2**attempt))
            except requests.exceptions.RequestException as e:
                # ... (error handling as before) ...
                print(f"Request error during CDN registration: {e}")
                if attempt == MAX_CDN_UPLOAD_RETRIES - 1:
                    break
                time.sleep(INITIAL_RETRY_DELAY_SECONDS * (2**attempt))
        else:
            print("All retries for CDN registration failed. Skipping.")

    # --- Stop localtunnel and server ---
    print("\n--- ACTION REQUIRED ---")
    print("You can now STOP your `localtunnel` process (Ctrl+C in its terminal).")
    input(
        "Press Enter here once localtunnel is stopped to shut down the local HTTP server and clean up..."
    )

    stop_local_http_server()

    # --- File Replacement (as before, but uses url_replacement_map) ---
    if url_replacement_map:
        print("\nReplacing URLs in project files...")
        # ... (file replacement logic as in previous script)
        files_to_update_overall = set()
        for old_url in url_replacement_map.keys():
            # Find the original item info to get the file paths
            # This assumes items_to_serve_locally still holds the relevant data
            for item_info in items_to_serve_locally:
                if item_info["original_url"] == old_url:
                    files_to_update_overall.update(item_info["original_file_paths"])
                    break

        for file_path_obj in files_to_update_overall:
            try:
                with open(file_path_obj, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()

                modified_content = content
                replacements_made_in_file = False
                for old_url, new_url in url_replacement_map.items():
                    if old_url in modified_content:
                        modified_content = modified_content.replace(old_url, new_url)
                        replacements_made_in_file = True

                if replacements_made_in_file and modified_content != content:
                    with open(file_path_obj, "w", encoding="utf-8") as f:
                        f.write(modified_content)
                    print(f"  Updated: {file_path_obj.relative_to(project_dir)}")
            except Exception as e:
                print(f"Error updating file {file_path_obj}: {e}")
    else:
        print(
            "\nNo URLs to replace (CDN registration might have failed or no mappings received)."
        )

    # --- Reporting (as before) ---
    total_original_size_all = sum(
        res.get("original_size", 0) for res in processed_results
    )
    total_optimized_size_local = sum(
        res.get("optimized_size", 0)
        for res in processed_results
        if res.get("local_filename")
    )

    print("\n--- Overall Summary ---")
    # ... (summary logic as in previous script) ...
    print(f"Scanned {len(all_urls_map)} unique CDN URLs from your project.")
    print(f"Locally processed {len(processed_results)} URLs for optimization.")
    successfully_optimized_count = len(items_to_serve_locally)
    print(
        f"Successfully optimized and saved {successfully_optimized_count} assets locally."
    )

    if urls_for_cdn_api:
        print(f"Attempted to register {len(urls_for_cdn_api)} assets with HC CDN.")
        if url_replacement_map:
            print(
                f"Successfully mapped and replaced {len(url_replacement_map)} assets with new CDN URLs."
            )
    else:
        print("No assets were eligible for CDN registration.")

    print(f"Total original size: {total_original_size_all / (1024*1024):.2f} MB")
    print(
        f"Total size after local optimization (of saved files): {total_optimized_size_local / (1024*1024):.2f} MB"
    )
    if total_original_size_all > 0 and successfully_optimized_count > 0:
        # For savings, consider only the assets that were actually optimized and saved
        original_size_of_optimized = sum(
            res.get("original_size", 0) for res in items_to_serve_locally
        )
        savings_local = original_size_of_optimized - total_optimized_size_local
        savings_percentage = (
            (savings_local / original_size_of_optimized) * 100
            if original_size_of_optimized > 0
            else 0
        )
        print(
            f"File size savings for optimized assets: {savings_local / (1024*1024):.2f} MB ({savings_percentage:.2f}%)"
        )

    # --- Final Cleanup ---
    print(f"Cleaning up temporary directory: {temp_assets_full_path}")
    shutil.rmtree(temp_assets_full_path)
    print("Done.")


if __name__ == "__main__":
    project_directory_input = input(
        "Enter the path to your Next.js pages router project (e.g., '.' for current directory): "
    )
    # ... (project path validation as before) ...
    resolved_project_dir = Path(project_directory_input).resolve()
    if not resolved_project_dir.is_dir():
        print(f"Error: Project directory '{resolved_project_dir}' not found.")
    else:
        # Basic Next.js project check (optional)
        pages_dir = resolved_project_dir / "pages"
        src_pages_dir = resolved_project_dir / "src" / "pages"
        if not pages_dir.is_dir() and not src_pages_dir.is_dir():
            print(f"Warning: '{resolved_project_dir}' might not be a Next.js project.")
        main(str(resolved_project_dir))
