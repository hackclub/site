import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { YouTubeEmbed } from "../../components/YouTubeEmbed";
import { buildPageMetadata } from "@/lib/seo";
import { DonorsSection } from "../../components/landing/donors";
import { ParentsEmailSignup } from "../../components/parents-email-signup";

export const metadata: Metadata = buildPageMetadata({
  title: "For Parents — Hack Club",
  description:
    "Hack Club is a welcoming, supportive space where teens can explore technology, make friends, and build things they're proud of — all with independence and agency.",
  canonical: "/parents",
});

const F = "var(--font-phantom)";

export default function ParentsPage() {
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
              margin: "0 0 20px",
              lineHeight: 1.1,
            }}
          >
            For Parents
          </h1>
          <p
            style={{
              fontFamily: F,
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--muted)",
              maxWidth: 560,
              margin: "0 auto 32px",
              lineHeight: 1.5,
            }}
          >
            Hack Club is a safe, supportive space where teens 13 - 18 year olds can explore
            technology, make friends, and build things they&apos;re proud of &mdash; all with
            independence and agency.
          </p>

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
            Get monthly updates on coding opportunities, events, and new editions of the Hacker
            Generation
          </p>
        </section>

        {/* Hacker Generation Banner */}
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 64,
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
              alt="Hack Club members at a hackathon"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            {/* Overlay for readability — dark-mode aware via CSS classes */}
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
                The Hacker Generation
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
                by Christina Asquith, co-founder of Hack Club
              </p>
            </div>
          </a>
        </section>

        {/* Hack Club is: */}
        <section
          style={{
            background: "#ec3750",
            paddingTop: 64,
            paddingBottom: 64,
            paddingLeft: "clamp(32px, 10vw, 160px)",
            paddingRight: "clamp(32px, 10vw, 160px)",
          }}
        >
          <h2
            style={{
              fontFamily: F,
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 28px",
              lineHeight: 1.1,
            }}
          >
            Hack Club is:
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
              a nonprofit and the <strong>world&apos;s largest community</strong> of teenagers who
              like to <strong>code</strong> and <strong>build awesome stuff.</strong>
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              an <strong>online community</strong> that supports numerous{" "}
              <strong>in-person events</strong> throughout the year.
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              supported by Github, AMD, NASA and more
            </li>
            <li
              style={{
                fontFamily: F,
                fontSize: "clamp(20px, 2.8vw, 28px)",
                color: "#ffffff",
                lineHeight: 1.45,
              }}
            >
              always free for teens - no matter what.
            </li>
          </ul>
        </section>

        <DonorsSection minimal />

        {/* Video */}
        <section
          style={{
            background: "var(--background)",
            paddingTop: 0,
            paddingBottom: 80,
            paddingLeft: "clamp(24px, 8vw, 120px)",
            paddingRight: "clamp(24px, 8vw, 120px)",
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: "clamp(32px, 5vw, 72px)",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                flex: "1 1 200px",
                fontFamily: "var(--font-zarathustra)",
                fontSize: "clamp(20px, 2.4vw, 30px)",
                color: "var(--foreground)",
                margin: 0,
                lineHeight: 1.3,
                fontWeight: 400,
              }}
            >
              See what teens experience at Hack Club Hackathons — from our Undercity Hackathon at
              GitHub HQ
            </p>
            <div
              style={{
                flex: "2 1 360px",
                maxWidth: 580,
                aspectRatio: "16 / 9",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <YouTubeEmbed
                id="kaEFv7e49mo"
                title="We Hosted the Largest Hardware Hackathon — Hack Club Undercity at GitHub HQ"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
