import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WebfontCssBox } from "@/components/WebfontCssBox";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Brand" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/brand",
    locale,
  });
}

const logoKeys = [
  "flag-orpheus-top",
  "flag-orpheus-left",
  "flag-standalone",
  "flag-orpheus-top-bw",
  "flag-orpheus-left-bw",
  "flag-standalone-bw",
  "icon-rounded",
  "icon-square",
  "icon-progress-rounded",
  "icon-progress-square",
] as const;

const hcbLogoKeys = ["hcb-light", "hcb-dark"] as const;

const colorSwatches = [
  { name: "red", hex: "#ec3750" },
  { name: "orange", hex: "#ff8c37" },
  { name: "yellow", hex: "#f1c40f" },
  { name: "green", hex: "#33d6a6" },
  { name: "cyan", hex: "#5bc0de" },
  { name: "blue", hex: "#338eda" },
  { name: "purple", hex: "#a633d6" },
  { name: "muted", hex: "#8492a6" },
] as const;

const iconKeys = [
  "clubs",
  "bank-circle",
  "event-code",
  "home",
  "transactions",
  "bolt",
  "photo",
  "emoji",
] as const;

const fontCss = `@font-face {
  font-family: 'Phantom Sans';
  src:
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff')
      format('woff'),
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2')
      format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Phantom Sans';
  src:
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff')
      format('woff'),
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff2')
      format('woff2');
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Phantom Sans';
  src:
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff')
      format('woff'),
    url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff2')
      format('woff2');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}`;

const assetUrl = (name: string, ext: string) => `https://assets.hackclub.com/${name}.${ext}`;

export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Brand");

  const year = new Date().getFullYear();
  const bannerHtmlTop = `<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="Hack Club"/></a>`;
  const bannerHtmlLeft = `<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/flag-orpheus-left.svg" alt="Hack Club"/></a>`;
  const bannerHtmlYear = `<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/banners/${year}.svg" alt="Hack Club"/></a>`;

  const logoTitle = (key: string) => t(`logoTitles.${key}` as Parameters<typeof t>[0]);
  const colorLabel = (name: string) => t(`colors.${name}` as Parameters<typeof t>[0]);

  return (
    <main id="main" tabIndex={-1} className="brand-page">
      <section className="brand-hero">
        <Navbar invertColors />
        <div className="brand-shell brand-hero__inner">
          <div className="brand-hero__center">
            <h1 className="brand-hero__title">{t("heroTitle")}</h1>
          </div>
        </div>
        <div className="brand-hero__grain" aria-hidden="true" />
      </section>

      <section className="brand-shell brand-section" id="logos">
        <div className="brand-section__header">
          <h2 className="brand-section__title">{t("logosTitle")}</h2>
          <p className="brand-section__lede">{t("logosLede")}</p>
        </div>
        <div className="brand-grid brand-grid--logos">
          {logoKeys.map((key) => (
            <article key={key} className="brand-card">
              <div className="brand-card__preview brand-card__preview--light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assetUrl(key, "svg")} alt={logoTitle(key)} />
              </div>
              <div className="brand-card__body">
                <h3>{logoTitle(key)}</h3>
                <div className="brand-card__actions">
                  <a className="brand-link" href={assetUrl(key, "svg")}>
                    SVG
                  </a>
                  <a className="brand-link" href={assetUrl(key, "png")}>
                    PNG
                  </a>
                  <a className="brand-link" href={assetUrl(key, "pdf")}>
                    PDF
                  </a>
                </div>
                <div className="brand-card__url">{assetUrl(key, "svg")}</div>
              </div>
            </article>
          ))}
        </div>
        <a
          className="brand-btn brand-btn--dark brand-btn--block"
          href="https://assets.hackclub.com/2020_branding.zip"
        >
          {t("downloadAllLogos")}
        </a>
      </section>

      <section className="brand-shell brand-section brand-section--hcb" id="hcb">
        <div className="brand-section__header">
          <p className="brand-kicker brand-kicker--dark">{t("hcbKicker")}</p>
          <h2 className="brand-section__title">{t("hcbTitle")}</h2>
          <p className="brand-section__lede">{t("hcbLede")}</p>
        </div>
        <div className="brand-grid brand-grid--logos">
          {hcbLogoKeys.map((key) => (
            <article key={key} className="brand-card">
              <div className="brand-card__preview brand-card__preview--light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assetUrl(key, "png")} alt={logoTitle(key)} />
              </div>
              <div className="brand-card__body">
                <h3>{logoTitle(key)}</h3>
                <div className="brand-card__actions">
                  <a className="brand-link" href={assetUrl(key, "svg")}>
                    SVG
                  </a>
                  <a className="brand-link" href={assetUrl(key, "png")}>
                    PNG
                  </a>
                  <a className="brand-link" href={assetUrl(key, "pdf")}>
                    PDF
                  </a>
                </div>
                <div className="brand-card__url">{assetUrl(key, "svg")}</div>
              </div>
            </article>
          ))}
        </div>
        <a
          className="brand-btn brand-btn--dark brand-btn--block"
          href="https://hcb.hackclub.com/branding"
        >
          {t("viewHcbBranding")}
        </a>
      </section>

      <section className="brand-shell brand-section" id="banners">
        <div className="brand-section__header">
          <p className="brand-kicker brand-kicker--dark">{t("bannersKicker")}</p>
          <h2 className="brand-section__title">{t("bannersTitle")}</h2>
          <p className="brand-section__lede">{t("bannersLede")}</p>
        </div>
        <div className="brand-table">
          <div className="brand-table__row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl("flag-orpheus-top", "svg")} alt={t("flagTopAlt")} />
            <pre>{bannerHtmlTop}</pre>
          </div>
          <div className="brand-table__row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl("flag-orpheus-left", "svg")} alt={t("flagLeftAlt")} />
            <pre>{bannerHtmlLeft}</pre>
          </div>
          <div className="brand-table__row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://assets.hackclub.com/banners/${year}.svg`} alt={t("yearBannerAlt")} />
            <pre>{bannerHtmlYear}</pre>
          </div>
        </div>
        <a
          className="brand-btn brand-btn--ghost brand-btn--block"
          href="https://hackclub.com/banner"
        >
          {t("reactComponent")}
        </a>
      </section>

      <section className="brand-section" id="colors">
        <div className="brand-shell">
          <div className="brand-section__header">
            <p className="brand-kicker brand-kicker--dark">{t("colorsKicker")}</p>
            <h2 className="brand-section__title">{t("colorsTitle")}</h2>
            <p className="brand-section__lede">{t("colorsLede")}</p>
          </div>
          <div className="brand-grid brand-grid--colors">
            {colorSwatches.map((color) => (
              <div key={color.name} className="brand-swatch">
                <div className="brand-swatch__chip" style={{ background: color.hex }} />
                <div>
                  <p>{colorLabel(color.name)}</p>
                  <span>{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-shell brand-section" id="fonts">
        <div className="brand-section__header">
          <p className="brand-kicker brand-kicker--dark">{t("fontsKicker")}</p>
          <h2 className="brand-section__title">{t("fontsTitle")}</h2>
          <p className="brand-section__lede">{t("fontsLede")}</p>
        </div>
        <div className="brand-font">
          <div className="brand-font__headline">{t("fontHeadline")}</div>
          <div className="brand-font__sub">{t("fontSub")}</div>
        </div>
        <WebfontCssBox code={fontCss} />
      </section>

      <section className="brand-shell brand-section" id="icons">
        <div className="brand-section__header">
          <p className="brand-kicker brand-kicker--dark">{t("iconsKicker")}</p>
          <h2 className="brand-section__title">{t("iconsTitle")}</h2>
          <p className="brand-section__lede">{t("iconsLede")}</p>
        </div>
        <div className="brand-icons">
          {iconKeys.map((key) => (
            <div key={key} className="brand-icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://icons.hackclub.com/api/icons/currentColor/${key}.svg`} alt={key} />
              <span>{key}</span>
            </div>
          ))}
        </div>
        <a
          className="brand-btn brand-btn--ghost brand-btn--block"
          href="https://icons.hackclub.com"
        >
          {t("exploreIcons")}
        </a>
      </section>

      <section className="brand-shell brand-section brand-section--ui" id="ui">
        <div className="brand-section__header">
          <p className="brand-kicker brand-kicker--dark">{t("uiKicker")}</p>
          <h2 className="brand-section__title">{t("uiTitle")}</h2>
          <p className="brand-section__lede">{t("uiLede")}</p>
        </div>
        <div className="brand-links">
          <a className="brand-btn brand-btn--ghost" href="https://theme.hackclub.com/">
            {t("exploreTheme")}
          </a>
          <a
            className="brand-btn brand-btn--ghost"
            href="https://github.com/hackclub/theme-starter"
          >
            {t("themeStarterGithub")}
          </a>
          <a className="brand-btn brand-btn--ghost" href="https://github.com/hackclub/css">
            {t("cssThemeGithub")}
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        .brand-page {
          color: var(--foreground);
          background: var(--background);
        }

        .brand-shell {
          width: min(1200px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .brand-kicker {
          margin: 0 0 14px;
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
        }

        .brand-kicker--dark {
          color: var(--muted);
        }

        .brand-hero {
          position: relative;
          overflow: visible;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.4), transparent 32%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.35), transparent 35%),
            linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 45%, var(--red) 100%);
          padding: 120px 0 88px;
        }

        .brand-hero__inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          justify-items: center;
        }

        .brand-hero__center {
          text-align: center;
          color: var(--cream);
          padding: 24px 0 8px;
        }

        .brand-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(3.5rem, 7vw, 6rem);
          line-height: 0.9;
          color: var(--cream);
        }

        .brand-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 12px 22px;
          font-family: var(--font-phantom);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .brand-btn--dark {
          background: var(--foreground);
          color: var(--background);
        }

        .brand-btn--ghost {
          background: var(--surface);
          color: var(--foreground);
          border: 1px solid var(--border);
        }

        .brand-btn--block {
          margin-top: 24px;
        }

        .brand-btn:hover {
          transform: translateY(-2px);
        }

        .brand-hero__grain {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.04) 0,
            rgba(255, 255, 255, 0.04) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0.4;
          pointer-events: none;
        }

        .brand-section {
          padding: 72px 0 0;
        }

        .brand-section__header {
          max-width: 820px;
          margin-bottom: 28px;
        }

        .brand-section__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          line-height: 0.96;
          color: var(--foreground);
        }

        .brand-section__lede {
          margin: 16px 0 0;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--muted);
        }

        .brand-grid {
          display: grid;
          gap: 24px;
        }

        .brand-grid--logos {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .brand-card {
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
          box-shadow: 0 20px 50px rgba(91, 52, 18, 0.08);
          display: grid;
          grid-template-rows: auto 1fr;
        }

        .brand-card__preview {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          min-height: 170px;
        }

        .brand-card__preview img {
          max-width: 200px;
          height: auto;
        }

        .brand-section--hcb .brand-card__preview img {
          max-width: 200px;
        }

        .brand-card__body {
          padding: 20px 22px 24px;
          display: grid;
          gap: 10px;
        }

        .brand-card__body h3 {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1.1rem;
          font-weight: 700;
        }

        .brand-card__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .brand-card__url {
          font-family: var(--font-phantom);
          font-size: 0.85rem;
          color: var(--muted);
          word-break: break-all;
        }

        .brand-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          line-height: 1;
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          color: #ec3750;
          text-decoration: none;
          border-radius: 999px;
          padding: 5px 12px;
        }

        .brand-section--swatches {
          margin-top: 72px;
          padding: 72px 0;
          background: var(--surface);
        }

        .brand-grid--colors {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .brand-swatch {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--surface);
          border-radius: 22px;
          padding: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 18px 36px rgba(91, 52, 18, 0.08);
        }

        .brand-swatch__chip {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          border: 2px solid var(--border);
        }

        .brand-swatch p {
          margin: 0 0 4px;
          font-family: var(--font-phantom);
          font-weight: 700;
        }

        .brand-swatch span {
          font-family: var(--font-phantom);
          font-size: 0.88rem;
          color: var(--muted);
        }

        .brand-table {
          display: grid;
          gap: 18px;
        }

        .brand-table__row {
          display: grid;
          grid-template-columns: 140px minmax(0, 1fr);
          gap: 20px;
          align-items: center;
          background: var(--surface);
          border-radius: 24px;
          padding: 18px;
          border: 1px solid var(--border);
          box-shadow: 0 18px 36px rgba(91, 52, 18, 0.08);
        }

        .brand-table__row img {
          max-width: 120px;
          height: auto;
        }

        .brand-table__row pre {
          margin: 0;
          white-space: pre-wrap;
          font-family: var(--font-phantom);
          font-size: 0.9rem;
          color: var(--muted);
        }

        .brand-font {
          margin-bottom: 18px;
        }

        .brand-font__headline {
          font-family: var(--font-phantom);
          font-size: 2.2rem;
          font-weight: 700;
        }

        .brand-font__sub {
          font-family: var(--font-phantom);
          font-size: 1.2rem;
          color: var(--muted);
        }

        .brand-details {
          border-radius: 20px;
          padding: 0;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 16px 30px rgba(91, 52, 18, 0.08);
          overflow: hidden;
        }

        .brand-details summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          font-family: var(--font-phantom);
          font-weight: 700;
          margin: 0;
          cursor: pointer;
        }

        .brand-details summary::marker {
          color: var(--muted);
        }

        .brand-details__hint {
          font-size: 0.86rem;
          font-weight: 500;
          color: var(--muted);
        }

        .brand-details__hint--open {
          display: none;
        }

        .brand-details__title-wrap {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
        }

        .brand-details__copy {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--muted);
          border-radius: 999px;
          padding: 6px 11px;
          font-family: var(--font-phantom);
          font-size: 0.82rem;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          transition: background 0.16s ease, color 0.16s ease, border-color 0.16s ease;
        }

        .brand-details__copy:hover {
          background: var(--foreground);
          border-color: var(--foreground);
          color: var(--background);
        }

        .brand-details[open] .brand-details__hint--closed {
          display: none;
        }

        .brand-details[open] .brand-details__hint--open {
          display: inline;
        }

        .brand-details[open] summary {
          padding-bottom: 10px;
        }

        .brand-details pre {
          margin: 0;
          padding: 0 18px 16px;
          white-space: pre-wrap;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.55;
        }

        .brand-details code {
          display: block;
        }

        .brand-details .token.comment,
        .brand-details .token.prolog,
        .brand-details .token.doctype,
        .brand-details .token.cdata {
          color: #6d6d6d;
          font-style: italic;
        }

        .brand-details .token.punctuation {
          color: #5f6368;
        }

        .brand-details .token.property,
        .brand-details .token.tag,
        .brand-details .token.boolean,
        .brand-details .token.number,
        .brand-details .token.constant,
        .brand-details .token.symbol,
        .brand-details .token.deleted {
          color: #905;
        }

        .brand-details .token.selector,
        .brand-details .token.attr-name,
        .brand-details .token.string,
        .brand-details .token.char,
        .brand-details .token.builtin,
        .brand-details .token.inserted {
          color: #2f7d32;
        }

        .brand-details .token.operator,
        .brand-details .token.entity,
        .brand-details .token.url,
        .brand-details .language-css .token.string,
        .brand-details .style .token.string {
          color: #a67f59;
        }

        .brand-details .token.atrule,
        .brand-details .token.attr-value,
        .brand-details .token.keyword {
          color: #0b74c4;
        }

        .brand-details .token.function,
        .brand-details .token.class-name {
          color: #d45800;
        }

        .brand-details .token.regex,
        .brand-details .token.important,
        .brand-details .token.variable {
          color: #e90;
        }

        .brand-icons {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .brand-icon {
          border-radius: 20px;
          padding: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          display: grid;
          place-items: center;
          gap: 8px;
        }

        .brand-icon img {
          width: 72px;
          height: 72px;
          filter: grayscale(1);
        }

        .brand-icon span {
          font-family: var(--font-phantom);
          font-size: 0.85rem;
          color: var(--muted);
        }

        .brand-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .brand-section--cta {
          padding: 72px 0 96px;
        }

        .brand-section--ui {
          padding-bottom: 72px;
        }

        .brand-cta {
          border-radius: 32px;
          padding: 32px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
        }

        .brand-cta__actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (max-width: 1100px) {
          .brand-hero__inner,
          .brand-grid--logos,
          .brand-grid--colors,
          .brand-cta,
          .brand-table__row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .brand-shell {
            width: calc(100vw - 32px);
          }

          .brand-hero {
            padding: 110px 0 70px;
          }

          .brand-btn {
            width: 100%;
          }

          .brand-cta {
            padding: 24px;
          }

          .brand-cta__actions {
            width: 100%;
          }

          .brand-icons {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
