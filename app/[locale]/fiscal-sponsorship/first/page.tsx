import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FirstPageClient } from "./FirstPageClient";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HcbFirst" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/fiscal-sponsorship/first",
    image: "/fiscal-sponsorship/first/og-image.png",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FirstPageClient />;
}
