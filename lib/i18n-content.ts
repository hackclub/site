import fs from "node:fs";
import path from "node:path";
import { routing, type AppLocale } from "@/i18n/routing";

export function loadMarkdownContent(slug: string, locale: string): string {
  const safeLocale = routing.locales.includes(locale as AppLocale) ? locale : routing.defaultLocale;
  const localized = path.join(process.cwd(), "content", safeLocale, `${slug}.md`);
  if (fs.existsSync(localized)) {
    return fs.readFileSync(localized, "utf-8");
  }
  // fallbacks
  const en = path.join(process.cwd(), "content", "en", `${slug}.md`);
  if (fs.existsSync(en)) return fs.readFileSync(en, "utf-8");
  return fs.readFileSync(path.join(process.cwd(), "content", `${slug}.md`), "utf-8");
}
