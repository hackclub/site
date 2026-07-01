import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    category: string;
  }>;
}

export async function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const categoryConfig = getDirectoryCategoryById(category);

  if (!categoryConfig) {
    return buildPageMetadata({
      title: "Organization Directory | Hack Club",
      description:
        "Discover the amazing organizations and projects using HCB for fiscal sponsorship.",
      canonical: "/fiscal-sponsorship/directory",
    });
  }

  return buildPageMetadata({
    title: categoryConfig.index
      ? "Organization Directory | Hack Club"
      : `${categoryConfig.label} | Hack Club`,
    description: categoryConfig.index
      ? "Browse the organizations building on HCB."
      : (categoryConfig.description ??
        `Browse HCB organizations in the ${categoryConfig.label} category.`),
    canonical: categoryConfig.index
      ? "/fiscal-sponsorship/directory"
      : `/fiscal-sponsorship/directory/${encodeURIComponent(categoryConfig.id)}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: rawCategory } = await params;
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
