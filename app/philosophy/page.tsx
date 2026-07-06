import { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Philosophy — Hack Club",
  description:
    "Hack Club's philosophy on coding, learning, and building a community of teenage makers.",
  canonical: "/philosophy",
});

const rows = [
  {
    title: "Coding is a",
    superText: "superpower.",
    accent: "#ec3750",
    superColor: "#ff8c37",
    body: "Learning to code is uniquely like gaining a superpower: it converts you from a consumer to a creator. Suddenly, computers become a tool for creating.",
  },
  {
    title: "Make, from anywhere.",
    accent: "#cf2de4",
    body: "There's never been a better time for making: anywhere in the world, anyone with a laptop and an internet connection can learn to make an app. Building things has never been so globally democratized.",
  },
  {
    title: "Hack, hack, hack.",
    accent: "#732de4",
    leadText: "The goal of Hack Club is to help you become a hacker.",
    body: "We want a space at every school where people are making interesting things with code, every week. Most schools don't provide that, so we're creating it in every school to make building things accessible to everyone.",
  },
  {
    title: "Start building.",
    accent: "#338eda",
    body: "Most coding classes teach you programming concepts instead of how to write real code. It's like trying to learn carpentry without any wood. So at Hack Club, you learn to code entirely through building things. You start with no experience and build and ship a project every meeting.",
  },
  {
    title: "Learn as you build.",
    accent: "#5bc0de",
    bodyPrefix:
      "Just as the best carpenters didn't learn in the classroom, neither did the best programmers. Through our",
    bodySuffix:
      "you'll be walked through building projects. Starting out, you won't understand how the code works, but you'll build understanding as you go. You'll get stuck along the way, but we're here to help.",
    link: {
      label: "workshops",
      href: "https://workshops.hackclub.com",
    },
  },
  {
    title: "Be part of a community.",
    accent: "#33d6a6",
    body: "Hack Club gives you a worldwide community of thousands of other young makers to talk to. We're artists, writers, engineers, tinkerers, campers, filmmakers, volunteers. We make things. We help one another. We have fun. Join us.",
  },
];

export default function PhilosophyPage() {
  return (
    <main id="main" tabIndex={-1} className="philosophy-page">
      <section className="philosophy-hero">
        <Navbar invertColors />

        <div className="philosophy-shell philosophy-hero__inner">
          <h1 className="ultraline">WE&rsquo;RE</h1>
          <h1 className="ultraline ultraline--indent">AT OUR BEST</h1>
          <h1 className="ultraline ultraline--center">WHEN WE&rsquo;RE</h1>
          <h1 className="ultraline ultraline--highlight">MAKING.</h1>
        </div>

        <div className="philosophy-seal">
          <span>THE HACK CLUB</span>
          <strong>PHILOSOPHY</strong>
        </div>

        <div className="philosophy-hero__grain" aria-hidden="true" />
      </section>

      <section className="philosophy-shell philosophy-content">
        <div className="philosophy-section__header">
          <p className="philosophy-kicker">What we believe</p>
          <h2>A few beliefs that shape how we build.</h2>
        </div>

        <div className="philosophy-grid">
          {rows.map((row, index) => (
            <article key={row.title} className="philosophy-card">
              <span className="philosophy-card__num" style={{ color: row.accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 style={{ color: row.accent }}>
                {row.title}
                {row.superText ? (
                  <span style={{ background: row.superColor }}>{row.superText}</span>
                ) : null}
              </h3>

              <p>
                {row.leadText ? <strong>{row.leadText}</strong> : null}
                {row.leadText && (row.link || row.body) ? " " : ""}
                {row.link ? (
                  <>
                    {row.bodyPrefix} <a href={row.link.href}>{row.link.label}</a> {row.bodySuffix}
                  </>
                ) : (
                  row.body
                )}
              </p>
            </article>
          ))}
        </div>

        <div className="philosophy-cta">
          <div className="philosophy-cta__copy">
            <p className="philosophy-kicker philosophy-kicker--dark">Join us</p>
            <h3>Join the movement.</h3>
            <p>
              Start a Hack Club at your school or jump straight into our worldwide community of
              young makers.
            </p>
          </div>
          <div className="philosophy-cta__actions">
            <a href="https://apply.hackclub.com" className="philosophy-btn philosophy-btn--red">
              Start a club
            </a>
            <a href="https://slack.hackclub.com" className="philosophy-btn philosophy-btn--ghost">
              Join our Slack
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .philosophy-page {
          background:
            radial-gradient(circle at 5% 8%, rgba(236, 55, 80, 0.12), transparent 34%),
            radial-gradient(circle at 95% 0%, rgba(255, 140, 55, 0.18), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .philosophy-shell {
          width: min(960px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .philosophy-hero {
          position: relative;
          overflow: hidden;
          color: var(--cream);
          background:
            radial-gradient(circle at 10% 8%, rgba(255, 255, 255, 0.22), transparent 34%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.3), transparent 35%),
            linear-gradient(140deg, var(--ink) 0%, var(--ink-2) 55%, var(--red) 100%);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 92%);
          padding: 122px 0 118px;
        }

        .philosophy-hero__inner {
          position: relative;
          z-index: 2;
        }

        .philosophy-hero__grain {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.05) 0,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0.35;
          pointer-events: none;
        }

        .ultraline {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(3.15rem, 7vw, 5rem);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: 0.015em;
          text-transform: uppercase;
        }

        .ultraline + .ultraline {
          margin-top: 0.08em;
        }

        .ultraline--indent {
          padding-left: clamp(1.4rem, 6vw, 6.2rem);
        }

        .ultraline--center {
          text-align: center;
        }

        .ultraline--highlight {
          position: relative;
          text-align: right;
          padding-right: 0.2rem;
          z-index: 1;
        }

        .ultraline--highlight::before {
          content: "";
          position: absolute;
          right: -0.3rem;
          top: 52%;
          transform: translateY(-50%);
          width: clamp(11.5rem, 30vw, 25rem);
          height: clamp(2.8rem, 6vw, 7.2rem);
          clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
          background: rgba(252, 252, 252, 0.34);
          mix-blend-mode: screen;
          z-index: -1;
        }

        .philosophy-seal {
          position: absolute;
          left: 0;
          bottom: calc(8% - 120px);
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: var(--paper);
          color: var(--red);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-bottom: 100px;
          padding-top: 10px;
          transform: rotate(2.3deg);
          transform-origin: left bottom;
        }

        .philosophy-seal span {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1;
        }

        .philosophy-seal strong {
          margin-top: 0.38rem;
          font-family: var(--font-zarathustra);
          font-size: 1.3rem;
          line-height: 0.9;
          font-weight: 800;
        }

        .philosophy-content {
          width: min(1120px, calc(100vw - 48px));
          padding: 80px 0 96px;
        }

        .philosophy-kicker {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .philosophy-section__header {
          margin-bottom: 36px;
        }

        .philosophy-section__header h2 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 0.96;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .philosophy-card {
          border-radius: 24px;
          padding: 28px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 18px 38px rgba(91, 52, 18, 0.1);
          display: grid;
          gap: 14px;
          align-content: start;
        }

        html.dark .philosophy-card {
          box-shadow: none;
        }

        .philosophy-card__num {
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .philosophy-card h3 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(1.9rem, 2.6vw, 2.5rem);
          font-weight: 400;
          line-height: 0.98;
        }

        .philosophy-card h3 span {
          display: inline-block;
          margin-top: 0.2rem;
          padding: 0.02em 0.38em 0.11em;
          clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
          color: var(--paper);
        }

        .philosophy-card p {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--muted);
        }

        .philosophy-card p strong {
          font-weight: 700;
          color: var(--foreground);
        }

        .philosophy-card p a {
          color: var(--red);
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 700;
        }

        .philosophy-cta {
          margin-top: 18px;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 32px;
          align-items: center;
          border-radius: 32px;
          padding: 32px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
        }

        html.dark .philosophy-cta {
          box-shadow: none;
        }

        .philosophy-cta__copy h3 {
          margin: 0 0 12px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2rem, 3.6vw, 3rem);
          line-height: 1;
        }

        .philosophy-cta__copy p {
          margin: 0;
          font-family: var(--font-phantom);
          color: var(--muted);
          line-height: 1.6;
        }

        .philosophy-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .philosophy-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 22px;
          border-radius: 999px;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s ease;
        }

        .philosophy-btn:hover {
          transform: translateY(-2px);
        }

        .philosophy-btn--red {
          background: var(--red);
          color: var(--paper);
        }

        .philosophy-btn--ghost {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--foreground);
        }

        @media (min-width: 900px) {
          .philosophy-card--wide {
            grid-column: span 2;
          }
        }

        @media (max-width: 899px) {
          .philosophy-hero {
            padding: 108px 0 96px;
          }

          .philosophy-shell {
            width: calc(100vw - 36px);
          }

          .philosophy-seal {
            width: 170px;
            height: 170px;
            border-radius: 50%;
            bottom: calc(8% - 93px);
            padding-bottom: 77px;
            padding-top: 8px;
            transform: rotate(2deg);
          }

          .philosophy-seal span {
            font-size: 0.72rem;
          }

          .philosophy-seal strong {
            font-size: 1.2rem;
          }

          .philosophy-content {
            padding: 58px 0 72px;
          }

          .philosophy-grid {
            grid-template-columns: 1fr;
          }

          .philosophy-cta {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px;
            border-radius: 24px;
          }

          .philosophy-card {
            padding: 22px;
          }
        }

        @media (max-width: 640px) {
          .ultraline {
            line-height: 1;
          }

          .ultraline--indent {
            padding-left: 1rem;
          }

          .philosophy-btn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
