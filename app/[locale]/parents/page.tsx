import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { buildPageMetadata } from "@/lib/seo";
import { ParentsEmailSignup } from "@/components/parents-email-signup";
import { ShopCallout } from "@/components/ShopCallout";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Parents" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/parents",
    locale,
  });
}

const F = "var(--font-phantom)";

const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;

export default async function ParentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Parents");

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        {/* Hero */}
        <section
          style={{
            background: "var(--background)",
            textAlign: "center",
            paddingTop: 130,
            paddingBottom: 60,
            paddingLeft: "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(44px, 7.5vw, 84px)",
              fontWeight: 300,
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {t("heroTitle")}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(18px, 2.8vw, 28px)",
              fontWeight: 300,
              color: "var(--foreground)",
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            {t("heroSubtitle")}
          </p>
          <p
            style={{
              fontFamily: F,
              fontSize: "clamp(16px, 2.2vw, 19px)",
              color: "var(--muted)",
              maxWidth: 820,
              margin: "0 auto 32px",
              lineHeight: 1.5,
              textWrap: "balance",
            }}
          >
            {t("heroLede")}
          </p>
        </section>

        {/* Hack Club is: */}
        <section
          className="hcis-band"
          style={{
            position: "relative",
            marginTop: 40,
            paddingTop: 64,
            paddingBottom: 110,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <style>{`
            .hcis-band {
              background: #ec3750;
            }
            .hcis-wave-stroke {
              stroke: #ec3750;
            }
            .hcis-wave-fill {
              fill: #ec3750;
            }
            html.dark .hcis-band {
              background: color-mix(in srgb, #ec3750 55%, var(--background) 45%);
            }
            html.dark .hcis-wave-stroke {
              stroke: color-mix(in srgb, #ec3750 55%, var(--background) 45%);
            }
            html.dark .hcis-wave-fill {
              fill: color-mix(in srgb, #ec3750 55%, var(--background) 45%);
            }
          `}</style>
          {/* Wavy top border style */}
          <div
            className="wave-container"
            style={{
              position: "absolute",
              top: -54,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 25,
              pointerEvents: "none",
            }}
          >
            {/* Thin stroke wave on top */}
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                className="hcis-wave-stroke"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Main fill wave */}
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                className="hcis-wave-fill"
              />
            </svg>
          </div>

          <Image
            src="/assets/creature1.webp"
            alt=""
            width={1867}
            height={1485}
            sizes="(max-width: 1023px) 28vw, 28.33vw"
            quality={85}
            style={{
              position: "absolute",
              right: 0,
              top: -22,
              width: "calc(544 / 1920 * 100vw)",
              height: "auto",
              transform: "translateY(calc(-50% - 8px))",
              zIndex: 30,
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 28px",
              lineHeight: 1.1,
            }}
          >
            {t("isTitle")}
          </h2>
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: 28,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              {t.rich("isItem1", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              {t.rich("isItem2", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              {t("isItem3")}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              {t("isItem4")}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              {t("isItem5")}
            </li>
          </ul>

          {/* Wavy bottom border */}
          <div
            className="wave-container"
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            {/* Thin stroke wave on top */}
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                style={{ stroke: "var(--background)" }}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Main fill wave */}
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                style={{ fill: "var(--background)" }}
              />
            </svg>
          </div>
        </section>

        {/* What is a Hackathon? */}
        <section
          style={{
            background: "var(--background)",
            textAlign: "left",
            paddingTop: 80,
            paddingBottom: 80,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 400,
              color: "var(--foreground)",
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            {t("hackathonTitle")}
          </h2>
          <p
            style={{
              fontFamily: F,
              fontSize: "clamp(19px, 2.6vw, 24px)",
              color: "var(--foreground)",
              margin: "0 0 16px",
              lineHeight: 1.5,
            }}
          >
            {t.rich("hackathonBody1", { bold })}
          </p>
          <p
            style={{
              fontFamily: F,
              fontSize: "clamp(19px, 2.6vw, 24px)",
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {t.rich("hackathonBody2", { bold })}
          </p>
        </section>

        {/* More Hack Club moments */}
        <section
          className="section-padded"
          style={{
            position: "relative",
            background: "var(--background)",
            paddingTop: 0,
            paddingBottom: 140,
            paddingLeft: "clamp(24px, 14.29%, 220px)",
            paddingRight: "clamp(24px, 14.29%, 220px)",
          }}
        >
          <style>{`
            @media (max-width: 640px) {
              .parents-photos-grid {
                grid-template-columns: 1fr !important;
                gap: 48px !important;
              }
            }
            @media (min-width: 641px) and (max-width: 900px) {
              .parents-photos-grid {
                display: flex !important;
                flex-wrap: wrap;
                justify-content: center;
                gap: 32px !important;
              }
              .parents-photos-grid > div {
                flex: 0 0 calc(50% - 16px);
              }
            }
          `}</style>
          <div
            className="parents-photos-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(8px, 1.2vw, 16px)",
            }}
          >
            {[
              { id: "esxk_nScxFQ", caption: t("videoRobotArmsCaption") },
              { id: "7K_E7tG-O68", caption: t("videoParthenonCaption") },
              {
                id: "uXWMr0gdLJA",
                caption: t("videoShipwreckedCaption"),
                breakBefore: "island",
              },
            ].map((video) => {
              const breakIdx = video.breakBefore ? video.caption.indexOf(video.breakBefore) : -1;
              return (
                <div key={video.id}>
                  <div
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                      aspectRatio: "16 / 9",
                      marginBottom: 18,
                      position: "relative",
                    }}
                  >
                    <YouTubeEmbed id={video.id} title={video.caption} />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-phantom)",
                      fontSize: 20,
                      lineHeight: 1.2,
                      textAlign: "center",
                      color: "var(--foreground)",
                      margin: 0,
                    }}
                  >
                    {breakIdx > -1 ? (
                      <>
                        {video.caption.slice(0, breakIdx)}
                        <br />
                        {video.caption.slice(breakIdx)}
                      </>
                    ) : (
                      video.caption
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Soft gradient + wave border */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 140,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(236,55,80,0.05) 55%, rgba(236,55,80,0.22) 100%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            className="wave-container"
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            {/* thin stroke wave on top */}
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                style={{ stroke: "var(--background)" }}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* main fill wave */}
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                style={{ fill: "var(--background)" }}
              />
            </svg>
          </div>
        </section>

        {/* how do teens engage in Hack Club? */}
        <section
          style={{
            background: "var(--background)",
            textAlign: "left",
            paddingTop: 120,
            paddingBottom: 24,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 400,
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {t("engageTitle")}
          </h2>
        </section>

        {/* engagement boxes */}
        <section
          style={{
            position: "relative",
            background: "var(--background)",
            paddingTop: 16,
            paddingBottom: 200,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <style>{`
            @media (max-width: 640px) {
              .engage-box-grid {
                grid-template-columns: 1fr !important;
              }
            }
            @media (min-width: 641px) and (max-width: 900px) {
              .engage-box-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
          `}</style>
          <div
            className="engage-box-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              {
                label: t("engageBoxProjects"),
                image: "/assets/parent1.png",
                body: t("engageBoxProjectsBody"),
              },
              {
                label: t("engageBoxPrizes"),
                image: "/assets/parent2.png",
                body: t("engageBoxPrizesBody"),
              },
              {
                label: t("engageBoxTravel"),
                image: "/assets/parent3.jpg",
                body: t("engageBoxTravelBody"),
              },
              {
                label: t("engageBoxCommunity"),
                image: "/assets/parent4.png",
                body: t("engageBoxCommunityBody"),
              },
              {
                label: t("engageBoxLeaders"),
                image: "/assets/parent5.png",
                body: t("engageBoxLeadersBody"),
              },
              {
                label: t("engageBoxClubs"),
                image: "/assets/parent6.png",
                body: t("engageBoxClubsBody"),
              },
            ].map((box) => (
              <div
                key={box.label}
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#000000",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: 8,
                  padding: "20px 20px 64px",
                }}
              >
                {box.image && (
                  <Image src={box.image} alt="" fill style={{ objectFit: "cover", opacity: 0.2 }} />
                )}
                <p
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-zarathustra)",
                    fontSize: "clamp(22px, 2.8vw, 30px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {box.label}
                </p>
                {box.body && (
                  <p
                    style={{
                      position: "relative",
                      fontFamily: F,
                      fontSize: "clamp(20px, 2.6vw, 26px)",
                      color: "#ffffff",
                      opacity: 0.85,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {box.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* why should my teen join? */}
        <section
          style={{
            position: "relative",
            background: "color-mix(in srgb, var(--background) 88%, #ec3750 12%)",
            textAlign: "left",
            paddingTop: 90,
            paddingBottom: 140,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          {/* Wavy top border */}
          <div
            className="wave-container"
            style={{
              position: "absolute",
              top: -38,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            {/* Thin stroke wave on top */}
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                style={{ stroke: "color-mix(in srgb, var(--background) 88%, #ec3750 12%)" }}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Main fill wave */}
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                style={{ fill: "color-mix(in srgb, var(--background) 88%, #ec3750 12%)" }}
              />
            </svg>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: "0 0 28px",
              lineHeight: 1.1,
            }}
          >
            {t("whyJoinTitle")}
          </h2>
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: 28,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "var(--foreground)",
                lineHeight: 1.45,
              }}
            >
              {t.rich("whyJoinItem1", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "var(--foreground)",
                lineHeight: 1.45,
              }}
            >
              {t.rich("whyJoinItem2", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "var(--foreground)",
                lineHeight: 1.45,
              }}
            >
              {t.rich("whyJoinItem3", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "var(--foreground)",
                lineHeight: 1.45,
              }}
            >
              {t.rich("whyJoinItem4", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "var(--foreground)",
                lineHeight: 1.45,
              }}
            >
              {t.rich("whyJoinItem5", { bold })}
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "var(--foreground)",
                lineHeight: 1.45,
              }}
            >
              {t("whyJoinItem6")}
            </li>
          </ul>

          {/* Wavy bottom border */}
          <div
            className="wave-container"
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            {/* Thin stroke wave on top */}
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                style={{ stroke: "var(--background)" }}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Main fill wave */}
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                style={{ fill: "var(--background)" }}
              />
            </svg>
          </div>
        </section>

        <section
          style={{
            background: "var(--background)",
            paddingTop: 110,
            paddingBottom: 0,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <ShopCallout campaign="parents_page" />
        </section>

        {/* Newsletter heading */}
        <section
          style={{
            background: "var(--background)",
            textAlign: "left",
            paddingTop: 120,
            paddingBottom: 60,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-zarathustra)",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {t("newsletterTitle")}
          </h2>
        </section>

        {/* Hacker Generation Banner */}
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 40,
            paddingLeft: "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
            background: "var(--background)",
          }}
        >
          <style>{`
            .hacker-gen-card {
              position: relative;
              width: min(900px, 100%);
              height: clamp(200px, 32vw, 320px);
              border-radius: 16px;
              overflow: hidden;
              cursor: pointer;
              transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 300ms ease;
            }
            .hacker-gen-card:hover {
              transform: scale(1.015);
              box-shadow: 0 16px 48px rgba(0,0,0,0.3);
            }
            .hacker-gen-card:hover .hacker-gen-vignette {
              opacity: 0.5;
            }
            .hacker-gen-vignette {
              transition: opacity 300ms ease;
            }
            .hacker-gen-overlay-flat {
              background: rgba(255,255,255,0.45);
            }
            .hacker-gen-overlay-grad {
              background: linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 100%);
            }
            html.dark .hacker-gen-overlay-flat {
              background: rgba(0,0,0,0.45);
            }
            html.dark .hacker-gen-overlay-grad {
              background: linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 100%);
            }
          `}</style>
          <a
            href="https://christinaasquith.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hacker-gen-card"
            style={{ display: "block", textDecoration: "none" }}
          >
            <Image
              src="https://cdn.hackclub.com/019e6ae0-7bb2-7290-9114-83e25b7bdc28/image.png"
              alt={t("hackerGenImageAlt")}
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            {/* Overlay for readability */}
            <div
              className="hacker-gen-vignette hacker-gen-overlay-flat"
              style={{ position: "absolute", inset: 0 }}
            />
            <div
              className="hacker-gen-vignette hacker-gen-overlay-grad"
              style={{ position: "absolute", inset: 0 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "clamp(20px, 3.5vw, 36px) 32px 24px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-zarathustra)",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  fontWeight: 400,
                  color: "#ec3750",
                  margin: "0 0 10px",
                  lineHeight: 1.1,
                }}
              >
                {t("hackerGenTitle")}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-zarathustra)",
                  fontSize: "clamp(14px, 2vw, 20px)",
                  fontWeight: 400,
                  color: "#ec3750",
                  margin: 0,
                  opacity: 0.85,
                }}
              >
                {t("hackerGenByline")}
              </p>
            </div>
          </a>
        </section>

        {/* Email signup */}
        <section
          style={{
            background: "var(--background)",
            textAlign: "center",
            paddingTop: 40,
            paddingBottom: 120,
            paddingLeft: "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
          }}
        >
          <ParentsEmailSignup />

          <p
            style={{
              fontFamily: F,
              fontSize: "clamp(15px, 2vw, 20px)",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            {t("updatesLine")}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
