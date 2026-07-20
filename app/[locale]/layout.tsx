import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import PlausibleProvider from "next-plausible";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SkipToMainLink } from "@/components/SkipToMainLink";
import { routing, getLocaleDomain } from "@/i18n/routing";
import { phantomSans, zarathustra, cormorant, geologica } from "../fonts";
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
        "x-default": "https://hackclub.com",
      },
    },
  };
}

const themesrc = `(function(){try{var s=localStorage.getItem('hc-site-theme'),t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),r=document.documentElement;if(t==='dark')r.classList.add('dark');r.style.colorScheme=t;}catch(_){}})();`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hack Club",
  url: "https://hackclub.com",
  logo: "https://assets.hackclub.com/flag-standalone.png",
  sameAs: [
    "https://twitter.com/hackclub",
    "https://github.com/hackclub",
    "https://www.youtube.com/c/HackClubHQ",
    "https://www.instagram.com/starthackclub",
    "https://en.wikipedia.org/wiki/Hack_Club",
    "https://www.wikidata.org/wiki/Q98127305",
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <NextIntlClientProvider messages={messages}>
          <PlausibleProvider src="https://plausible.io/js/pa-Fxh-6GHJlpUS4AXISXi-C.js">
            <SkipToMainLink />
            {children}
            <Analytics />
            <SpeedInsights />
          </PlausibleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
