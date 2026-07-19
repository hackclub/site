import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

type RowText = {
  title: string;
  superText?: string;
  leadText?: string;
  body?: string;
  bodyPrefix?: string;
  bodySuffix?: string;
  linkLabel?: string;
};

const rowMeta = [
  { accent: "#ec3750", superColor: "#ff8c37" },
  { accent: "#cf2de4" },
  { accent: "#732de4" },
  { accent: "#338eda" },
  {
    accent: "#5bc0de",
    linkHref: "https://workshops.hackclub.com",
  },
  { accent: "#33d6a6" },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Philosophy" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/philosophy",
    locale,
  });
}

export default async function PhilosophyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Philosophy");
  const rowsRaw = t.raw("rows") as Record<string, RowText>;

  const rows = rowMeta.map((meta, index) => {
    const text = rowsRaw[String(index)] ?? { title: "" };
    return {
      ...meta,
      title: text.title,
      superText: text.superText,
      leadText: text.leadText,
      body: text.body,
      bodyPrefix: text.bodyPrefix,
      bodySuffix: text.bodySuffix,
      linkLabel: text.linkLabel,
    };
  });

  return (
    <main id="main" tabIndex={-1} className="philosophy-page">
      <section className="philosophy-hero">
        <Navbar invertColors />

        <div className="philosophy-shell philosophy-hero__inner">
          <h1 className="ultraline">{t("heroLine1")}</h1>
          <h1 className="ultraline ultraline--indent">{t("heroLine2")}</h1>
          <h1 className="ultraline ultraline--center">{t("heroLine3")}</h1>
          <h1 className="ultraline ultraline--highlight">{t("heroLine4")}</h1>
        </div>

        <div className="philosophy-seal">
          <span>{t("sealLine1")}</span>
          <strong>{t("sealLine2")}</strong>
        </div>

        <div className="philosophy-hero__grain" aria-hidden="true" />
      </section>

      <section className="philosophy-shell philosophy-content">
        <div className="philosophy-section__header">
          <p className="philosophy-kicker">{t("beliefsKicker")}</p>
          <h2>{t("beliefsTitle")}</h2>
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
                  <span
                    style={{
                      background: "superColor" in row ? row.superColor : undefined,
                    }}
                  >
                    {row.superText}
                  </span>
                ) : null}
              </h3>

              <p>
                {row.leadText ? <strong>{row.leadText}</strong> : null}
                {row.leadText && (row.linkLabel || row.body) ? " " : ""}
                {"linkHref" in row && row.linkHref && row.linkLabel ? (
                  <>
                    {row.bodyPrefix} <a href={row.linkHref}>{row.linkLabel}</a> {row.bodySuffix}
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
            <p className="philosophy-kicker philosophy-kicker--dark">{t("joinKicker")}</p>
            <h3>{t("joinTitle")}</h3>
            <p>{t("joinBody")}</p>
          </div>
          <div className="philosophy-cta__actions">
            <a href="https://apply.hackclub.com" className="philosophy-btn philosophy-btn--red">
              {t("startClub")}
            </a>
            <a href="https://slack.hackclub.com" className="philosophy-btn philosophy-btn--ghost">
              {t("joinSlack")}
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
