import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import { AlumsEmailSignup } from "./AlumsEmailSignup";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Alums" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/alumni",
    locale,
  });
}

export default async function AlumsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Alums");

  const cards: { body: string; image: string; objectPosition?: string }[] = [
    { body: t("card1Body"), image: "/assets/alum-building.jpg" },
    { body: t("card2Body"), image: "/assets/alum-mentorship.jpg" },
    { body: t("card3Body"), image: "/assets/alum-donations.jpg" },
    { body: t("card4Body"), image: "/assets/alum-friends.jpg", objectPosition: "top" },
  ];

  const connectItems = [
    { title: t("stayConnectedItem1Title"), body: t("stayConnectedItem1Body") },
    { title: t("stayConnectedItem2Title"), body: t("stayConnectedItem2Body") },
    { title: t("stayConnectedItem3Title"), body: t("stayConnectedItem3Body") },
    { title: t("stayConnectedItem4Title"), body: t("stayConnectedItem4Body") },
  ];

  return (
    <main id="main" tabIndex={-1} className="alums-page">
      <section className="alums-hero">
        <Navbar />
        <div className="alums-shell alums-hero__grid">
          <div className="alums-hero__copy">
            <h1>
              {t("heroTitleLine1")}
              <br />
              <span className="alums-hero__accent">{t("heroTitleLine2")}</span>
            </h1>
            <p className="alums-lede alums-lede--tight">
              {t("heroLedeLine1")} {t("heroLedeLine2")}
            </p>
            <p className="alums-lede">{t("heroLedeP2")}</p>
            <AlumsEmailSignup />
          </div>
        </div>
      </section>

      <section className="alums-shell alums-section">
        <h2 className="alums-section__title">{t("sectionTitle")}</h2>
        <div className="alums-card-grid">
          {cards.map((card) => (
            <div key={card.body} className="alums-card">
              <div className="alums-card__media">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  style={{ objectFit: "cover", objectPosition: card.objectPosition ?? "center" }}
                />
              </div>
              <p className="alums-card__body">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="alums-connect">
        <div className="wave-container alums-connect__wave" aria-hidden="true">
          <svg
            viewBox="0 0 1920 40"
            preserveAspectRatio="none"
            style={{ width: "100%", height: 40, display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
              className="alums-connect__wave-fill"
            />
          </svg>
        </div>
        <div className="alums-shell">
          <h2 className="alums-connect__title">{t("stayConnectedTitle")}</h2>
          <div className="alums-connect-grid">
            {connectItems.map((item) => (
              <div key={item.title} className="alums-connect-card">
                <p className="alums-connect-card__title">{item.title}</p>
                <p className="alums-connect-card__body">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="alums-connect__note">{t("stayConnectedNote2")}</p>
          <div className="alums-connect__signup">
            <AlumsEmailSignup />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .alums-page {
          background: var(--background);
          color: var(--foreground);
        }

        .alums-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .alums-hero {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(to bottom, transparent 0%, transparent 65%, var(--background) 100%),
            radial-gradient(circle at 8% 12%, rgba(236, 55, 80, 0.14), transparent 40%),
            radial-gradient(circle at 92% 0%, rgba(236, 55, 80, 0.1), transparent 34%),
            var(--background);
          padding: 160px 0 48px;
        }

        .alums-hero__grid {
          position: relative;
          z-index: 2;
        }

        .alums-hero__copy h1 {
          margin: 0 0 44px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2.6rem, 5.6vw, 4.4rem);
          line-height: 1;
          color: var(--foreground);
        }

        .alums-hero__accent {
          color: var(--red);
        }

        .alums-lede {
          margin: 0 0 26px;
          max-width: 480px;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.55;
          color: color-mix(in srgb, var(--foreground) 82%, var(--background) 18%);
        }

        .alums-lede--tight {
          margin-bottom: 6px;
        }

        .alums-section {
          padding: 40px 0 90px;
        }

        .alums-section__title {
          margin: 0 0 28px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(1.8rem, 3.4vw, 2.6rem);
          color: var(--foreground);
        }

        .alums-card-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }

        .alums-card {
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          background: var(--surface);
          box-shadow: 0 10px 28px rgba(23, 23, 29, 0.08);
        }

        .alums-card__media {
          position: relative;
          aspect-ratio: 16 / 9;
        }

        .alums-card__body {
          margin: 0;
          padding: 22px 24px 26px;
          font-family: var(--font-phantom);
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.5;
          color: var(--foreground);
        }

        .alums-connect {
          position: relative;
          background: color-mix(in srgb, var(--background) 88%, var(--red) 12%);
          padding: 64px 0 120px;
        }

        .alums-connect__wave {
          position: absolute;
          top: -38px;
          left: 0;
          right: 0;
          line-height: 0;
          z-index: 5;
          pointer-events: none;
        }

        .alums-connect__wave-fill {
          fill: color-mix(in srgb, var(--background) 88%, var(--red) 12%);
        }

        .alums-connect__title {
          margin: 0 0 28px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(1.8rem, 3.4vw, 2.6rem);
          color: var(--foreground);
        }

        .alums-connect-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 40px;
        }

        .alums-connect-card {
          border: 2px solid var(--foreground);
          border-radius: 14px;
          padding: 28px 24px;
          background: var(--background);
        }

        .alums-connect-card__title {
          margin: 0 0 12px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: 1.55rem;
          color: var(--foreground);
        }

        .alums-connect-card__body {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--muted);
        }

        .alums-connect__note {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 28px;
          font-family: var(--font-phantom);
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.5;
          color: var(--foreground);
        }

        .alums-connect__signup {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 1100px) {
          .alums-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .alums-connect-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 767px) {
          .alums-shell {
            width: calc(100vw - 32px);
          }

          .alums-hero {
            padding: 108px 0 64px;
          }

          .alums-card-grid {
            grid-template-columns: 1fr;
          }

          .alums-connect-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
