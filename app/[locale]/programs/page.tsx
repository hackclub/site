import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProgramsPageClient from "./ProgramsPageClient";
import { buildPageMetadata } from "@/lib/seo";
import { fetchPrograms, hasKey } from "@/lib/programs-data";

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
  });
}

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const programs = hasKey() ? await fetchPrograms() : [];

  return <ProgramsPageClient initialPrograms={programs} />;
}
