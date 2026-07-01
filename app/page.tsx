import type { Metadata } from "next";
import { HeroSection } from "../components/landing/hero";
import { ProjectsSection } from "../components/landing/projects";
import { EventsSection } from "../components/landing/events";
import { HerePhotosSection } from "../components/landing/photos";
import { VideoSection } from "../components/landing/video";
import { DonorsSection } from "../components/landing/donors";
import { JoiningSection } from "../components/landing/joining";
import { ReadySection } from "../components/landing/ready";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { buildPageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { fetchPrograms, hasKey } from "@/lib/programs-data";
import { selectFeaturedPrograms } from "@/lib/programs";

export const metadata: Metadata = buildPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  canonical: "/",
});

export default async function Home() {
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
