import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function deepMerge(a: Messages, b: Messages): Messages {
  if (Array.isArray(a) || Array.isArray(b)) return b;
  if (typeof a !== "object" || a === null) return b;
  if (typeof b !== "object" || b === null) return b;
  const out: Messages = { ...a };
  for (const [k, v] of Object.entries(b)) {
    const existing = out[k];
    out[k] =
      k in out &&
      typeof existing === "object" &&
      existing !== null &&
      typeof v === "object" &&
      v !== null &&
      !Array.isArray(existing) &&
      !Array.isArray(v)
        ? deepMerge(existing as Messages, v as Messages)
        : v;
  }
  return out;
}

const NAMESPACE_MODULES = {
  en: {
    core: () => import("../messages/namespaces/en/00-core.json"),
    arcade: () => import("../messages/namespaces/en/arcade.json"),
    hcb: () => import("../messages/namespaces/en/hcb.json"),
    programs: () => import("../messages/namespaces/en/programs-team-philanthropy.json"),
  },
  ru: {
    core: () => import("../messages/namespaces/ru/00-core.json"),
    arcade: () => import("../messages/namespaces/ru/arcade.json"),
    hcb: () => import("../messages/namespaces/ru/hcb.json"),
    programs: () => import("../messages/namespaces/ru/programs-team-philanthropy.json"),
  },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  let messages: Messages = (await import(`../messages/${locale}.json`)).default;

  const loaders = NAMESPACE_MODULES[locale as keyof typeof NAMESPACE_MODULES];
  if (loaders) {
    for (const load of Object.values(loaders)) {
      try {
        const chunk = (await load()).default as Messages;
        messages = deepMerge(messages, chunk);
      } catch {
        // missing namespace chunk, ignore
      }
    }
  }

  return {
    locale,
    messages,
  };
});
