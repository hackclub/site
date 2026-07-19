import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";
import { connection } from "next/server";
import {
  DIRECTORY_CATEGORIES,
  FISCAL_REGIONS,
  getClimateRegionParam,
} from "@/lib/fiscal-sponsorship-config";
import { getLocaleDomain, routing } from "@/i18n/routing";

const APP_DIR = path.join(process.cwd(), "app", "[locale]");
const EXCLUDED_PAGE_ROUTES = new Set(["/programs/edit"]);

function collectStaticRoutes(dir = APP_DIR, routeSegments: string[] = []): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === "api" || entry.name.startsWith("[") || entry.name.startsWith("(")) {
        continue;
      }

      routes.push(
        ...collectStaticRoutes(path.join(dir, entry.name), [...routeSegments, entry.name]),
      );
      continue;
    }

    if (entry.name !== "page.tsx") {
      continue;
    }

    const route = `/${routeSegments.join("/")}`.replace(/\/+/g, "/");
    if (!EXCLUDED_PAGE_ROUTES.has(route)) {
      routes.push(route === "" ? "/" : route);
    }
  }

  return routes;
}

function withLocales(pathName: string): MetadataRoute.Sitemap {
  const path = pathName === "/" ? "" : pathName;
  return routing.locales.map((locale) => ({
    url: `${getLocaleDomain(locale)}${path}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${getLocaleDomain(loc)}${path}`]),
      ),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const staticRoutes = collectStaticRoutes();
  const urls: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    urls.push(...withLocales(route));
  }

  for (const category of DIRECTORY_CATEGORIES) {
    urls.push(...withLocales(`/fiscal-sponsorship/directory/${encodeURIComponent(category.id)}`));
  }

  for (const region of FISCAL_REGIONS) {
    urls.push(
      ...withLocales(
        `/fiscal-sponsorship/climate/${encodeURIComponent(getClimateRegionParam(region))}`,
      ),
    );
  }

  for (const category of DIRECTORY_CATEGORIES) {
    for (const region of FISCAL_REGIONS) {
      urls.push(
        ...withLocales(
          `/fiscal-sponsorship/directory/${encodeURIComponent(category.id)}/${encodeURIComponent(region.slug)}`,
        ),
      );
    }
  }

  return urls;
}
