import type { Metadata } from "next";
import ClimatePageClient from "../ClimatePageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchClimateOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Climate Organizations | Hack Club",
  description:
    "Climate-focused organizations using HCB to accelerate environmental action and sustainability initiatives.",
  canonical: "/fiscal-sponsorship/climate",
});

export default async function ClimatePage() {
  const organizations = await fetchClimateOrganizations();
  return <ClimatePageClient organizations={organizations} />;
}
