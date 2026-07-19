import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MobilePageClient from "../MobilePageClient";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HcbMobile" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/fiscal-sponsorship/mobile",
    image: "https://cdn.hackclub.com/019c76ba-15be-7e16-b6a7-adca9ccae9c0/Ueb-LA.png",
    imageAlt: t("metaImageAlt"),
    locale,
  });
}

export default async function MobilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MobilePageClient />;
}
