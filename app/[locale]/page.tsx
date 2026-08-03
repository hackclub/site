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
import { fetchPrograms, hasKey } from "@/lib/programs-data";
import { selectFeaturedPrograms } from "@/lib/programs";

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
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const programs = hasKey() ? selectFeaturedPrograms(await fetchPrograms()) : [];

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        {programs.length > 0 && <EventsSection initialCards={programs} />}
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
