import styles from "./page.module.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BtnArrowSvg } from "@/components/landing/btn-arrow";
import { LearnMoreCards } from "./learn-more-cards";
import { SlackStats } from "./slack-stats";
import { IMAGES, STICKERS, shuffle } from "./random-media";
import { buildPageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import slackLogo from "./assets/slack.svg";
import cascadeSticker from "./assets/cascade.png";
import sleddingSticker from "./assets/sledding.png";
import appleSticker from "./assets/randomAppleCuzWhyNot.png";
import heidiSticker from "./assets/heidi.png";
import pcbSticker from "./assets/pcb.png";
import spacesLogo from "./assets/spaces.png";
import startLogo from "./assets/start.svg";
import creature1 from "./assets/creature1.webp";
import bobaLogo from "./assets/boba.png";
import bobaOrph from "./assets/bobaOrph.png";
import fuseLogo from "./assets/fusering.svg";
import fuseRingBackground from "./assets/fuseringBG.webp";
import sprigBackground from "./assets/sprigBG.png";
import sprigLogo from "./assets/sprig.svg";
import terminalCraftLogo from "./assets/terminalcraft.png";
import swirlLogo from "./assets/swirl.svg";
import swirlIcon from "./assets/icecream.svg";
import toppingsLogo from "./assets/toppings.png";
import parrot from "./assets/parrot.gif";
import wafflesLogo from "./assets/waffles.svg";
import downscaleLogo from "./assets/downscale.webp";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "Hack Clubs",
    description: "A place for high school hackers to build together!",
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
  href,
  bg,
}: {
  title: string;
  description: string;
  href: string;
  bg: string;
}) {
  return (
    <Link href={href} className={styles["clubs-joining-card"]}>
      <JoiningCard title={title} description={description} bg={bg}>
        <span className={`${styles["clubs-joining-card-link"]} cta-btn`}>
          Learn more <Arrow />
        </span>
      </JoiningCard>
    </Link>
  );
}

export default async function ClubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
            <p className={styles["clubs-eyebrow"]}>Hack Club presents</p>
            <h1>
              Your school&apos;s
              <span>most interesting</span>
              room!
            </h1>
            <p className={styles["clubs-hero-copy"]}>
              A worldwide network of high school coding clubs. Make cool things, find people who
              share your interests, and get help from a community of hackers!
            </p>
            <div className={styles["clubs-actions"]}>
              <a
                className={`${styles["clubs-button"]} ${styles["clubs-button-red"]} cta-btn`}
                href="https://apply.hackclub.com"
                target="_blank"
                rel="noreferrer"
              >
                Start a club <Arrow />
              </a>
              <a
                className={`${styles["clubs-button"]} ${styles["clubs-button-outline"]} cta-btn`}
                href="https://clubs.hackclub.com/auth/login"
                target="_blank"
                rel="noreferrer"
              >
                Sign in
              </a>
              <a className={styles["clubs-text-link"]} href="#learn-more">
                Learn more <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles["clubs-hero-signin-note"]}>
              Club member?{" "}
              <a href="https://clubs.hackclub.com/auth/member" target="_blank" rel="noreferrer">
                Sign in with email
              </a>
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
            <span>CODE TOGETHER</span>
            <i>✦</i>
            <span>MAKE FRIENDS</span>
            <i>✦</i>
            <span>BUILD COOL STUFF</span>
            <i>✦</i>
            <span>DRINK BOBA</span>
            <i>✦</i>
            <span>GET REWARDS</span>
            <i>✦</i>
          </div>

          <div aria-hidden="true">
            <span>CODE TOGETHER</span>
            <i>✦</i>
            <span>MAKE FRIENDS</span>
            <i>✦</i>
            <span>BUILD COOL STUFF</span>
            <i>✦</i>
            <span>DRINK BOBA</span>
            <i>✦</i>
            <span>GET REWARDS</span>
            <i>✦</i>
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
            <p className={styles["clubs-eyebrow"]}>Club perks</p>
            <h2 id="perks-title">
              Perks we offer your club.
              <br />
              For free!
            </h2>
            <p>Everything your club needs to grow!</p>
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
              <h3>Club Starter</h3>
              <p>Create promotional materials for your club. Get up to $100 in funding!</p>
              <a
                href="https://startgrant.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-joining-card-cta"]} cta-btn`}
              >
                Explore Club Starter <Arrow />
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
                  aria-label="payment"
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
              <h3>Clubs Shop</h3>
              <p>Stickers, shirts, Raspberry Pis, and more to help your club thrive.</p>
              <a
                href="https://clubs.hackclub.com/"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-joining-card-cta"]} cta-btn`}
              >
                Visit the shop <Arrow />
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
              <p>
                All-in-one web IDE to create, host and collaborate in with over 500 supported
                languages and a variety of templates to use.
              </p>
              <a
                href="https://spaces.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-joining-card-cta"]} cta-btn`}
              >
                Explore Spaces <Arrow />
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
              Explore all club perks <Arrow />
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
              <p className={styles["clubs-eyebrow"]}>Popular YSWS</p>
              <h2 id="ysws-title">
                You ship.
                <br />
                <span>We ship!</span>
              </h2>
            </div>
            <p>
              Our YSWS programs reward clubs with coins for shipping projects. Coins can be used in
              the{" "}
              <span>
                <a href="https://clubs.hackclub.com/">clubs shop</a>!
              </span>
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
                      <p>Host a boba workshop for your club, make a website, get free boba!</p>
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
                      <p>Design a keyring and get it shipped to you with a backpack clip.</p>
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
                      <p>You ship a game made on the sprig game engine, we ship a sprig console!</p>
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
                      <p>
                        Develop a program that runs in the terminal, earn a grant to spend on
                        hardware and microcontrollers!
                      </p>
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
                      <p>
                        Build a cooler website with HTML and CSS, with a unique feature like a
                        favicon, and get free ice cream!
                      </p>
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
                      <p>
                        Add some extra flavor to your website, with CSS and get toppings for your
                        ice cream or boba!
                      </p>
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
                      <p>Make a website that uses JavaScript, and get free waffles!</p>
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
                      <p>Make a retro game with PICO-8, get a grant for your club!</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles["clubs-learn"]} id="learn-more" aria-labelledby="learn-title">
          <p className={styles["clubs-eyebrow"]}>Learn more</p>
          <h2 id="learn-title">Learn more about:</h2>
          <div className={styles["clubs-path-grid"]}>
            <LearnMoreCards styles={styles} />
            <PathCard
              title="The Teacher Zone"
              description="This is where you can find ways to support a Hack Club at your school!"
              href="/teachers"
              bg="/assets/backImg10.webp"
            />
            <a
              className={styles["clubs-joining-card"]}
              href="https://school-toolbox.hackclub.com"
              target="_blank"
              rel="noreferrer"
              aria-label="School toolbox"
            >
              <JoiningCard
                title="School toolbox"
                description="Resources for starting a Hack Club at your school!"
                bg="/assets/backImg13.webp"
              >
                <span className={`${styles["clubs-joining-card-link"]} cta-btn`}>
                  Learn more <Arrow />
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
            <p className={styles["clubs-eyebrow"]}>Become a part of</p>
            <h2>
              The Hack Club Slack <em>Community.</em>
            </h2>
            <div className={styles["clubs-intro-body"]}>
              <p>
                Slack is where the community hangs out! Slack is a chat app like Discord, but
                better! It has unlimited custom emojis and uncapped file uploads.
              </p>
              <a
                href="https://slack.hackclub.com"
                target="_blank"
                rel="noreferrer"
                className={`${styles["clubs-button"]} ${styles["clubs-button-red"]} cta-btn`}
              >
                <Image src={slackLogo} alt="" width={20} height={20} />
                Join the community <Arrow />
              </a>
            </div>
          </div>
          <SlackStats styles={styles} />
          <div className={styles["clubs-intro-sticker"]} aria-hidden="true">
            <Image src={slackLogo} alt="" fill sizes="100px" />
          </div>
        </section>

        <section className={styles["clubs-closing"]}>
          <p className={styles["clubs-eyebrow"]}>Get started now</p>
          <h2>
            The best club
            <br />
            at school is <em>yours.</em>
          </h2>
          <a
            className={`${styles["clubs-button"]} ${styles["clubs-button-red"]} cta-btn`}
            href="https://apply.hackclub.com"
            target="_blank"
            rel="noreferrer"
          >
            Start a Hack Club <Arrow />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
