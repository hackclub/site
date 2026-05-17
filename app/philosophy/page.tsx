import { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Philosophy — Hack Club",
  description: "Hack Club's philosophy on coding, learning, and building a community of teenage makers.",
  canonical: "/philosophy",
});

const rows = [
  {
    title: "Coding is a",
    superText: "superpower.",
    accent: "#ec3750",
    superColor: "#ff8c37",
    body:
      "Learning to code is uniquely like gaining a superpower: it converts you from a consumer to a creator. Suddenly, computers become a tool for creating.",
  },
  {
    title: "Make, from anywhere.",
    accent: "#cf2de4",
    body:
      "There's never been a better time for making: anywhere in the world, anyone with a laptop and an internet connection can learn to make an app. Building things has never been so globally democratized.",
  },
  {
    title: "Hack, hack, hack.",
    accent: "#732de4",
    body:
      "The goal of Hack Club is to help you become a hacker. We want a space at every school where people are making interesting things with code, every week. Most schools don't provide that, so we're creating it in every school to make building things accessible to everyone.",
    strongLead: true,
  },
  {
    title: "Start building.",
    accent: "#338eda",
    body:
      "Most coding classes teach you programming concepts instead of how to write real code. It's like trying to learn carpentry without any wood. So at Hack Club, you learn to code entirely through building things. You start with no experience and build and ship a project every meeting.",
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
      href: "/programs",
    },
  },
  {
    title: "Be part of a community.",
    accent: "#33d6a6",
    body:
      "Hack Club gives you a worldwide community of thousands of other young makers to talk to. We're artists, writers, engineers, tinkerers, campers, filmmakers, volunteers. We make things. We help one another. We have fun. Join us.",
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
      </section>

      <section className="philosophy-content">
        <div className="philosophy-shell">
          {rows.map((row) => (
            <article key={row.title} className="philosophy-row">
              <h2 style={{ color: row.accent }}>
                {row.title}
                {row.superText ? (
                  <span style={{ background: row.superColor }}>{row.superText}</span>
                ) : null}
              </h2>

              <p>
                {row.strongLead ? <strong>The goal of Hack Club is to help you become a hacker.</strong> : null}
                {row.strongLead ? " " : ""}
                {row.strongLead ? row.body.replace("The goal of Hack Club is to help you become a hacker. ", "") : row.body}
                {row.link ? (
                  <>
                    {row.bodyPrefix} <a href={row.link.href}>{row.link.label}</a> {row.bodySuffix}
                  </>
                ) : null}
              </p>
            </article>
          ))}

          <div className="philosophy-cta">
            <h3>Join the movement!</h3>
            <div className="philosophy-cta__actions">
              <a href="https://apply.hackclub.com" className="philosophy-cta__btn">
                Start a club
              </a>
              <a href="https://slack.hackclub.com" className="philosophy-cta__btn">
                Join our Slack
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .philosophy-page {
          background: #ffffff;
          color: #17171d;
        }

        .philosophy-shell {
          width: min(960px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .philosophy-hero {
          position: relative;
          color: #ffffff;
          background:
            radial-gradient(circle at 10% 8%, rgba(255, 255, 255, 0.22), transparent 34%),
            linear-gradient(135deg, #ec3750 0%, #ff8c37 72%, #ffc15d 100%);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 92%);
          padding: 122px 0 118px;
        }

        .philosophy-hero__inner {
          position: relative;
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
          background: #ffffff;
          color: #ec3750;
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
          padding: 28px 0 60px;
        }

        .philosophy-row {
          display: grid;
          gap: 26px;
          padding: 48px 0 12px;
          border-bottom: 0;
        }

        .philosophy-row h2 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2.5rem, 5.2vw, 4.25rem);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: 0;
        }

        .philosophy-row h2 span {
          display: inline-block;
          margin-top: 0.2rem;
          margin-left: 0;
          padding: 0.02em 0.38em 0.11em;
          clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
          color: #ffffff;
        }

        .philosophy-row p {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: clamp(1.28rem, 1.42vw, 1.9rem);
          line-height: 1.48;
          color: #17171d;
          max-width: 100%;
        }

        .philosophy-row p strong {
          font-weight: 700;
        }

        .philosophy-row p a {
          color: #17171d;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .philosophy-cta {
          margin: 42px auto 0;
          max-width: 640px;
          background: linear-gradient(135deg, #ff8c37 0%, #ec3750 100%);
          color: #ffffff;
          border-radius: 12px;
          text-align: center;
          padding: 28px 24px;
        }

        .philosophy-cta h3 {
          margin: 0 0 18px;
          font-family: var(--font-zarathustra);
          font-size: clamp(2rem, 3vw, 2.4rem);
          line-height: 1;
          font-weight: 400;
        }

        .philosophy-cta__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .philosophy-cta__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 20px;
          border-radius: 999px;
          background: #ffffff;
          color: #ec3750;
          text-decoration: none;
          font-family: var(--font-phantom);
          font-size: 1.18rem;
          font-weight: 700;
        }

        @media (min-width: 900px) {
          .philosophy-row {
            grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
            gap: 36px;
            align-items: start;
          }

          .philosophy-row h2 {
            font-size: clamp(2.6rem, 3.3vw, 4.1rem);
          }

          .philosophy-row p {
            font-size: clamp(1.2rem, 1.5vw, 2rem);
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
            padding-top: 12px;
          }

          .philosophy-row {
            padding-top: 42px;
          }

          .philosophy-row p {
            font-size: 1.36rem;
          }
        }

        @media (max-width: 640px) {
          .ultraline {
            line-height: 1;
          }

          .ultraline--indent {
            padding-left: 1rem;
          }

          .philosophy-row h2 {
            font-size: 2.4rem;
          }

          .philosophy-row p {
            font-size: 1.2rem;
            line-height: 1.45;
          }

          .philosophy-cta__btn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
