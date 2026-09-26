import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { buildPageMetadata } from "@/lib/seo";
import { TeachersEmailSignup } from "@/components/teachers-email-signup";
import hackersSticker from "./assests/hackers.avif";
import styles from "./page.module.css";

function Hl({ children, color }: { children: ReactNode; color: string }) {
  return (
    <strong className={styles["teacher-highlight"]} style={{ "--accent": color } as CSSProperties}>
      {children}
    </strong>
  );
}

const highlight = (color: string) => (chunks: ReactNode) => <Hl color={color}>{chunks}</Hl>;

const highlights = {
  red: highlight("#ec3750"),
  orange: highlight("#ff8c37"),
  blue: highlight("#2d7dd2"),
  purple: highlight("#7c4dff"),
  green: highlight("#12b886"),
};

const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachers" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/teachers",
    locale,
  });
}

const ENGAGE_BOXES = [
  { key: "engageBoxProjects", image: "/assets/parent1.png" },
  { key: "engageBoxPrizes", image: "/assets/parent2.png" },
  { key: "engageBoxTravel", image: "/assets/parent3.jpg" },
  { key: "engageBoxCommunity", image: "/assets/parent4.png" },
  { key: "engageBoxLeaders", image: "/assets/parent5.png" },
  { key: "engageBoxClubs", image: "/assets/parent6.png" },
] as const;

export default async function TeachersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Teachers");

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <section className={styles["teacher-hero"]}>
          <div className={styles["teacher-hero-blobs"]} aria-hidden="true">
            <span className={styles["teacher-blob-red"]} />
            <span className={styles["teacher-blob-orange"]} />
            <span className={styles["teacher-blob-blue"]} />
          </div>
          <span className={styles["teacher-hero-tag"]}>{t("heroTag")}</span>
          <h1 className={styles["teacher-hero-title"]}>
            {t("heroTitle")}
            <span className={styles["teacher-hero-title-accent"]}>{t("heroTitleAccent")}</span>
          </h1>
          <p className={styles["teacher-hero-lede"]}>{t("heroLede")}</p>
          <div className={styles["teacher-hero-signup"]}>
            <p className={styles["teacher-hero-signup-label"]}>{t("signupLabel")}</p>
            <TeachersEmailSignup />
          </div>
        </section>

        <section className={styles["teacher-facts-section"]}>
          <p className={styles["teacher-eyebrow"]}>{t("basicsEyebrow")}</p>
          <h2 className={styles["teacher-facts-heading"]}>{t("isTitle")}</h2>
          <p className={styles["teacher-statement"]}>{t.rich("statement", highlights)}</p>
        </section>

        <section className={styles["teacher-whats-section"]}>
          <div className={styles["teacher-whats-sticker"]}>
            <Image src={hackersSticker} alt="" width={220} height={220} aria-hidden="true" />
          </div>
          <div className={styles["teacher-whats-content"]}>
            <h2 className={styles["teacher-whats-heading"]}>{t("whatsTitle")}</h2>
            <div className={styles["teacher-whats-body"]}>
              <p>{t.rich("whatsBody1", { bold })}</p>
              <p>{t.rich("whatsBody2", { bold })}</p>
            </div>
          </div>
        </section>

        <section className={styles["teacher-video-section"]}>
          <div className={styles["teacher-video-card"]}>
            <div className={styles["teacher-video-embed"]}>
              <YouTubeEmbed id="xXIxwV7bQTw" title={t("videoTitle")} />
            </div>
            <p className={styles["teacher-video-caption"]}>{t("videoCaption")}</p>
          </div>
        </section>

        <section className={styles["teacher-engage-heading-section"]}>
          <h2 className={styles["teacher-engage-heading"]}>{t("engageTitle")}</h2>
        </section>

        <section className={styles["teacher-engage-section"]}>
          <div className={styles["teacher-engage-grid"]}>
            {ENGAGE_BOXES.map((box) => (
              <div key={box.key} className={styles["teacher-engage-box"]}>
                <Image
                  src={box.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={styles["teacher-engage-box-image"]}
                />
                <p className={styles["teacher-engage-box-label"]}>{t(box.key)}</p>
                <p className={styles["teacher-engage-box-body"]}>{t(`${box.key}Body`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles["teacher-benefits-section"]}>
          <p className={styles["teacher-eyebrow"]}>{t("payoffEyebrow")}</p>
          <h2 className={styles["teacher-benefits-heading"]}>{t("benefitsTitle")}</h2>
          <p className={styles["teacher-statement"]}>{t.rich("benefitsStatement", highlights)}</p>
        </section>

        <section className={styles["teacher-signup-section"]}>
          <div className={styles["teacher-signup-blobs"]} aria-hidden="true">
            <span className={styles["teacher-blob-purple"]} />
            <span className={styles["teacher-blob-teal"]} />
          </div>
          <h2 className={styles["teacher-signup-heading"]}>{t("signupTitle")}</h2>
          <p className={styles["teacher-signup-lede"]}>{t("signupLede")}</p>
          <TeachersEmailSignup />
        </section>
      </main>
      <Footer />
    </>
  );
}
