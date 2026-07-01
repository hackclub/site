"use client";

export function SkipToMainLink() {
  return (
    <a
      href="#main"
      className="skip-to-content"
      onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main") ?? document.querySelector("main");
        if (!main) return;
        if (!main.id) {
          main.id = "main";
        }
        if (!main.hasAttribute("tabindex")) {
          main.setAttribute("tabindex", "-1");
        }
        main.scrollIntoView({ block: "start" });
        main.focus({ preventScroll: true });
        window.history.replaceState(null, "", "#main");
      }}
    >
      Skip to Main Content
    </a>
  );
}
