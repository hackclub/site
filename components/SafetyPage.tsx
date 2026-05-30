"use client";

import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type SafetyCard = {
  title: string;
  description: string;
  href: string;
};

const cards: SafetyCard[] = [
  {
    title: "Code of Conduct",
    description:
      "The standards we hold everyone to across our community spaces, events, and projects.",
    href: "/conduct",
  },
  {
    title: "Safeguarding Policy",
    description: "How we protect participants at our in-person events.",
    href: "/safeguarding",
  },
];

export function SafetyPage() {
  return (
    <main id="main" tabIndex={-1} className="safety-page">
      <section className="safety-hero">
        <Navbar invertColors />
        <div className="safety-shell safety-hero__inner">
          <h1>Hack Club Safety</h1>
        </div>
        <div className="safety-hero__grain" aria-hidden="true" />
      </section>

      <section className="safety-shell safety-section">
        <div className="safety-help">
          <div className="safety-help__row">
            <div className="safety-help__context">
              <span className="safety-help__context-title">On Slack or online</span>
              <div className="safety-help__item">
                <span className="safety-help__label">Report via Slack</span>
                <a
                  className="safety-help__btn"
                  href="https://hackclub.enterprise.slack.com/team/U07K4TS9HQE"
                >
                  DM @Shroud on Slack &rarr;
                </a>
              </div>
              <div className="safety-help__item">
                <span className="safety-help__label">Report via email</span>
                <a className="safety-help__btn" href="mailto:conduct@hackclub.com">
                  Email conduct@hackclub.com &rarr;
                </a>
              </div>
            </div>
            <div className="safety-help__divider" aria-hidden="true" />
            <div className="safety-help__context">
              <span className="safety-help__context-title">At an in-person event</span>
              <div className="safety-help__item">
                <span className="safety-help__label">Need urgent help?</span>
                <a className="safety-help__btn" href="tel:18556254225">
                  Call 1-855-625-4225 &rarr;
                </a>
              </div>
              <div className="safety-help__item">
                <span className="safety-help__label">File an incident report</span>
                <a className="safety-help__btn" href="https://hack.club/incident">
                  hack.club/incident &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="safety-cards">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="safety-card">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="safety-card__arrow" aria-hidden="true">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        .safety-page {
          background:
            radial-gradient(circle at 5% 8%, rgba(236, 55, 80, 0.12), transparent 34%),
            radial-gradient(circle at 95% 0%, rgba(255, 140, 55, 0.18), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .safety-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .safety-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.25), transparent 32%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.3), transparent 35%),
            linear-gradient(140deg, var(--ink) 0%, var(--ink-2) 55%, var(--red) 100%);
          color: var(--cream);
          padding: 120px 0 90px;
        }

        .safety-hero__inner {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }

        .safety-hero__inner h1 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(3rem, 6.5vw, 5.2rem);
          line-height: 0.95;
        }

        .safety-hero__grain {
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

        .safety-section {
          padding: 80px 0 96px;
        }

        .safety-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .safety-card {
          display: flex;
          flex-direction: column;
          min-height: 340px;
          border-radius: 28px;
          padding: 44px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 18px 38px rgba(91, 52, 18, 0.1);
          text-decoration: none;
          color: var(--foreground);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .safety-card:hover {
          transform: translateY(-2px);
          border-color: var(--red);
        }

        .safety-card h2 {
          margin: 0 0 16px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: 2.4rem;
          line-height: 1.02;
        }

        .safety-card p {
          margin: 0 0 28px;
          font-family: var(--font-phantom);
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--muted);
          flex: 1;
        }

        .safety-card__arrow {
          font-family: var(--font-phantom);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--red);
        }

        .safety-help {
          margin-bottom: 18px;
          border-radius: 24px;
          padding: 32px;
          color: var(--cream);
          background:
            radial-gradient(circle at 0% 0%, rgba(255, 140, 55, 0.35), transparent 55%),
            linear-gradient(135deg, var(--red) 0%, #c81e3a 100%);
          box-shadow: 0 22px 50px rgba(236, 55, 80, 0.35);
        }

        .safety-help__row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: stretch;
        }

        .safety-help__context {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .safety-help__context-title {
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: 1.5rem;
          line-height: 1;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 246, 235, 0.22);
        }

        .safety-help__item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }

        .safety-help__divider {
          width: 1px;
          align-self: stretch;
          background: rgba(255, 246, 235, 0.25);
        }

        .safety-help__label {
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.85;
        }

        .safety-help__btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding: 16px 22px;
          border-radius: 16px;
          background: var(--cream);
          color: var(--red);
          font-family: var(--font-phantom);
          font-weight: 700;
          font-size: 1.05rem;
          text-decoration: none;
          transition: transform 0.15s ease;
        }

        .safety-help__btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 1100px) {
          .safety-cards {
            grid-template-columns: 1fr;
          }

          .safety-help__row {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .safety-help__divider {
            height: 1px;
            width: 100%;
          }
        }

        @media (max-width: 767px) {
          .safety-shell {
            width: calc(100vw - 24px);
          }

          .safety-hero {
            padding: 102px 0 64px;
          }

          .safety-hero__inner h1 {
            font-size: clamp(2.2rem, 10vw, 3rem);
            line-height: 1;
          }

          .safety-section {
            padding: 58px 0 72px;
          }

          .safety-card {
            padding: 22px;
          }

          .safety-help {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}
