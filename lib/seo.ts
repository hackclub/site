import type { Metadata } from "next";
import { getLocaleDomain, routing } from "@/i18n/routing";

export const SITE_NAME = "Hack Club";
export const SITE_TITLE = "Hack Club — Where teens make cool stuff.";
export const SITE_DESCRIPTION =
  "Hack Club is the world's largest nonprofit movement of teenagers making cool projects.";
export const SITE_URL = "https://hackclub.com";

type PageMetadataInput = {
  title: string;
  description: string;
  canonical: string;
  locale?: string;
  image?: string;
  imageAlt?: string;
};

export function buildPageMetadata({
  title,
  description,
  canonical,
  locale = routing.defaultLocale,
  image = "https://cdn.hackclub.com/019db4df-dc7a-7270-94b5-df621a60c7ca/splash.png",
  imageAlt = SITE_NAME,
}: PageMetadataInput): Metadata {
  const origin = getLocaleDomain(locale);
  const path = canonical.startsWith("http")
    ? new URL(canonical).pathname
    : canonical.startsWith("/")
      ? canonical
      : `/${canonical}`;
  const absoluteCanonical = canonical.startsWith("http") ? canonical : `${origin}${path}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${getLocaleDomain(loc)}${path === "/" ? "" : path}`;
  }
  languages["x-default"] = `${getLocaleDomain("en")}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteCanonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteCanonical,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function siteUrlForLocale(locale: string): string {
  return getLocaleDomain(locale);
}
