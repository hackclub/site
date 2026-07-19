import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
    locale: string;
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
  const { locale, category: rawCategory, region: rawRegion } = await params;
  const category = decodeURIComponent(rawCategory);
  const region = decodeURIComponent(rawRegion);
  const categoryConfig = getDirectoryCategoryById(category);
  const regionConfig = getRegionBySlug(region);
  const t = await getTranslations({ locale, namespace: "HcbDirectory" });
  const tCat = await getTranslations({ locale, namespace: "HcbCategories" });
  const tReg = await getTranslations({ locale, namespace: "HcbRegions" });

  if (!categoryConfig || !regionConfig) {
    return buildPageMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      canonical: "/fiscal-sponsorship/directory",
      locale,
    });
  }

  const categoryLabel = tCat(`${categoryConfig.id}.label`);
  const regionLabel = tReg(`${regionConfig.slug}.label`);

  return buildPageMetadata({
    title: categoryConfig.index
      ? t("metaDirectoryInRegion", { region: regionLabel })
      : t("metaInRegion", { category: categoryLabel, region: regionLabel }),
    description: categoryConfig.index
      ? t("metaBrowseRegion", { region: regionLabel })
      : t("metaBrowseCategoryRegion", { category: categoryLabel, region: regionLabel }),
    canonical: `/fiscal-sponsorship/directory/${encodeURIComponent(categoryConfig.id)}/${encodeURIComponent(regionConfig.slug)}`,
    locale,
  });
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { locale, category: rawCategory, region: rawRegion } = await params;
  setRequestLocale(locale);
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
