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
    title: t("safeguardingTitle"),
    description: t("safeguardingDescription"),
    canonical: "/safeguarding",
    locale,
  });
}

export default async function SafeguardingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const { content, isTranslation } = loadMarkdownContent("safeguarding", locale);
  return (
    <MarkdownPage
      content={content}
      translationNotice={isTranslation ? t("translationNotice") : undefined}
      translationNoticeCta={isTranslation ? t("translationNoticeCta") : undefined}
      englishHref={isTranslation ? `${localeDomains.en}/safeguarding` : undefined}
    />
  );
}
