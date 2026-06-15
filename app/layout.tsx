import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import "./globals.css";
import { SkipToMainLink } from "../components/SkipToMainLink";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { phantomSans, zarathustra } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://hackclub.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${phantomSans.variable} ${zarathustra.variable}`}
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
        <PlausibleProvider src="https://plausible.io/js/pa-Fxh-6GHJlpUS4AXISXi-C.js">
          <SkipToMainLink />
          {children}
          <Analytics />
          <SpeedInsights />
        </PlausibleProvider>
      </body>
    </html>
  );
}
