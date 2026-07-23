import fs from "node:fs";
import path from "node:path";
import { routing, type AppLocale } from "@/i18n/routing";

export type MarkdownContentResult = {
  content: string;
  isTranslation: boolean;
};

export function loadMarkdownContent(slug: string, locale: string): MarkdownContentResult {
  const safeLocale = routing.locales.includes(locale as AppLocale) ? locale : routing.defaultLocale;
  const root = path.join(process.cwd(), "content", `${slug}.md`);

  if (safeLocale !== routing.defaultLocale) {
    const localized = path.join(process.cwd(), "content", safeLocale, `${slug}.md`);
    if (fs.existsSync(localized)) {
      return { content: fs.readFileSync(localized, "utf-8"), isTranslation: true };
    }
  }

  return { content: fs.readFileSync(root, "utf-8"), isTranslation: false };
}
