import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/landing/hero";
import { ProjectsSection } from "@/components/landing/projects";
import { EventsSection } from "@/components/landing/events";
import { HerePhotosSection } from "@/components/landing/photos";
import { VideoSection } from "@/components/landing/video";
import { DonorsSection } from "@/components/landing/donors";
import { JoiningSection } from "@/components/landing/joining";
import { ReadySection } from "@/components/landing/ready";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { buildPageMetadata } from "@/lib/seo";
import { getLocaleDomain } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    canonical: "/",
    locale,
    feed: true,
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Meta" });
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hackclub.com/#organization",
    name: "Hack Club",
    description: t("description"),
    url: getLocaleDomain(locale),
    logo: "https://assets.hackclub.com/flag-standalone.png",
    sameAs: [
      "https://twitter.com/hackclub",
      "https://github.com/hackclub",
      "https://www.youtube.com/c/HackClubHQ",
      "https://www.instagram.com/starthackclub",
      "https://en.wikipedia.org/wiki/Hack_Club",
      "https://www.wikidata.org/wiki/Q98127305",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "212 Battery St",
      addressLocality: "Burlington",
      addressRegion: "VT",
      postalCode: "05401",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: "team@hackclub.com",
      telephone: "+1-855-625-4225",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        <EventsSection />
        <HerePhotosSection />
        <VideoSection />
        <DonorsSection />
        <JoiningSection />
        <ReadySection />
      </main>
      <Footer />
    </>
  );
}
