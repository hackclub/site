import { defineRouting } from "next-intl/routing";

const isProd = process.env.NODE_ENV === "production";

const productionDomains = [
  {
    domain: "hackclub.com",
    defaultLocale: "en" as const,
    locales: ["en" as const],
  },
  {
    domain: "ru.hackclub.com",
    defaultLocale: "ru" as const,
    locales: ["ru" as const],
  },
];

const developmentDomains = [
  {
    domain: "localhost:3000",
    defaultLocale: "en" as const,
    locales: ["en" as const],
  },
  {
    domain: "ru.localhost:3000",
    defaultLocale: "ru" as const,
    locales: ["ru" as const],
  },
];

export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localePrefix: "never",
  localeDetection: false,
  domains: isProd ? productionDomains : developmentDomains,
});

export type AppLocale = (typeof routing.locales)[number];

export const localeDomains: Record<AppLocale, string> = {
  en: "https://hackclub.com",
  ru: "https://ru.hackclub.com",
};

export function getLocaleDomain(locale: string): string {
  if (locale in localeDomains) {
    return localeDomains[locale as AppLocale];
  }
  return localeDomains.en;
}
