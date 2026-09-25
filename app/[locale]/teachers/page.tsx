import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { buildPageMetadata } from "@/lib/seo";
import { TeachersEmailSignup } from "@/components/teachers-email-signup";
import hackersSticker from "./assests/hackers.png";
import styles from "./page.module.css";

const ACCENTS = ["#ec3750", "#ff8c37", "#2d7dd2", "#7c4dff", "#12b886"];

function Hl({ children, color }: { children: ReactNode; color: string }) {
  return (
    <strong className={styles["teacher-highlight"]} style={{ "--accent": color } as CSSProperties}>
      {children}
    </strong>
  );
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title: "For Teachers — Hack Club",
    description:
      "Hack Club is a welcoming, supportive space where teens can explore technology, make friends, and build things they're proud of — all with independence and agency.",
    canonical: "/teachers",
    locale,
  });
}

const ENGAGE_BOXES = [
  {
    label: "Build technical projects",
    image: "/assets/parent1.png",
    body: "Learn AI-proof advanced technical skills by shipping open-source projects valued in every career.",
  },
  {
    label: "Get prizes",
    image: "/assets/parent2.png",
    body: "Get funding to build hardware projects and earn prizes like MacBooks and iPads — over $2m distributed this past year.",
  },
  {
    label: "Travel to hackathons",
    image: "/assets/parent3.jpg",
    body: "Attend in-person hackathons with travel stipends, develop independence, and form life-long friendships.",
  },
  {
    label: "Socializing online",
    image: "/assets/parent4.png",
    body: "Teens exchange millions of messages in our moderated online community in Slack.",
  },
  {
    label: "Meet tech leaders",
    image: "/assets/parent5.png",
    body: "Join AMA calls with tech leaders like Elon Musk, Jared Isaacman, Michael Dell, etc. and directly ask them questions.",
  },
  {
    label: "Coding clubs",
    image: "/assets/parent6.png",
    body: "Our coding clubs meet typically 1 hour each week in high schools or community spaces and build things together.",
  },
];

export default async function TeachersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
          <span className={styles["teacher-hero-tag"]}>For Teachers</span>
          <h1 className={styles["teacher-hero-title"]}>
            For Teachers,
            <span className={styles["teacher-hero-title-accent"]}>the ones who say yes:</span>
          </h1>
          <p className={styles["teacher-hero-lede"]}>
            Hack Club is a supportive space where teens 13 - 18 year olds can explore technology,
            make friends, and build things they&apos;re proud of — all with independence and agency.
            You don&apos;t need to code to help make it happen!
          </p>
          <div className={styles["teacher-hero-signup"]}>
            <p className={styles["teacher-hero-signup-label"]}>
              Get updates on how to support Hack Club near you
            </p>
            <TeachersEmailSignup />
          </div>
        </section>

        <section className={styles["teacher-facts-section"]}>
          <p className={styles["teacher-eyebrow"]}>The basics</p>
          <h2 className={styles["teacher-facts-heading"]}>Hack Club is:</h2>
          <p className={styles["teacher-statement"]}>
            A nonprofit and the <Hl color={ACCENTS[0]}>world&apos;s largest community</Hl> of
            teenagers who like to <Hl color={ACCENTS[1]}>code</Hl> and{" "}
            <Hl color={ACCENTS[1]}>build awesome stuff</Hl>. We engage over{" "}
            <Hl color={ACCENTS[2]}>140k+ teenagers</Hl> from over{" "}
            <Hl color={ACCENTS[2]}>100 countries</Hl> in our programs — a teen-led community that
            fosters agency, where teachers and grown-ups just sit back and support. We&apos;re
            backed by <Hl color={ACCENTS[3]}>MIT, NASA, GitHub, AMD, Dell Technologies</Hl> and
            more, and it&apos;s <Hl color={ACCENTS[4]}>always free</Hl> for teens — no matter what.
          </p>
        </section>

        <section className={styles["teacher-whats-section"]}>
          <div className={styles["teacher-whats-sticker"]}>
            <Image src={hackersSticker} alt="" width={220} height={220} aria-hidden="true" />
          </div>
          <div className={styles["teacher-whats-content"]}>
            <h2 className={styles["teacher-whats-heading"]}>What&apos;s a Hack Club?</h2>
            <div className={styles["teacher-whats-body"]}>
              <p>
                <strong>Hacking</strong> is the skill of finding creative solutions to problems. For
                us, it means making the world a better place through technology.
              </p>
              <p>
                A <strong>Hack Club</strong> is a coding club where members meet weekly in schools
                and communities. Leaders kick things off, members build websites, apps, and games at
                their own pace, then everyone demos what they made!
              </p>
            </div>
          </div>
        </section>

        <section className={styles["teacher-video-section"]}>
          <div className={styles["teacher-video-card"]}>
            <div className={styles["teacher-video-embed"]}>
              <YouTubeEmbed id="xXIxwV7bQTw" title="Hack Club meetings" />
            </div>
            <p className={styles["teacher-video-caption"]}>
              Students building and demoing projects at a weekly Hack Club meeting
            </p>
          </div>
        </section>

        <section className={styles["teacher-engage-heading-section"]}>
          <h2 className={styles["teacher-engage-heading"]}>How do teens engage in Hack Club?</h2>
        </section>

        <section className={styles["teacher-engage-section"]}>
          <div className={styles["teacher-engage-grid"]}>
            {ENGAGE_BOXES.map((box) => (
              <div key={box.label} className={styles["teacher-engage-box"]}>
                <Image
                  src={box.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={styles["teacher-engage-box-image"]}
                />
                <p className={styles["teacher-engage-box-label"]}>{box.label}</p>
                <p className={styles["teacher-engage-box-body"]}>{box.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles["teacher-benefits-section"]}>
          <p className={styles["teacher-eyebrow"]}>The payoff</p>
          <h2 className={styles["teacher-benefits-heading"]}>
            What benefits do students get from Hack Club?
          </h2>
          <p className={styles["teacher-statement"]}>
            Students build <Hl color={ACCENTS[0]}>portfolio-ready, open-source projects</Hl> valued
            by employers and college admission officers, and gain{" "}
            <Hl color={ACCENTS[1]}>leadership skills</Hl> by running a hackathon or leading a coding
            club. Hack Club offers <Hl color={ACCENTS[2]}>internships</Hl>, 1-year paid{" "}
            <Hl color={ACCENTS[2]}>fellowships</Hl>, and employs teens for{" "}
            <Hl color={ACCENTS[2]}>contract positions</Hl>. Alumni regularly host{" "}
            <Hl color={ACCENTS[3]}>meet-ups nationwide</Hl> and build a{" "}
            <Hl color={ACCENTS[3]}>powerful friend network</Hl> — most of all, they{" "}
            <Hl color={ACCENTS[4]}>make friends</Hl> with serious, ambitious, technical people. Hack
            Club will never try to sell or market anything to your students — we&apos;re a charity.
          </p>
        </section>

        <section className={styles["teacher-signup-section"]}>
          <div className={styles["teacher-signup-blobs"]} aria-hidden="true">
            <span className={styles["teacher-blob-purple"]} />
            <span className={styles["teacher-blob-teal"]} />
          </div>
          <h2 className={styles["teacher-signup-heading"]}>
            Interested in supporting Hack Club at your school or community space?
          </h2>
          <p className={styles["teacher-signup-lede"]}>
            Leave your email and we’ll keep you updated on opportunities to support Hack Club in
            your community!
          </p>
          <TeachersEmailSignup />
        </section>
      </main>
      <Footer />
    </>
  );
}
