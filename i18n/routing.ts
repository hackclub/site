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
  {
    domain: "fr.hackclub.com",
    defaultLocale: "fr" as const,
    locales: ["fr" as const],
  },
  {
    domain: "de.hackclub.com",
    defaultLocale: "de" as const,
    locales: ["de" as const],
  },
  {
    domain: "es.hackclub.com",
    defaultLocale: "es" as const,
    locales: ["es" as const],
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
  {
    domain: "fr.localhost:3000",
    defaultLocale: "fr" as const,
    locales: ["fr" as const],
  },
  {
    domain: "de.localhost:3000",
    defaultLocale: "de" as const,
    locales: ["de" as const],
  },
  {
    domain: "es.localhost:3000",
    defaultLocale: "es" as const,
    locales: ["es" as const],
  },
];

export const routing = defineRouting({
  locales: ["en", "ru", "fr", "de", "es"],
  defaultLocale: "en",
  localePrefix: "never",
  localeDetection: false,
  domains: isProd ? productionDomains : developmentDomains,
});

export type AppLocale = (typeof routing.locales)[number];

export const localeDomains: Record<AppLocale, string> = {
  en: "https://hackclub.com",
  ru: "https://ru.hackclub.com",
  fr: "https://fr.hackclub.com",
  de: "https://de.hackclub.com",
  es: "https://es.hackclub.com",
};

export function getLocaleDomain(locale: string): string {
  if (locale in localeDomains) {
    return localeDomains[locale as AppLocale];
  }
  return localeDomains.en;
}

export function getLocaleFromHost(host: string | null | undefined): AppLocale {
  if (!host) return routing.defaultLocale;
  const hostname = host.split(":")[0].toLowerCase();
  const subdomain = hostname.split(".")[0];
  return routing.locales.includes(subdomain as AppLocale)
    ? (subdomain as AppLocale)
    : routing.defaultLocale;
}

export function getRequestOrigin(
  host: string | null | undefined,
  protocol: string = "https",
): string {
  if (!host) return localeDomains[routing.defaultLocale];

  const hostname = host.split(":")[0].toLowerCase();
  if (hostname === "hackclub.com" || hostname.endsWith(".hackclub.com")) {
    return getLocaleDomain(getLocaleFromHost(host));
  }

  return `${protocol.replace(/:$/, "")}://${host}`;
}
