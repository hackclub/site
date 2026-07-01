import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClimatePageClient from "../../ClimatePageClient";
import { buildPageMetadata } from "@/lib/seo";
import { FISCAL_REGIONS, getRegionBySlug } from "@/lib/fiscal-sponsorship-config";
import { fetchClimateOrganizations } from "@/lib/fiscal-sponsorship-data";
import { filterOrganizationsByRegion } from "@/lib/fiscal-sponsorship-config";

export const dynamic = "force-static";
export const dynamicParams = false;

interface ClimateRegionPageProps {
  params: Promise<{
    region: string;
  }>;
}

export async function generateStaticParams() {
  return FISCAL_REGIONS.map((region) => ({
    region: `organizations-in-${region.slug}`,
  }));
}

export async function generateMetadata({ params }: ClimateRegionPageProps): Promise<Metadata> {
  const { region: rawRegion } = await params;
  const region = decodeURIComponent(rawRegion);
  const regionConfig = getRegionBySlug(region);

  if (!regionConfig) {
    return buildPageMetadata({
      title: "Climate Organizations | Hack Club",
      description:
        "Climate-focused organizations using HCB to accelerate environmental action and sustainability initiatives.",
      canonical: "/fiscal-sponsorship/climate",
    });
  }

  return buildPageMetadata({
    title: `Climate Organizations in ${regionConfig.label} | Hack Club`,
    description: `Discover climate-focused organizations in ${regionConfig.label}.`,
    canonical: `/fiscal-sponsorship/climate/organizations-in-${encodeURIComponent(regionConfig.slug)}`,
  });
}

export default async function ClimateRegionPage({ params }: ClimateRegionPageProps) {
  const { region: rawRegion } = await params;
  const region = decodeURIComponent(rawRegion);
  const regionConfig = getRegionBySlug(region);

  if (!regionConfig) {
    notFound();
  }

  const organizations = await fetchClimateOrganizations();
  const filteredOrganizations = filterOrganizationsByRegion(organizations, regionConfig.slug);

  return (
    <ClimatePageClient
      organizations={filteredOrganizations}
      region={`organizations-in-${regionConfig.slug}`}
    />
  );
}
