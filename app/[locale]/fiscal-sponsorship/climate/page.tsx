import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ClimatePageClient from "../ClimatePageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchClimateOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HcbDirectory" });
  return buildPageMetadata({
    title: t("climateMetaTitle"),
    description: t("climateMetaDescription"),
    canonical: "/fiscal-sponsorship/climate",
    locale,
  });
}

export default async function ClimatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const organizations = await fetchClimateOrganizations();
  return <ClimatePageClient organizations={organizations} />;
}
