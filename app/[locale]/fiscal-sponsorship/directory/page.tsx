import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import DirectoryPageClient from "../DirectoryPageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchHCBOrganizations } from "@/lib/fiscal-sponsorship-data";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HcbDirectory" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/fiscal-sponsorship/directory",
    locale,
  });
}

export default async function DirectoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const organizations = await fetchHCBOrganizations();
  return <DirectoryPageClient organizations={organizations} />;
}
