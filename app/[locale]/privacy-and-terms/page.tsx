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
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    canonical: "/privacy-and-terms",
    locale,
  });
}

export default async function PrivacyAndTermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const { content, isTranslation } = loadMarkdownContent("privacy-and-terms", locale);
  return (
    <MarkdownPage
      content={content}
      translationNotice={isTranslation ? t("translationNotice") : undefined}
      translationNoticeCta={isTranslation ? t("translationNoticeCta") : undefined}
      englishHref={isTranslation ? `${localeDomains.en}/privacy-and-terms` : undefined}
    />
  );
}
