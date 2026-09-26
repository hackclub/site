import styles from "./page.module.css";
import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BtnArrowSvg } from "@/components/landing/btn-arrow";
import { LearnMoreCards } from "./learn-more-cards";
import { SlackStats } from "./slack-stats";
import { IMAGES, STICKERS, shuffle } from "./random-media";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import slackLogo from "./assets/slack.svg";
import cascadeSticker from "./assets/cascade.avif";
import sleddingSticker from "./assets/sledding.avif";
import appleSticker from "./assets/randomAppleCuzWhyNot.webp";
import heidiSticker from "./assets/heidi.avif";
import pcbSticker from "./assets/pcb.avif";
import spacesLogo from "./assets/spaces.avif";
import startLogo from "./assets/start.svg";
import creature1 from "./assets/creature1.avif";
import bobaLogo from "./assets/boba.webp";
import bobaOrph from "./assets/bobaOrph.avif";
import fuseLogo from "./assets/fusering.svg";
import fuseRingBackground from "./assets/fuseringBG.avif";
import sprigBackground from "./assets/sprigBG.avif";
import sprigLogo from "./assets/sprig.svg";
import terminalCraftLogo from "./assets/terminalcraft.webp";
import swirlLogo from "./assets/swirl.svg";
import swirlIcon from "./assets/icecream.svg";
import toppingsLogo from "./assets/toppings.avif";
import parrot from "./assets/parrot.gif";
import wafflesLogo from "./assets/waffles.svg";
import downscaleLogo from "./assets/downscale.avif";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Clubs" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/clubs",
    locale,
  });
}

const Arrow = () => (
  <span className={`${styles["clubs-arrow"]} btn-arrow`} aria-hidden="true">
    <BtnArrowSvg />
  </span>
);

function JoiningCard({
  title,
  description,
  bg,
  children,
}: {
  title: string;
  description: string;
  bg: string;
  children: ReactNode;
}) {
  return (
    <>
      <Image
        src={bg}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        className={styles["clubs-joining-card-bg"]}
      />
      <div className={styles["clubs-joining-card-overlay"]} />
      <div className={styles["clubs-joining-card-content"]}>
        <h3 className={styles["clubs-joining-card-title"]}>{title}</h3>
        <p className={styles["clubs-joining-card-body"]}>{description}</p>
        {children}
      </div>
    </>
  );
}

function PathCard({
  title,
  description,
  cta,
  href,
  bg,
}: {
  title: string;
  description: string;
  cta: string;
  href: string;
  bg: string;
}) {
  return (
    <Link href={href} className={styles["clubs-joining-card"]}>
      <JoiningCard title={title} description={description} bg={bg}>
        <span className={`${styles["clubs-joining-card-link"]} cta-btn`}>
          {cta} <Arrow />
        </span>
      </JoiningCard>
    </Link>
  );
}

export default async function ClubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Clubs");
  const marquee = [
    t("marqueeCode"),
    t("marqueeFriends"),
    t("marqueeBuild"),
    t("marqueeBoba"),
    t("marqueeRewards"),
  ];

  const [photoOne, photoTwo, photoThree, photoFour, photoFive, photoSix, perksPhotoOne] =
    shuffle(IMAGES);
  const [stickerOne, stickerTwo, stickerThree, stickerFour, perksSticker] = shuffle(STICKERS);
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <section className={styles["clubs-hero"]}>
          <div className={styles["clubs-grid"]} aria-hidden="true" />
          <div
            className={`${styles["clubs-photo"]} ${styles["clubs-photo-one"]}`}
            aria-hidden="true"
          >
            <Image src={photoOne} alt="" fill priority sizes="(max-width: 900px) 0px, 260px" />
          </div>
          <div
            className={`${styles["clubs-photo"]} ${styles["clubs-photo-two"]}`}
            aria-hidden="true"
          >
            <Image src={photoTwo} alt="" fill sizes="(max-width: 900px) 0px, 250px" />
          </div>
          <div
            className={`${styles["clubs-photo"]} ${styles["clubs-photo-three"]}`}
            aria-hidden="true"
          >
            <Image src={photoThree} alt="" fill sizes="(max-width: 1100px) 0px, 190px" />
          </div>
          <div
            className={`${styles["clubs-photo"]} ${styles["clubs-photo-four"]}`}
            aria-hidden="true"
          >
            <Image src={photoFour} alt="" fill sizes="(max-width: 1100px) 0px, 190px" />
          </div>
          <div
            className={`${styles["clubs-photo"]} ${styles["clubs-photo-five"]}`}
            aria-hidden="true"
          >
            <Image src={photoFive} alt="" fill sizes="(max-width: 1100px) 0px, 170px" />
          </div>
          <div
            className={`${styles["clubs-photo"]} ${styles["clubs-photo-six"]}`}
            aria-hidden="true"
          >
            <Image src={photoSix} alt="" fill sizes="(max-width: 1100px) 0px, 160px" />
          </div>
          <div className={styles["clubs-hero-inner"]}>
            <p className={styles["clubs-eyebrow"]}>{t("heroEyebrow")}</p>
            <h1>{t.rich("heroTitle", { accent: (chunks) => <span>{chunks}</span> })}</h1>
            <p className={styles["clubs-hero-copy"]}>{t("heroCopy")}</p>
            <div className={styles["clubs-actions"]}>
              <a
                className={`${styles["clubs-button"]} ${styles["clubs-button-red"]} cta-btn`}
                href="https://apply.hackclub.com"
                target="_blank"
                rel="noreferrer"
              >
                {t("startClub")} <Arrow />
              </a>
              <a
                className={`${styles["clubs-button"]} ${styles["clubs-button-outline"]} cta-btn`}
                href="https://clubs.hackclub.com/auth/login"
                target="_blank"
                rel="noreferrer"
              >
                {t("signIn")}
              </a>
              <a className={styles["clubs-text-link"]} href="#learn-more">
                {t("learnMore")} <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles["clubs-hero-signin-note"]}>
              {t.rich("memberSignIn", {
                link: (chunks) => (
                  <a href="https://clubs.hackclub.com/auth/member" target="_blank" rel="noreferrer">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
          <div
            className={`${styles["clubs-sticker"]} ${styles["clubs-sticker-one"]}`}
            aria-hidden="true"
          >
            <Image src={stickerOne} alt="" fill sizes="(max-width: 900px) 0px, 132px" />
          </div>
          <div
            className={`${styles["clubs-sticker"]} ${styles["clubs-sticker-two"]}`}
            aria-hidden="true"
          >
            <Image src={stickerTwo} alt="" fill sizes="(max-width: 900px) 0px, 132px" />
          </div>
          <div
            className={`${styles["clubs-sticker"]} ${styles["clubs-sticker-three"]}`}
            aria-hidden="true"
          >
            <Image src={stickerThree} alt="" fill sizes="(max-width: 900px) 0px, 100px" />
          </div>
          <div
            className={`${styles["clubs-sticker"]} ${styles["clubs-sticker-four"]}`}
            aria-hidden="true"
          >
            <Image src={stickerFour} alt="" fill sizes="(max-width: 900px) 0px, 92px" />
          </div>
        </section>

        <div className={styles["clubs-marquee"]}>
          <div>
            {marquee.map((item) => (
              <Fragment key={item}>
                <span>{item}</span>
                <i>✦</i>
              </Fragment>
            ))}
          </div>

          <div aria-hidden="true">
            {marquee.map((item) => (
              <Fragment key={item}>
                <span>{item}</span>
                <i>✦</i>
              </Fragment>
            ))}
          </div>
        </div>

        <section className={styles["clubs-perks"]} aria-labelledby="perks-title">
          <div className={styles["clubs-perks-bg-layer"]} aria-hidden="true">
            <div className={styles["clubs-perks-dots"]} />
            <div className={styles["clubs-perks-glow"]} />
          </div>
          <div
            className={`${styles["clubs-perks-photo"]} ${styles["clubs-perks-photo-one"]}`}
            aria-hidden="true"
          >
            <Image src={perksPhotoOne} alt="" fill sizes="(max-width: 1100px) 0px, 210px" />
          </div>
          <div
            className={`${styles["clubs-perks-sticker"]} ${styles["clubs-perks-sticker-one"]}`}
            aria-hidden="true"
          >
            <Image src={perksSticker} alt="" fill sizes="(max-width: 1100px) 0px, 96px" />
          </div>
          <div className={styles["clubs-perks-heading"]}>
            <p className={styles["clubs-eyebrow"]}>{t("perksEyebrow")}</p>
            <h2 id="perks-title">
              {t("perksTitle1")}
              <br />
              {t("perksTitle2")}
            </h2>
            <p>{t("perksBody")}</p>
          </div>
          <div className={styles["clubs-perks-grid"]}>
            <article className={`${styles["clubs-perk"]} ${styles["clubs-perk-yellow"]}`}>
              <div
                className={`${styles["clubs-perk-sticker"]} ${styles["clubs-perk-sticker-sledding"]}`}
                aria-hidden="true"
              >
                <Image src={sleddingSticker} alt="" fill sizes="84px" />
              </div>
              <div
                className={`${styles["clubs-perk-sticker"]} ${styles["clubs-perk-sticker-apple"]}`}
                aria-hidden="true"
              >
                <Image src={appleSticker} alt="" fill sizes="48px" />
              </div>
              <Image
                src={startLogo}
                alt="Start"
                className={styles["clubs-perk-icon"]}
                width={48}
                height={48}
              />
              <h3>{t("starterTitle")}</h3>
              <p>{t("starterBody")}</p>
              <a
                href="https://startgrant.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-joining-card-cta"]} cta-btn`}
              >
                {t("starterCta")} <Arrow />
              </a>
            </article>
            <article className={`${styles["clubs-perk"]} ${styles["clubs-perk-purple"]}`}>
              <div
                className={`${styles["clubs-perk-sticker"]} ${styles["clubs-perk-sticker-heidi"]}`}
                aria-hidden="true"
              >
                <Image src={heidiSticker} alt="" fill sizes="84px" />
              </div>
              <div
                className={`${styles["clubs-perk-sticker"]} ${styles["clubs-perk-sticker-pcb"]}`}
                aria-hidden="true"
              >
                <Image src={pcbSticker} alt="" fill sizes="44px" />
              </div>
              <span className={styles["clubs-perk-icon"]}>
                <svg
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="1.414"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label={t("shopIconLabel")}
                  viewBox="0 0 32 32"
                  preserveAspectRatio="xMidYMid meet"
                  fill="currentColor"
                  width="70"
                  height="70"
                >
                  <path d="M16,7c-0.552,0 -1,0.448 -1,1l0,2.019l2,-0.004l0,-2.015c0,-0.552 -0.448,-1 -1,-1Z" />
                  <path d="M17,24l0,-2.015l-2,0l0,2.015c0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1Z" />
                  <path d="M21.909,12.004c0.107,0.542 -0.358,0.995 -0.91,0.995c-0.552,0.001 -0.942,-0.492 -1.25,-0.95c-0.402,-0.598 -0.499,-1.049 -3.749,-1.049c-3.25,0 -4,0 -4,2c0,2 0.606,2 4,2c5.143,0 6,0.8 6,4c0,2.95 -1.275,3.86 -5,3.985c-0.631,0.021 -1.369,0.021 -2,0c-2.872,-0.096 -4.559,-0.785 -4.924,-2.988c-0.091,-0.545 0.372,-0.997 0.924,-0.997c0.552,0 0.925,0.463 1.075,0.995c0.208,0.736 0.99,1.005 3.925,1.005c4,0 4,-0.5 4,-1.998l0,-0.004c0,-1.498 0,-1.998 -4,-1.998c-5.143,0 -6,-1 -6,-4c0,-2.766 1.275,-3.832 5,-3.981c0.631,-0.026 1.369,-0.025 2,-0.004c3.006,0 4.537,1.096 4.909,2.989Z" />
                </svg>
              </span>
              <h3>{t("shopTitle")}</h3>
              <p>{t("shopBody")}</p>
              <a
                href="https://clubs.hackclub.com/"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-joining-card-cta"]} cta-btn`}
              >
                {t("shopCta")} <Arrow />
              </a>
            </article>
            <article className={`${styles["clubs-perk"]} ${styles["clubs-perk-blue"]}`}>
              <div
                className={`${styles["clubs-perk-sticker"]} ${styles["clubs-perk-sticker-cascade"]}`}
                aria-hidden="true"
              >
                <Image src={cascadeSticker} alt="" fill sizes="84px" />
              </div>
              <Image
                src={spacesLogo}
                alt="Spaces"
                className={styles["clubs-perk-icon"]}
                width={48}
                height={48}
              />
              <h3>Spaces</h3>
              <p>{t("spacesBody")}</p>
              <a
                href="https://spaces.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-joining-card-cta"]} cta-btn`}
              >
                {t("spacesCta")} <Arrow />
              </a>
            </article>
          </div>
          <div className={styles["clubs-perks-footer"]}>
            <a
              href="https://toolbox.hackclub.com"
              target="_blank"
              rel="noreferrer"
              className={`${styles["clubs-text-link"]} cta-btn`}
            >
              {t("allPerksCta")} <Arrow />
            </a>
          </div>
          <Image src={creature1} alt="Canva" className={styles["layover-creature1"]} />
          <div
            className="wave-container"
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                className={styles["clubs-perks-wave-stroke"]}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                className={styles["clubs-perks-wave-fill"]}
              />
            </svg>
          </div>
        </section>

        <section className={styles["clubs-ysws"]} aria-labelledby="ysws-title">
          <div className={styles["clubs-ysws-top"]}>
            <div>
              <p className={styles["clubs-eyebrow"]}>{t("yswsEyebrow")}</p>
              <h2 id="ysws-title">
                {t("yswsTitle1")}
                <br />
                <span>{t("yswsTitle2")}</span>
              </h2>
            </div>
            <p>
              {t.rich("yswsBody", {
                hl: (chunks) => <span>{chunks}</span>,
                shop: (chunks) => <a href="https://clubs.hackclub.com/">{chunks}</a>,
              })}
            </p>
          </div>
          <div className={styles["clubs-scroll-wrap"]}>
            <div className={styles["clubs-scroll-container"]}>
              <ul className={styles["clubs-scroll-row"]}>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://boba.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-bobadrops"]}`}
                  >
                    <div className={styles["clubs-project-content"]}>
                      <Image
                        src={bobaLogo}
                        alt="Boba Drops"
                        className={styles["clubs-project-logo"]}
                      />
                      <h3>Boba Drops</h3>
                      <p>{t("bobaBody")}</p>
                      <Image
                        src={bobaOrph}
                        alt=""
                        className={styles["clubs-project-icon-bobadrops"]}
                      />
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://fusering.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-fusering"]}`}
                  >
                    <Image
                      src={fuseRingBackground}
                      alt=""
                      fill
                      sizes="275px"
                      className={styles["clubs-project-background"]}
                    />
                    <div className={styles["clubs-project-content"]}>
                      <Image src={fuseLogo} alt="" className={styles["clubs-project-logo"]} />
                      <h3>FuseRing</h3>
                      <p>{t("fuseringBody")}</p>
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://sprig.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-sprig"]}`}
                  >
                    <Image
                      src={sprigBackground}
                      alt=""
                      fill
                      sizes="275px"
                      className={styles["clubs-project-background"]}
                    />
                    <div className={styles["clubs-project-content"]}>
                      <h3>Sprig</h3>
                      <p>{t("sprigBody")}</p>
                      <div className={styles["clubs-project-logo-sprig"]}>
                        <Image src={sprigLogo} alt="Sprig" />
                      </div>
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://terminalcraft.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-terminalcraft"]}`}
                  >
                    <div className={styles["clubs-project-content"]}>
                      <Image
                        src={terminalCraftLogo}
                        alt=""
                        className={styles["clubs-project-logo"]}
                      />
                      <h3>TerminalCraft</h3>
                      <p>{t("terminalcraftBody")}</p>
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://swirl.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-swirl"]}`}
                  >
                    <div className={styles["clubs-project-content"]}>
                      <Image src={swirlLogo} alt="" className={styles["clubs-project-logo"]} />
                      <p>{t("swirlBody")}</p>
                      <Image
                        src={swirlIcon}
                        alt=""
                        className={styles["clubs-project-icon-swirl"]}
                      />
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://toppings.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-toppings"]}`}
                  >
                    <div className={styles["clubs-project-content"]}>
                      <Image src={toppingsLogo} alt="" className={styles["clubs-project-logo"]} />
                      <p>{t("toppingsBody")}</p>
                      <Image
                        src={parrot}
                        alt=""
                        unoptimized
                        className={styles["clubs-project-icon-toppings"]}
                      />
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://waffles.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-waffles"]}`}
                  >
                    <div className={styles["clubs-project-content"]}>
                      <Image src={wafflesLogo} alt="" className={styles["clubs-project-logo"]} />
                      <h3>Waffles</h3>
                      <p>{t("wafflesBody")}</p>
                    </div>
                  </a>
                </li>
                <li style={{ display: "contents" }}>
                  <a
                    href="https://downscale.hackclub.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles["clubs-project"]} ${styles["clubs-project-downscale"]}`}
                  >
                    <div className={styles["clubs-project-content"]}>
                      <Image src={downscaleLogo} alt="" className={styles["clubs-project-logo"]} />
                      <p>{t("downscaleBody")}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles["clubs-learn"]} id="learn-more" aria-labelledby="learn-title">
          <p className={styles["clubs-eyebrow"]}>{t("learnEyebrow")}</p>
          <h2 id="learn-title">{t("learnTitle")}</h2>
          <div className={styles["clubs-path-grid"]}>
            <LearnMoreCards styles={styles} />
            <PathCard
              title={t("teacherZoneTitle")}
              description={t("teacherZoneBody")}
              cta={t("learnMore")}
              href="/teachers"
              bg="/assets/backImg10.webp"
            />
            <a
              className={styles["clubs-joining-card"]}
              href="https://school-toolbox.hackclub.com"
              target="_blank"
              rel="noreferrer"
              aria-label={t("toolboxTitle")}
            >
              <JoiningCard
                title={t("toolboxTitle")}
                description={t("toolboxBody")}
                bg="/assets/backImg13.webp"
              >
                <span className={`${styles["clubs-joining-card-link"]} cta-btn`}>
                  {t("learnMore")} <Arrow />
                </span>
              </JoiningCard>
            </a>
          </div>
        </section>

        <section className={styles["clubs-intro"]}>
          <div className={styles["clubs-intro-photo"]} aria-hidden="true">
            <Image
              src="https://cdn.hackclub.com/019db857-6029-75d8-b74b-1de86e95a794/joiningCard1Bg.webp"
              alt=""
              fill
              sizes="100vw"
            />
          </div>
          <div className={styles["clubs-intro-photo-overlay"]} aria-hidden="true" />
          <div className={styles["clubs-section-heading"]}>
            <p className={styles["clubs-eyebrow"]}>{t("slackEyebrow")}</p>
            <h2>{t.rich("slackTitle", { em: (chunks) => <em>{chunks}</em> })}</h2>
            <div className={styles["clubs-intro-body"]}>
              <p>{t("slackBody")}</p>
              <a
                href="https://slack.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-button"]} ${styles["clubs-button-red"]} cta-btn`}
              >
                <Image src={slackLogo} alt="" width={20} height={20} />
                {t("slackCta")} <Arrow />
              </a>
            </div>
          </div>
          <SlackStats styles={styles} />
          <div className={styles["clubs-intro-sticker"]} aria-hidden="true">
            <Image src={slackLogo} alt="" fill sizes="100px" />
          </div>
        </section>

        <section className={styles["clubs-closing"]}>
          <p className={styles["clubs-eyebrow"]}>{t("closingEyebrow")}</p>
          <h2>
            {t("closingTitle1")}
            <br />
            {t.rich("closingTitle2", { em: (chunks) => <em>{chunks}</em> })}
          </h2>
          <a
            className={`${styles["clubs-button"]} ${styles["clubs-button-red"]} cta-btn`}
            href="https://apply.hackclub.com"
            target="_blank"
            rel="noreferrer"
          >
            {t("closingCta")} <Arrow />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
