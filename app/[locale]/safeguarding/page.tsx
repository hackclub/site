import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadMarkdownContent } from "@/lib/i18n-content";
import { MarkdownPage } from "@/components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return buildPageMetadata({
    title: t("safeguardingTitle"),
    description: t("safeguardingDescription"),
    canonical: "/safeguarding",
    locale,
  });
}

export default async function SafeguardingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = loadMarkdownContent("safeguarding", locale);
  return <MarkdownPage content={content} />;
}
