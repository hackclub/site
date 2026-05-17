import type { Metadata } from "next";
import TeamPageClient from "./TeamPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Team — Hack Club",
  description:
    "Meet the Hack Club team — the people behind the world's largest nonprofit network of teen coders.",
  canonical: "/team",
});

export default function TeamPage() {
  return <TeamPageClient />;
}
