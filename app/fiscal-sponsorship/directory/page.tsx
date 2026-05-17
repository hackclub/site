import type { Metadata } from "next";
import DirectoryPageClient from "../DirectoryPageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchHCBOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";

export const metadata: Metadata = buildPageMetadata({
  title: "Organization Directory | Hack Club",
  description: "Discover the amazing organizations and projects using HCB for fiscal sponsorship.",
  canonical: "/fiscal-sponsorship/directory",
});

export default async function DirectoryPage() {
  const organizations = await fetchHCBOrganizations();
  return <DirectoryPageClient organizations={organizations} />;
}
