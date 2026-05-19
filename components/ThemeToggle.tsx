"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const read = (): Theme =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

export function useTheme(): [Theme, () => void] {
  const [t, setT] = useState<Theme>("light");

  useEffect(() => {
    setT(read());
    document.documentElement.classList.add("theme-ready");
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    const r = document.documentElement;
    r.classList.toggle("dark", next === "dark");
    r.style.colorScheme = next;
    try {
      localStorage.setItem("hc-site-theme", next);
    } catch {}
    setT(next);
  }, []);

  return [t, toggle];
}

export function ThemeLock() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-lock", "light");
    return () => document.documentElement.removeAttribute("data-theme-lock");
  }, []);
  return null;
}

export function ThemeToggle() {
  const [t, toggle] = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && document.documentElement.dataset.themeLock) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${t === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      aria-pressed={mounted ? t === "dark" : undefined}
      className="grid place-items-center w-10 h-10 rounded-full border border-border bg-surface hover:bg-surface-hover transition-colors"
    >
      <span suppressHydrationWarning aria-hidden="true">
        {mounted && t === "dark" ? "B" : "D"}
      </span>
    </button>
  );
}
