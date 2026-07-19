import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadMarkdownContent } from "@/lib/i18n-content";
import { MarkdownPage } from "@/components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return buildPageMetadata({
    title: t("conductTitle"),
    description: t("conductDescription"),
    canonical: "/conduct",
    locale,
  });
}

export default async function ConductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = loadMarkdownContent("conduct", locale);
  return <MarkdownPage content={content} />;
}
