import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadMarkdownContent } from "@/lib/i18n-content";
import { MarkdownPage } from "@/components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";
import { localeDomains } from "@/i18n/routing";

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
  const t = await getTranslations({ locale, namespace: "Pages" });
  const { content, isTranslation } = loadMarkdownContent("conduct", locale);
  return (
    <MarkdownPage
      content={content}
      translationNotice={isTranslation ? t("translationNotice") : undefined}
      translationNoticeCta={isTranslation ? t("translationNoticeCta") : undefined}
      englishHref={isTranslation ? `${localeDomains.en}/conduct` : undefined}
    />
  );
}
