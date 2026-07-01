/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Icon from "@hackclub/icons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import { ThemeLock } from "@/components/ThemeToggle";

const AUTHORS = [
  {
    name: "Sam Poder",
    firstName: "Sam",
    image: "https://github.com/sampoder.png",
  },
  {
    name: "Ian Madden",
    firstName: "Ian",
    image: "https://cdn.hackclub.com/019c76b7-3337-718e-b630-818f2a4340bd/m11HEg.png",
  },
  {
    name: "Gary Tou",
    firstName: "Gary",
    image: "https://github.com/garyhtou.png",
  },
  {
    name: "Manu Gurudath",
    firstName: "Manu",
    image: "https://github.com/manuthecoder.png",
  },
  {
    name: "Ruien Luo",
    firstName: "Ruien",
    image: "https://github.com/rluodev.png",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "HCB is now open source! | Hack Club",
  description:
    "Our fiscal sponsorship platform's codebase is now publicly available under the AGPL license and we're continuing to encourage transparency amongst nonprofits.",
  canonical: "/fiscal-sponsorship/open-source",
  image: "https://cdn.hackclub.com/019c76b8-802d-74e1-9980-f509a8d9bfd6/I2o1xg.png",
  imageAlt: "HCB is now open source!",
});

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  const pillClassName = className ? `announcement-pill ${className}` : "announcement-pill";

  return <div className={pillClassName}>{children}</div>;
}

function AuthorPill({
  name,
  firstName,
  image,
}: {
  name: string;
  firstName: string;
  image: string;
}) {
  return (
    <Pill className="announcement-pill">
      <img
        src={image}
        alt={firstName}
        width={36}
        height={36}
        className="announcement-pill__avatar"
      />
      <span>{name}</span>
    </Pill>
  );
}

function DatePill({ children }: { children: ReactNode }) {
  return <Pill className="announcement-pill__date">{children}</Pill>;
}

function WelcomeCta() {
  return (
    <section className="welcome-cta" aria-labelledby="welcome-cta-title">
      <div className="welcome-cta__inner">
        <div className="welcome-cta__icon" aria-hidden="true">
          <Icon glyph="welcome" size={72} />
        </div>
        <div className="welcome-cta__content">
          <h2 id="welcome-cta-title">Teenager? New here? Welcome!</h2>
          <p>
            Hack Club is a global community of high school makers &amp; student-led coding clubs.
            We&apos;ve got a 24/7 Slack chatroom of 104k+ teenagers learning to code &amp; building
            amazing projects, &amp; you&apos;ll fit right in.
          </p>
          <Link href="/" className="welcome-cta__button">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function OpenSourcePage() {
  return (
    <>
      <ThemeLock />
      <div className="open-source-announcement-page">
        <header className="announcement-header">
          <Navbar />
        </header>

        <main id="main" tabIndex={-1}>
          <section className="announcement-hero">
            <div className="announcement-hero__inner">
              <h1>
                <Link href="/fiscal-sponsorship" className="announcement-hero__link">
                  HCB
                </Link>{" "}
                is now open source!
              </h1>
              <h2>
                Our fiscal sponsorship platform&apos;s{" "}
                <a
                  href="https://github.com/hackclub/hcb"
                  target="_blank"
                  rel="noreferrer"
                  className="announcement-hero__link"
                >
                  codebase
                </a>{" "}
                is now publicly available under the AGPL license and we&apos;re continuing to
                encourage transparency amongst nonprofits.
              </h2>
            </div>
          </section>

          <article className="announcement-copy" aria-labelledby="announcement-title">
            <div className="announcement-pills" aria-label="Post authors and date">
              {AUTHORS.map((author) => (
                <AuthorPill
                  key={author.name}
                  name={author.name}
                  firstName={author.firstName}
                  image={author.image}
                />
              ))}
              <DatePill>Mar 29, 2025</DatePill>
            </div>

            <div className="announcement-body">
              <h1 id="announcement-title" className="sr-only">
                HCB is now open source!
              </h1>

              <p>
                Hack Club launched HCB in 2018 to enable hackathons to raise and spend money through{" "}
                <Link href="/fiscal-sponsorship">fiscal sponsorship</Link>. Since then, we&apos;ve
                expanded to all nonprofit projects; our 12,000 users have transacted $50 million.
              </p>

              <p className="announcement-center">
                <img
                  src="https://cdn.hackclub.com/019c76b7-a601-7e83-a9fb-e26595864142/flGLlg.png"
                  alt="HCB's user interface showing Hack Club HQ's transactions"
                  width="700"
                />
              </p>

              <p>
                Local student-ran hackathons, robotics teams, and community groups use HCB as a
                nonprofit neobank to collect donations, send payments, issue debit cards, and gain
                501(c)(3) status.
              </p>

              <p>
                When we started HCB, it was developed in private for security reasons. That said,
                one of Hack Club&apos;s core principles has always been transparency - we{" "}
                <a href="https://github.com/hackclub/ledger" target="_blank" rel="noreferrer">
                  open source
                </a>{" "}
                our{" "}
                <a href="https://hcb.hackclub.com/hq" target="_blank" rel="noreferrer">
                  finances
                </a>
                ,{" "}
                <a href="https://github.com/hackclub/assemble" target="_blank" rel="noreferrer">
                  document how we run events
                </a>
                , and have 500+ public repositories on{" "}
                <a href="https://github.com/hackclub" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                .
              </p>

              <p>
                <strong>
                  <em>
                    <a href="https://github.com/hackclub/hcb" target="_blank" rel="noreferrer">
                      github.com/hackclub/hcb
                    </a>{" "}
                    is now public - check it out and star it.
                  </em>
                </strong>
              </p>

              <p>
                Paired with our technical documentation, it&apos;s a great resource for anyone
                interested in building financial software or applications with Ruby on Rails. Our
                engineering work is also entirely public; the world can learn from our successes and
                mistakes.
              </p>

              <p>
                Since 2018, over fifty people have made 10k+ commits to HCB (thank you!); we
                can&apos;t wait for more contributors to join us:
              </p>

              {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
              <video width="100%" controls className="announcement-video">
                <source
                  src="https://cdn.hackclub.com/019db766-797c-7e13-be36-0e39eaf40c8f/gsource.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <p>
                PS: if you&apos;re looking to start a nonprofit, we&apos;re accepting applications!
                Head over to{" "}
                <a href="https://nonprofit.new/" target="_blank" rel="noreferrer">
                  nonprofit.new
                </a>{" "}
                and we&apos;ll be in touch.
              </p>

              <figure className="announcement-photo">
                <img
                  src="https://cdn.hackclub.com/019c76b9-f285-79f8-93af-2b43e0a67674/A8ZCLg.jpeg"
                  alt="Hack Club team launching the announcement live from San Francisco"
                />
                <figcaption>We&apos;re launching this live from SF!</figcaption>
              </figure>
            </div>
          </article>

          <WelcomeCta />
        </main>
      </div>

      <Footer />

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .open-source-announcement-page {
          background: #ffffff;
          color: #1f2d3d;
        }

        .announcement-header {
          position: relative;
          min-height: 80px;
          background: #ffffff;
        }

        .announcement-hero {
          padding: clamp(64px, 11vw, 128px) 24px clamp(32px, 8vw, 64px);
          background-color: rgb(104, 41, 205);
          background-image:
            radial-gradient(
              ellipse farthest-corner at top left,
              #a633d6,
              #ff8c37
            );
        }

        .announcement-hero__inner {
          width: min(1024px, 100%);
          margin: 0 auto;
          text-align: center;
          color: #ffffff;
        }

        .announcement-hero h1 {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .announcement-hero h2 {
          margin: 24px auto 0;
          max-width: 900px;
          font-family: var(--font-phantom);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 400;
          line-height: 1.25;
          text-wrap: balance;
        }

        .announcement-hero__link {
          color: #ffffff;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
        }

        .announcement-copy {
          width: min(768px, calc(100vw - 48px));
          margin: 0 auto;
          padding: 64px 0 80px;
        }

        .announcement-pills {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0 12px;
          margin-bottom: 24px;
        }

        .announcement-pill {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          margin-bottom: 12px;
          padding: 4px;
          padding-right: 8px;
          border: 1px solid #e0e6ed;
          border-radius: 999px;
          background: #f9fafc;
          color: #8492a6;
          font-family: var(--font-phantom);
          font-size: 16px;
          font-weight: 400;
          line-height: 36px;
        }

        .announcement-pill__avatar {
          width: 36px;
          height: 36px;
          margin-right: 8px;
          border-radius: 999px;
          object-fit: cover;
        }

        .announcement-pill__date {
          padding-left: 16px;
          padding-right: 16px;
        }

        .announcement-body {
          font-family: var(--font-phantom);
          font-size: clamp(20px, 2vw, 24px);
          line-height: 1.5;
          color: #1f2d3d;
        }

        .announcement-body p {
          margin: 0 0 24px;
        }

        .announcement-body a {
          color: #ec3750;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .announcement-body strong {
          font-weight: 700;
        }

        .announcement-body em {
          font-style: italic;
        }

        .announcement-center {
          text-align: center;
        }

        .announcement-center img,
        .announcement-photo img {
          max-width: 100%;
          height: auto;
        }

        .announcement-video {
          display: block;
          width: 100%;
          margin: 0 0 24px;
          border-radius: 8px;
        }

        .announcement-photo {
          margin: 0;
        }

        .announcement-photo figcaption {
          margin-top: 8px;
          color: #8492a6;
          font-size: 14px;
          line-height: 1.4;
        }

        .welcome-cta {
          background-image:
            radial-gradient(
              ellipse farthest-corner at top left,
              #f1c40f,
              #ff8c37
            );
          color: #ffffff;
          padding: 64px 24px;
        }

        .welcome-cta__inner {
          width: min(1024px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 24px 32px;
          align-items: start;
        }

        .welcome-cta__icon {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          line-height: 1;
        }

        .welcome-cta__content h2 {
          margin: 0 0 16px;
          font-family: var(--font-phantom);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          line-height: 1.125;
        }

        .welcome-cta__content p {
          margin: 0 0 32px;
          max-width: 44rem;
          font-family: var(--font-phantom);
          font-size: clamp(20px, 2vw, 24px);
          line-height: 1.375;
        }

        .welcome-cta__button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 0 24px;
          border-radius: 999px;
          background: #5bc0de;
          color: #ffffff;
          font-family: var(--font-phantom);
          font-size: 20px;
          font-weight: 700;
          text-decoration: none;
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.125),
            0 1px 2px rgba(0, 0, 0, 0.0625);
          transition: transform 0.125s ease-in-out, box-shadow 0.125s ease-in-out;
        }

        .welcome-cta__button:hover {
          transform: scale(1.0625);
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.0625),
            0 8px 12px rgba(0, 0, 0, 0.125);
        }

        @media (max-width: 767px) {
          .announcement-copy {
            width: calc(100vw - 32px);
            padding-top: 48px;
            padding-bottom: 64px;
          }

          .announcement-hero {
            padding-left: 16px;
            padding-right: 16px;
          }

          .announcement-hero h1 {
            font-size: clamp(40px, 12vw, 56px);
          }

          .announcement-hero h2 {
            margin-top: 20px;
            font-size: 24px;
          }

          .announcement-body {
            font-size: 20px;
          }

          .welcome-cta {
            padding: 48px 16px;
          }

          .welcome-cta__inner {
            grid-template-columns: 1fr;
          }

          .welcome-cta__icon {
            justify-content: flex-start;
          }

          .welcome-cta__content h2 {
            font-size: 32px;
          }

          .welcome-cta__content p,
          .welcome-cta__button {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}
