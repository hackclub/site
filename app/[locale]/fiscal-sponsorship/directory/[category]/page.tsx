import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import DirectoryPageClient from "../../DirectoryPageClient";
import { buildPageMetadata } from "@/lib/seo";
import {
  DIRECTORY_CATEGORIES,
  getDirectoryCategoryById,
  organizationMatchesCategory,
} from "@/lib/fiscal-sponsorship-config";
import { fetchHCBOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";
export const dynamicParams = false;

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export async function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const categoryConfig = getDirectoryCategoryById(category);
  const t = await getTranslations({ locale, namespace: "HcbDirectory" });
  const tCat = await getTranslations({ locale, namespace: "HcbCategories" });

  if (!categoryConfig) {
    return buildPageMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      canonical: "/fiscal-sponsorship/directory",
      locale,
    });
  }

  const categoryLabel = tCat(`${categoryConfig.id}.label`);
  const categoryDescription = tCat(`${categoryConfig.id}.description`);

  return buildPageMetadata({
    title: categoryConfig.index ? t("metaTitle") : `${categoryLabel} | Hack Club`,
    description: categoryConfig.index
      ? t("metaBrowseAll")
      : categoryDescription || t("metaBrowseCategory", { category: categoryLabel }),
    canonical: categoryConfig.index
      ? "/fiscal-sponsorship/directory"
      : `/fiscal-sponsorship/directory/${encodeURIComponent(categoryConfig.id)}`,
    locale,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category: rawCategory } = await params;
  setRequestLocale(locale);
  const category = decodeURIComponent(rawCategory);
  const categoryConfig = getDirectoryCategoryById(category);

  if (!categoryConfig) {
    notFound();
  }

  const organizations = await fetchHCBOrganizations();
  const filteredOrganizations = organizations.filter((organization) =>
    organizationMatchesCategory(organization, categoryConfig.id),
  );

  return <DirectoryPageClient organizations={filteredOrganizations} category={categoryConfig.id} />;
}
