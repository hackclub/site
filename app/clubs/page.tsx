import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { YouTubeEmbed } from "../../components/YouTubeEmbed";
import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/seo";
import { BtnArrowSvg } from "../../components/landing/btn-arrow";

export const metadata: Metadata = buildPageMetadata({
  title: "Hack Club Clubs — Start a Club",
  description:
    "Start a student-led coding club with Hack Club. Get workshops, mentorship, events, tools, and a global community.",
  canonical: "/clubs",
});

function FeatureCard({
  title,
  description,
  accent,
}: {
  title: string;
  description: ReactNode;
  accent: string;
}) {
  return (
    <article
      style={{
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "22px 20px",
        boxShadow: "0 10px 28px rgba(23,23,29,0.08)",
      }}
    >
      <div
        aria-hidden
        style={{
          width: 42,
          height: 42,
          borderRadius: 999,
          background: accent,
          marginBottom: 14,
          boxShadow: "inset 0 1px 3px rgba(255,255,255,0.45)",
        }}
      />
      <h3
        style={{
          margin: "0 0 8px",
          fontFamily: "var(--font-phantom)",
          fontWeight: 700,
          fontSize: 27,
          lineHeight: 1.1,
          color: "var(--foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          lineHeight: 1.25,
          color: "var(--foreground)",
          opacity: 0.92,
        }}
      >
        {description}
      </p>
    </article>
  );
}

function StepCard({
  title,
  description,
  gradient,
}: {
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <article
      style={{
        borderRadius: 20,
        padding: "26px 22px",
        color: "var(--paper)",
        background: gradient,
        boxShadow: "0 12px 30px rgba(23,23,29,0.16)",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontFamily: "var(--font-phantom)",
          fontWeight: 700,
          fontSize: 29,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          lineHeight: 1.2,
          opacity: 0.95,
        }}
      >
        {description}
      </p>
    </article>
  );
}

export default function ClubPage() {
  return (
    <>
      <Navbar invertColors />
      <main id="main" tabIndex={-1}>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(640px, 88vh, 860px)",
            paddingTop: "clamp(104px, 12vw, 140px)",
            paddingBottom: "clamp(56px, 8vw, 96px)",
            paddingLeft: "clamp(16px, 6vw, 80px)",
            paddingRight: "clamp(16px, 6vw, 80px)",
            background:
              "radial-gradient(1200px 500px at 50% -15%, rgba(236,55,80,0.45), rgba(236,55,80,0) 70%), linear-gradient(160deg, rgba(19,19,27,0.92) 0%, rgba(13,17,23,0.95) 100%), url('https://cdn.hackclub.com/019db857-6649-7f66-9184-21b9f538728a/joiningCard2Bg.webp') center/cover",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              opacity: 0.15,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: 1100,
              margin: "0 auto",
              textAlign: "center",
              color: "var(--cream)",
            }}
          >
            <h1
              style={{
                margin: "0 auto 18px",
                maxWidth: 980,
                fontFamily: "var(--font-zarathustra)",
                fontWeight: 400,
                fontSize: "clamp(52px, 8.3vw, 114px)",
                lineHeight: 0.93,
                color: "var(--paper)",
              }}
            >
              Don&apos;t run your coding club alone.
              <br />
              Make it a Hack Club.
            </h1>
            <p
              style={{
                margin: "0 auto",
                maxWidth: 740,
                fontFamily: "var(--font-phantom)",
                fontSize: "clamp(24px, 2.3vw, 35px)",
                lineHeight: 1.15,
                color: "var(--cream)",
                opacity: 0.95,
              }}
            >
              A global nonprofit network of high school coding clubs where teens build technical
              skills, real projects, and momentum.
            </p>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://apply.hackclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn club-hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ec3750",
                  color: "var(--paper)",
                  borderRadius: 999,
                  height: 56,
                  padding: "0 28px",
                  fontFamily: "var(--font-phantom)",
                  fontSize: 23,
                  textDecoration: "none",
                }}
              >
                Apply now{" "}
                <span className="btn-arrow" aria-hidden="true">
                  <BtnArrowSvg />
                </span>
              </a>
              <a
                href="https://slack.hackclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn club-hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #338eda 0%, #33d6a6 100%)",
                  color: "var(--paper)",
                  borderRadius: 999,
                  height: 56,
                  padding: "0 28px",
                  fontFamily: "var(--font-phantom)",
                  fontSize: 23,
                  textDecoration: "none",
                }}
              >
                Join the Slack
              </a>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "var(--surface)",
            color: "var(--foreground)",
            padding: "clamp(64px, 8.5vw, 112px) clamp(16px, 6vw, 80px)",
          }}
        >
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-phantom)",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#ec3750",
              }}
            >
              The Rundown
            </p>
            <h2
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-zarathustra)",
                fontWeight: 400,
                fontSize: "clamp(46px, 6vw, 88px)",
                lineHeight: 0.95,
              }}
            >
              Clubs discovering the joy of code.
            </h2>
            <p
              style={{
                margin: "0 0 30px",
                maxWidth: 940,
                fontFamily: "var(--font-phantom)",
                fontSize: "clamp(22px, 2vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              Hack Clubs meet weekly in schools and communities. Leaders kick things off, members
              build websites, apps, and games at their own pace, then everyone demos what they made.
            </p>

            <div className="rundown-grid">
              <div
                style={{
                  position: "relative",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(23,23,29,0.14)",
                  minHeight: 260,
                  aspectRatio: "16 / 9",
                }}
              >
                <YouTubeEmbed id="xXIxwV7bQTw" title="Hack Club meetings" />
              </div>
              <div
                style={{
                  borderRadius: 18,
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  padding: "20px 18px",
                  boxShadow: "0 8px 22px rgba(23,23,29,0.08)",
                }}
              >
                {[
                  [
                    "1",
                    "A group of teens gathers.",
                    "Leaders introduce a project direction and get everyone started.",
                  ],
                  [
                    "2",
                    "Everyone starts building.",
                    "Members work independently and help each other ship something real.",
                  ],
                  [
                    "3",
                    "Every meeting ends with demos.",
                    "Showing your work creates momentum, confidence, and community.",
                  ],
                ].map(([n, title, body]) => (
                  <div
                    key={n}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "42px 1fr",
                      gap: 12,
                      alignItems: "start",
                      marginBottom: n === "3" ? 0 : 16,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 999,
                        border: "3px solid #ec3750",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-phantom)",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#ec3750",
                      }}
                    >
                      {n}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-phantom)",
                        fontSize: 21,
                        lineHeight: 1.2,
                      }}
                    >
                      <strong>{title}</strong> {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p
              style={{
                margin: "24px 0 0",
                maxWidth: 920,
                fontFamily: "var(--font-phantom)",
                fontSize: "clamp(21px, 1.9vw, 30px)",
                lineHeight: 1.2,
              }}
            >
              Clubs also run and attend hackathons, join year-long programs, and grow with other
              student leaders worldwide.
            </p>
          </div>
        </section>

        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(165deg, rgba(23,23,29,0.95) 0%, rgba(24,29,40,0.95) 100%), url('https://cdn.hackclub.com/019d3f60-c241-7386-825c-68732568c4b4/image.png') center/cover",
            color: "var(--paper)",
            padding: "clamp(64px, 8.5vw, 108px) clamp(16px, 6vw, 80px)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-phantom)",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.82,
              }}
            >
              Welcome To The Club
            </p>
            <h2
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-zarathustra)",
                fontWeight: 400,
                fontSize: "clamp(46px, 6vw, 84px)",
                lineHeight: 0.95,
              }}
            >
              By the students, for the students.
            </h2>
            <p
              style={{
                margin: "0 auto 24px",
                maxWidth: 920,
                fontFamily: "var(--font-phantom)",
                fontSize: "clamp(23px, 2vw, 31px)",
                lineHeight: 1.2,
              }}
            >
              Learning to code should feel creative and social, not like another class. Every Hack
              Club is student-led and project-driven.
            </p>
            <Link
              href="/philosophy"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 54,
                padding: "0 30px",
                borderRadius: 999,
                textDecoration: "none",
                background: "linear-gradient(135deg, #6f31b7 0%, #fb558e 100%)",
                color: "var(--paper)",
                fontFamily: "var(--font-phantom)",
                fontSize: 23,
              }}
            >
              Our philosophy{" "}
              <span className="btn-arrow" aria-hidden="true">
                <BtnArrowSvg />
              </span>
            </Link>
          </div>
        </section>

        <section
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            padding: "clamp(64px, 8.5vw, 112px) clamp(16px, 6vw, 80px)",
          }}
        >
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-phantom)",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#ec3750",
              }}
            >
              Hit The Ground Running
            </p>
            <h2
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-zarathustra)",
                fontWeight: 400,
                fontSize: "clamp(46px, 6vw, 84px)",
                lineHeight: 0.95,
                maxWidth: 960,
              }}
            >
              Get your club going and growing.
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 16,
              }}
            >
              <FeatureCard
                title="Leader community"
                accent="#338eda"
                description={
                  <>
                    Join thousands of leaders in the Hack Club Slack to share ideas, ask questions,
                    and meet peers in{" "}
                    <a
                      href="https://hackclub.enterprise.slack.com/archives/C02PA5G01ND"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#338eda", textDecoration: "underline" }}
                    >
                      #leaders
                    </a>
                    .
                  </>
                }
              />
              <FeatureCard
                title="Workshops and jams"
                accent="#33d6a6"
                description={
                  <>
                    Use ready-to-run meeting content so beginners can build websites, games, bots,
                    and more at{" "}
                    <a
                      href="https://jams.hackclub.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#33d6a6", textDecoration: "underline" }}
                    >
                      Hack Club Jams
                    </a>
                    .
                  </>
                }
              />
              <FeatureCard
                title="Stickers and posters"
                accent="#ff8c37"
                description={
                  <>
                    We ship physical materials to help you recruit members and create club culture
                    fast.
                  </>
                }
              />
              <FeatureCard
                title="Funding tools"
                accent="#6f31b7"
                description={
                  <>
                    Raise and manage money through Hack Club&apos;s nonprofit infrastructure and
                    spend on what your club needs.
                  </>
                }
              />
              <FeatureCard
                title="Weekly events"
                accent="#ec3750"
                description={
                  <>
                    AMAs, hack nights, lock-ins, and weird internet events keep your members
                    inspired all year.
                  </>
                }
              />
              <FeatureCard
                title="Existing clubs welcome"
                accent="var(--ink)"
                description={
                  <>
                    Already running a CS club? You can join Hack Club and keep your current name
                    while using all our{" "}
                    <a
                      href="https://toolbox.hackclub.com/?category=Resources"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#17171d", textDecoration: "underline" }}
                    >
                      resources
                    </a>
                    .
                  </>
                }
              />
            </div>
          </div>
        </section>

        <section
          style={{
            background: "var(--surface)",
            color: "var(--foreground)",
            padding: "clamp(64px, 8.5vw, 106px) clamp(16px, 6vw, 80px)",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                margin: "0 0 14px",
                fontFamily: "var(--font-zarathustra)",
                fontWeight: 400,
                fontSize: "clamp(46px, 6vw, 84px)",
                lineHeight: 0.95,
              }}
            >
              Start your club.
            </h2>
            <p
              style={{
                margin: "0 auto 24px",
                maxWidth: 820,
                fontFamily: "var(--font-phantom)",
                fontSize: "clamp(21px, 1.8vw, 30px)",
                lineHeight: 1.2,
              }}
            >
              It&apos;s online, free, and takes less than an hour to kick off.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 14,
                textAlign: "left",
                marginBottom: 26,
              }}
            >
              <StepCard
                title="1. Application"
                description="Tell us about your school and who is leading."
                gradient="linear-gradient(135deg, #338eda 0%, #33d6a6 100%)"
              />
              <StepCard
                title="2. School approval"
                description="Get approval from your school for the club."
                gradient="linear-gradient(135deg, #ff8c37 0%, #ec3750 100%)"
              />
              <StepCard
                title="3. First meeting"
                description="Schedule your first session and start shipping projects."
                gradient="linear-gradient(135deg, #6f31b7 0%, #fb558e 100%)"
              />
            </div>
            <a
              href="https://apply.hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--foreground)",
                color: "var(--background)",
                borderRadius: 999,
                minHeight: 56,
                padding: "0 30px",
                fontFamily: "var(--font-phantom)",
                fontSize: 23,
                textDecoration: "none",
              }}
            >
              Apply to Hack Club{" "}
              <span className="btn-arrow" aria-hidden="true">
                <BtnArrowSvg />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .club-hero-cta {
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.24);
          transition:
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 320ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .club-hero-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
        }

        .rundown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .rundown-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .club-hero-cta,
          .club-hero-cta:hover {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
