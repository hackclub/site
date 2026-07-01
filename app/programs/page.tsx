import type { Metadata } from "next";
import ProgramsPageClient from "./ProgramsPageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchPrograms, hasKey } from "@/lib/programs-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Programs — Hack Club",
  description:
    "Explore Hack Club programs — coding projects, events, and opportunities for teen makers.",
  canonical: "/programs",
});

export default async function ProgramsPage() {
  const programs = hasKey() ? await fetchPrograms() : [];

  return <ProgramsPageClient initialPrograms={programs} />;
}
