import { getTranslations, setRequestLocale } from "next-intl/server";
import { loadMarkdownContent } from "@/lib/i18n-content";
import { MarkdownPage } from "@/components/MarkdownPage";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return buildPageMetadata({
    title: t("itAdminsTitle"),
    description: t("itAdminsDescription"),
    canonical: "/it-admins",
    locale,
  });
}

export default async function ItAdminsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = loadMarkdownContent("it-admins", locale);
  return <MarkdownPage content={content} />;
}
