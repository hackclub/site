import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClimatePageClient from "../../ClimatePageClient";
import { buildPageMetadata } from "@/lib/seo";
import {
  FISCAL_REGIONS,
  getRegionBySlug,
  filterOrganizationsByRegion,
} from "@/lib/fiscal-sponsorship-config";
import { fetchClimateOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";
export const dynamicParams = false;

interface ClimateRegionPageProps {
  params: Promise<{
    locale: string;
    region: string;
  }>;
}

export async function generateStaticParams() {
  return FISCAL_REGIONS.map((region) => ({
    region: `organizations-in-${region.slug}`,
  }));
}

export async function generateMetadata({ params }: ClimateRegionPageProps): Promise<Metadata> {
  const { locale, region: rawRegion } = await params;
  const region = decodeURIComponent(rawRegion);
  const regionConfig = getRegionBySlug(region);
  const t = await getTranslations({ locale, namespace: "HcbDirectory" });
  const tReg = await getTranslations({ locale, namespace: "HcbRegions" });

  if (!regionConfig) {
    return buildPageMetadata({
      title: t("climateMetaTitle"),
      description: t("climateMetaDescription"),
      canonical: "/fiscal-sponsorship/climate",
      locale,
    });
  }

  const regionLabel = tReg(`${regionConfig.slug}.label`);

  return buildPageMetadata({
    title: t("climateMetaInRegion", { region: regionLabel }),
    description: t("climateMetaBrowseRegion", { region: regionLabel }),
    canonical: `/fiscal-sponsorship/climate/organizations-in-${encodeURIComponent(regionConfig.slug)}`,
    locale,
  });
}

export default async function ClimateRegionPage({ params }: ClimateRegionPageProps) {
  const { locale, region: rawRegion } = await params;
  setRequestLocale(locale);
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
