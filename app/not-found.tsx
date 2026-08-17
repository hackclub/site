import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SkipToMainLink } from "@/components/SkipToMainLink";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";
import { routing } from "@/i18n/routing";
import { phantomSans, zarathustra } from "./fonts";
import { themesrc } from "./theme-script";
import "./globals.css";

const locale = routing.defaultLocale;

export default async function RootNotFound() {
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`h-full ${phantomSans.variable} ${zarathustra.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themesrc }} />
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body className="min-h-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkipToMainLink />
          <NotFoundContent locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
