import { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Open Source — Hack Club",
  description: "Explore our finances, code, and more.",
  canonical: "/opensource",
});

const financeItems = [
  "Hack Club HQ",
  "Hack Club Mail Team",
  "Hack Club Discretionary Fund",
  "Summer of Making",
];

export default function OpenSourcePage() {
  return (
    <main id="main" tabIndex={-1} className="opensource-page">
      <section className="opensource-hero">
        <Navbar invertColors />
        <div className="opensource-shell opensource-hero__inner">
          <div className="opensource-hero__center">
            <h1 className="opensource-hero__title">Open Source at Hack Club</h1>
            <p className="opensource-hero__lede">Explore our finances, code, and more.</p>
            <a
              className="opensource-hero__button"
              href="https://contribute.hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute
            </a>
          </div>
        </div>
        <div className="opensource-hero__grain" aria-hidden="true" />
      </section>

      <section className="opensource-shell opensource-section">
        <div className="opensource-section__header">
          <p className="opensource-kicker opensource-kicker--dark">Finances</p>
          <h2 className="opensource-section__title">
            All open sourced through HCB Transparency Mode.
          </h2>
        </div>
        <div className="opensource-finance-grid">
          {financeItems.map((item) => (
            <article key={item} className="opensource-card">
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="opensource-shell opensource-section opensource-section--last">
        <div className="opensource-section__header">
          <p className="opensource-kicker opensource-kicker--dark">Code</p>
          <h2 className="opensource-section__title">Want to contribute?</h2>
          <p className="opensource-section__copy">
            Head to contribute.hackclub.com for current work and open tasks.
          </p>
        </div>
        <a
          className="opensource-code-link"
          href="https://contribute.hackclub.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          contribute.hackclub.com
        </a>
      </section>

      <Footer />

      <style>{`
        .opensource-page {
          background:
            radial-gradient(circle at 10% 0%, rgba(255, 140, 55, 0.18), transparent 34%),
            radial-gradient(circle at 90% 8%, rgba(236, 55, 80, 0.16), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .opensource-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .opensource-kicker {
          margin: 0 0 14px;
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 246, 235, 0.72);
        }

        .opensource-kicker--dark {
          color: var(--muted);
        }

        .opensource-hero {
          position: relative;
          min-height: 38vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: 72px 0 54px;
          background:
            radial-gradient(circle at 10% 8%, rgba(255, 255, 255, 0.22), transparent 34%),
            linear-gradient(135deg, #ec3750 0%, #ff8c37 72%, #ffc15d 100%);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 92%);
        }

        .opensource-hero__inner {
          position: relative;
          z-index: 1;
          width: min(760px, 100%);
          text-align: center;
          display: grid;
          justify-items: center;
        }

        .opensource-hero__center {
          width: 100%;
          display: grid;
          justify-items: center;
          gap: 16px;
        }

        .opensource-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2.5rem, 5.8vw, 4.8rem);
          line-height: 0.9;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #fff6eb;
        }

        .opensource-hero__lede {
          margin: 0;
          max-width: 24ch;
          font-family: var(--font-phantom);
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.4;
          color: rgba(255, 246, 235, 0.84);
        }

        .opensource-hero__button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 22px;
          border-radius: 999px;
          background: #fff6eb;
          color: #17171d;
          text-decoration: none;
          font-family: var(--font-phantom);
          font-size: 15px;
          font-weight: 700;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .opensource-hero__button:hover {
          transform: scale(1.02);
        }

        .opensource-hero__grain {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.22;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .opensource-section {
          padding: 72px 0 0;
        }

        .opensource-section--last {
          padding-bottom: 84px;
        }

        .opensource-section__header {
          max-width: 860px;
          margin-bottom: 22px;
        }

        .opensource-section__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2rem, 3.6vw, 3.25rem);
          line-height: 0.96;
          font-weight: 400;
        }

        .opensource-section__copy {
          margin: 16px 0 0;
          font-family: var(--font-phantom);
          font-size: 1.02rem;
          line-height: 1.55;
          color: var(--muted);
        }

        .opensource-finance-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .opensource-card {
          padding: 22px 24px;
          border-radius: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 14px 36px rgba(91, 52, 18, 0.06);
        }

        .opensource-card h3 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: 1.5rem;
          line-height: 1;
          font-weight: 400;
        }

        .opensource-code-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 20px;
          border-radius: 999px;
          background: #ec3750;
          color: #fff6eb;
          text-decoration: none;
          font-family: var(--font-phantom);
          font-size: 15px;
          font-weight: 700;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .opensource-code-link:hover {
          transform: scale(1.02);
        }

        @media (max-width: 640px) {
          .opensource-hero {
            min-height: 34vh;
            padding: 64px 18px 42px;
          }

          .opensource-hero__inner {
            gap: 14px;
          }

          .opensource-shell {
            width: min(100vw - 28px, 1180px);
          }

          .opensource-finance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
