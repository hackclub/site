import type { MetadataRoute } from "next";
import { getLocaleDomain, routing } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: routing.locales.map((locale) => `${getLocaleDomain(locale)}/sitemap.xml`),
  };
}
