import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import PlausibleProvider from "next-plausible";
import { SkipToMainLink } from "@/components/SkipToMainLink";
import { routing, getLocaleDomain } from "@/i18n/routing";
import { phantomSans, zarathustra, cormorant, geologica } from "../fonts";
import { themesrc } from "../theme-script";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const base = getLocaleDomain(locale);

  return {
    metadataBase: new URL(base),
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "https://hackclub.com",
        ru: "https://ru.hackclub.com",
        fr: "https://fr.hackclub.com",
        de: "https://de.hackclub.com",
        es: "https://es.hackclub.com",
        "x-default": "https://hackclub.com",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`h-full ${locale == "ru" ? geologica.variable : phantomSans.variable} ${locale == "ru" ? cormorant.variable : zarathustra.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themesrc }} />
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body className="min-h-full">
        <NextIntlClientProvider messages={messages}>
          <PlausibleProvider src="https://plausible.io/js/pa-Fxh-6GHJlpUS4AXISXi-C.js">
            <SkipToMainLink />
            {children}
          </PlausibleProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
