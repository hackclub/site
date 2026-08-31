import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProgramsPageClient from "./ProgramsPageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchEventsSafe } from "@/lib/events-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Programs" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/programs",
    locale,
    feed: true,
  });
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProgramsPageClient initialEvents={await fetchEventsSafe()} />;
}
