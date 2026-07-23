import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FiscalSponsorshipPageClient from "./FiscalSponsorshipPageClient";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hcb" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/fiscal-sponsorship",
    locale,
  });
}

export default async function FiscalSponsorshipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FiscalSponsorshipPageClient />;
}
