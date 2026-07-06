"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

const valid = (value: string | undefined | null): value is Theme =>
  value === "light" || value === "dark" || value === "system";

const storage = (): [Theme | undefined, boolean] => {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return [undefined, false];
    const v = localStorage.getItem("hc-site-theme");
    return [valid(v) ? v : undefined, true];
  } catch {
    return [undefined, false];
  }
};

const getStored = (): Theme => storage()[0] ?? "system";

const read = (): Theme => {
  if (typeof document === "undefined") return "light";
  const [s, ok] = storage();
  const r = document.documentElement;
  const d = r.dataset.hcSiteTheme;
  return s ?? (valid(d) ? d : ok ? "system" : r.classList.contains("dark") ? "dark" : "light");
};

const subscribe = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-hc-site-theme"],
  });
  const onStorage = () => cb();
  const onCustom = () => cb();
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
    document.documentElement.addEventListener("hc-theme-changed", onCustom as EventListener);
  }

  return () => {
    observer.disconnect();
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
      document.documentElement.removeEventListener("hc-theme-changed", onCustom as EventListener);
    }
  };
};

export function useTheme(): [Theme, (mode?: Theme) => void] {
  const t = useSyncExternalStore<Theme>(subscribe, read, () => "light");

  useEffect(() => {
    document.documentElement.classList.add("theme-ready");
  }, []);

  // apply stored theme on mount so reload reflects saved preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = getStored();
    const r = document.documentElement;
    if (stored === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      r.classList.toggle("dark", prefersDark);
      r.style.colorScheme = prefersDark ? "dark" : "light";
      try {
        r.dataset.hcSiteTheme = "system";
      } catch {}
    } else {
      r.classList.toggle("dark", stored === "dark");
      r.style.colorScheme = stored;
      try {
        r.dataset.hcSiteTheme = stored;
      } catch {}
    }
  }, []);

  const setTheme = useCallback((mode?: Theme) => {
    const r = document.documentElement;
    try {
      if (!mode) {
        // legacy toggle behaviour
        const next: Theme = read() === "dark" ? "light" : "dark";
        r.classList.toggle("dark", next === "dark");
        r.style.colorScheme = next;
        try {
          localStorage.setItem("hc-site-theme", next);
        } catch {}
        try {
          r.dataset.hcSiteTheme = next;
        } catch {}
        try {
          document.documentElement.dispatchEvent(new CustomEvent("hc-theme-changed"));
        } catch {}
        return;
      }

      if (mode === "system") {
        try {
          localStorage.setItem("hc-site-theme", "system");
        } catch {}
        try {
          r.dataset.hcSiteTheme = "system";
        } catch {}
        try {
          document.documentElement.dispatchEvent(new CustomEvent("hc-theme-changed"));
        } catch {}
        const prefersDark =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        r.classList.toggle("dark", prefersDark);
        r.style.colorScheme = prefersDark ? "dark" : "light";
        return;
      }

      // light or dark
      try {
        localStorage.setItem("hc-site-theme", mode);
      } catch {}
      try {
        r.dataset.hcSiteTheme = mode;
      } catch {}
      try {
        document.documentElement.dispatchEvent(new CustomEvent("hc-theme-changed"));
      } catch {}
      r.classList.toggle("dark", mode === "dark");
      r.style.colorScheme = mode;
    } catch {}
  }, []);

  // When stored preference is "system", keep the DOM in sync with OS changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (t !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = "matches" in e ? e.matches : mql.matches;
      const r = document.documentElement;
      r.classList.toggle("dark", matches);
      r.style.colorScheme = matches ? "dark" : "light";
    };
    handler(mql);
    if (mql.addEventListener) mql.addEventListener("change", handler as any);
    else mql.addListener(handler as any);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handler as any);
      else mql.removeListener(handler as any);
    };
  }, [t]);

  return [t, setTheme as unknown as () => void];
}

export function ThemeLock() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-lock", "light");
    return () => document.documentElement.removeAttribute("data-theme-lock");
  }, []);
  return null;
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M15.001 5C15.001 4.448 15.449 4 16.001 4C16.553 4 17.001 4.448 17.001 5V7C17.001 7.552 16.553 8 16.001 8C15.449 8 15.001 7.552 15.001 7V5ZM9.12203 7.707C8.73203 7.317 8.09903 7.317 7.70803 7.707C7.31803 8.098 7.31803 8.731 7.70803 9.121L9.12203 10.536C9.51303 10.926 10.146 10.926 10.537 10.536C10.927 10.145 10.927 9.512 10.537 9.121L9.12203 7.707ZM24.536 7.707C24.146 7.317 23.513 7.317 23.122 7.707L21.708 9.121C21.318 9.512 21.318 10.145 21.708 10.536C22.099 10.926 22.732 10.926 23.122 10.536L24.537 9.121C24.927 8.731 24.926 8.098 24.536 7.707Z" />
      <path d="M20.001 16.176C20.001 13.815 18.156 12 16.001 12C13.846 12 12.001 13.815 12.001 16.176H10.001C10.001 12.765 12.687 10 16.001 10C19.315 10 22.001 12.765 22.001 16.176H20.001Z" />
      <path d="M15.001 27.1694C15.001 27.7214 15.449 28.1694 16.001 28.1694C16.553 28.1694 17.001 27.7214 17.001 27.1694V25.1694C17.001 24.6174 16.553 24.1694 16.001 24.1694C15.449 24.1694 15.001 24.6174 15.001 25.1694V27.1694ZM9.122 24.4624C8.732 24.8524 8.099 24.8524 7.708 24.4624C7.318 24.0714 7.318 23.4384 7.708 23.0484L9.122 21.6334C9.513 21.2434 10.146 21.2434 10.537 21.6334C10.927 22.0244 10.927 22.6574 10.537 23.0484L9.122 24.4624ZM24.536 24.4624C24.146 24.8524 23.513 24.8524 23.122 24.4624L21.708 23.0484C21.318 22.6574 21.318 22.0244 21.708 21.6334C22.099 21.2434 22.732 21.2434 23.122 21.6334L24.537 23.0484C24.927 23.4384 24.926 24.0714 24.536 24.4624ZM27 17.1694C27.552 17.1694 28 16.7214 28 16.1694C28 15.6174 27.552 15.1694 27 15.1694H25C24.448 15.1694 24 15.6174 24 16.1694C24 16.7214 24.448 17.1694 25 17.1694H27ZM8 16.1694C8 16.7214 7.552 17.1694 7 17.1694H5C4.448 17.1694 4 16.7214 4 16.1694C4 15.6174 4.448 15.1694 5 15.1694H7C7.552 15.1694 8 15.6174 8 16.1694Z" />
      <path d="M20.001 16.1741C20.001 18.5351 18.156 20.3501 16.001 20.3501C13.846 20.3501 12.001 18.5351 12.001 16.1741H10.001C10.001 19.5851 12.687 22.3501 16.001 22.3501C19.315 22.3501 22.001 19.5851 22.001 16.1741H20.001Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M22.5317 23.4697C22.5313 23.4697 22.5308 23.4697 22.5303 23.4697C14.7983 23.4697 8.53027 17.2017 8.53027 9.46974C8.53027 9.46925 8.53027 9.46876 8.53027 9.46827C7.2733 11.1407 6.53027 13.2183 6.53027 15.4697C6.53027 20.9926 11.0074 25.4697 16.5303 25.4697C18.7817 25.4697 20.8593 24.7267 22.5317 23.4697ZM24.9529 21.2251C25.8563 21.0399 26.6747 21.9485 26.1197 22.6849C23.9298 25.591 20.4494 27.4697 16.5303 27.4697C9.90286 27.4697 4.53027 22.0972 4.53027 15.4697C4.53027 11.5506 6.40906 8.07026 9.3151 5.88028C10.0515 5.32532 10.9601 6.14376 10.7749 7.04709C10.6145 7.82957 10.5303 8.63981 10.5303 9.46974C10.5303 16.0972 15.9029 21.4697 22.5303 21.4697C23.3602 21.4697 24.1704 21.3855 24.9529 21.2251Z" />
    </svg>
  );
}

const noopSubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export function ThemeToggle({ variant = "nav" }: { variant?: "nav" | "footer" }) {
  const [t, setTheme] = useTheme();
  const mounted = useIsMounted();

  if (mounted && document.documentElement.dataset.themeLock) return null;

  const isDark = mounted && t === "dark";
  const _isLight = mounted && t === "light";
  const isSystem = mounted && t === "system";

  // Single circular toggle that cycles: light -> system -> dark -> light
  const cycle = () => {
    const next: Theme = t === "light" ? "system" : t === "system" ? "dark" : "light";
    setTheme(next);
  };

  const SystemIcon = () => (
    <svg
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.414"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="contrast"
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      width="20"
      height="20"
    >
      <path d="M16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6V26ZM16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28Z" />
    </svg>
  );

  if (variant === "footer") {
    return (
      <button
        type="button"
        onClick={cycle}
        aria-label={mounted ? `Current theme ${t}` : "Toggle theme"}
        aria-pressed={mounted ? (t === "dark" ? true : false) : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--paper)",
          opacity: 0.8,
          fontSize: 16,
          fontFamily: "var(--font-phantom)",
          fontWeight: 400,
          padding: 0,
          transition: "opacity 0.15s",
        }}
        className="footer-theme-toggle"
      >
        <span suppressHydrationWarning style={{ display: "flex", alignItems: "center" }}>
          {isDark ? <MoonIcon /> : isSystem ? <SystemIcon /> : <SunIcon />}
        </span>
        <span suppressHydrationWarning>
          {isSystem ? "System mode" : isDark ? "Dark mode" : "Light mode"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={mounted ? `Current theme ${t}` : "Toggle theme"}
      aria-pressed={mounted ? (t === "dark" ? true : false) : undefined}
      className="grid place-items-center w-10 h-10 rounded-full border border-border bg-surface text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
    >
      <span suppressHydrationWarning aria-hidden="true">
        {isDark ? <MoonIcon /> : isSystem ? <SystemIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
