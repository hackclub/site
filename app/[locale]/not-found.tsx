import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";

async function findV3Redirect(pathname: string, search: string): Promise<string | null> {
  if (!pathname || pathname === "/" || pathname.startsWith("/_next")) {
    return null;
  }

  let target: URL;
  try {
    target = new URL(pathname.replace(/^\/+/, ""), "https://v3.hackclub.com/");
  } catch {
    return null;
  }

  if (target.origin !== "https://v3.hackclub.com" || target.pathname === "/") {
    return null;
  }

  if (search) {
    target.search = search;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status >= 200 && res.status < 300) {
      return target.toString();
    }
  } catch {
    // fall through to the 404 page.
  }

  return null;
}

export default async function NotFound() {
  const h = await headers();
  const p = h.get("x-pathname") ?? "";
  const s = h.get("x-search") ?? "";
  const v3 = await findV3Redirect(p, s);
  if (v3) {
    redirect(v3);
  }

  return <NotFoundContent locale={await getLocale()} />;
}
