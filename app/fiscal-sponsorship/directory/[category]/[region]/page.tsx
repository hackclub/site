import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectoryPageClient from "../../../DirectoryPageClient";
import { buildPageMetadata } from "@/lib/seo";
import {
  DIRECTORY_CATEGORIES,
  FISCAL_REGIONS,
  getDirectoryCategoryById,
  getRegionBySlug,
  filterOrganizationsByCategoryAndRegion,
} from "@/lib/fiscal-sponsorship-config";
import { fetchHCBOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";
export const dynamicParams = false;

interface RegionPageProps {
  params: Promise<{
    category: string;
    region: string;
  }>;
}

export async function generateStaticParams() {
  return DIRECTORY_CATEGORIES.flatMap((category) =>
    FISCAL_REGIONS.map((region) => ({
      category: category.id,
      region: region.slug,
    })),
  );
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { category: rawCategory, region: rawRegion } = await params;
  const category = decodeURIComponent(rawCategory);
  const region = decodeURIComponent(rawRegion);
  const categoryConfig = getDirectoryCategoryById(category);
  const regionConfig = getRegionBySlug(region);

  if (!categoryConfig || !regionConfig) {
    return buildPageMetadata({
      title: "Organization Directory | Hack Club",
      description:
        "Discover the amazing organizations and projects using HCB for fiscal sponsorship.",
      canonical: "/fiscal-sponsorship/directory",
    });
  }

  return buildPageMetadata({
    title: categoryConfig.index
      ? `Organization Directory in ${regionConfig.label} | Hack Club`
      : `${categoryConfig.label} in ${regionConfig.label} | Hack Club`,
    description: categoryConfig.index
      ? `Browse HCB organizations across ${regionConfig.label}.`
      : `Browse HCB organizations in ${categoryConfig.label} across ${regionConfig.label}.`,
    canonical: categoryConfig.index
      ? `/fiscal-sponsorship/directory/${encodeURIComponent(categoryConfig.id)}/${encodeURIComponent(regionConfig.slug)}`
      : `/fiscal-sponsorship/directory/${encodeURIComponent(categoryConfig.id)}/${encodeURIComponent(regionConfig.slug)}`,
  });
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { category: rawCategory, region: rawRegion } = await params;
  const category = decodeURIComponent(rawCategory);
  const region = decodeURIComponent(rawRegion);
  const categoryConfig = getDirectoryCategoryById(category);
  const regionConfig = getRegionBySlug(region);

  if (!categoryConfig || !regionConfig) {
    notFound();
  }

  const organizations = await fetchHCBOrganizations();
  const filteredOrganizations = filterOrganizationsByCategoryAndRegion(
    organizations,
    categoryConfig.id,
    regionConfig.slug,
  );

  return (
    <DirectoryPageClient
      organizations={filteredOrganizations}
      category={categoryConfig.id}
      region={regionConfig.slug}
    />
  );
}
