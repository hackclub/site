"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeLock } from "@/components/ThemeToggle";
import { Icon } from "@/components/Icon";

export default function MobilePageClient() {
  const t = useTranslations("HcbMobile");

  return (
    <>
      <ThemeLock />
      <main id="main" tabIndex={-1} className="mobile-page">
        <section className="mobile-hero">
          <Navbar invertColors />
          <div className="mobile-shell mobile-hero__inner">
            <h1 className="mobile-hero__title">
              {t.rich("heroTitle", {
                hcb: (chunks) => (
                  <Link href="/fiscal-sponsorship" className="mobile-hero__link">
                    <span>{chunks}</span>
                  </Link>
                ),
              })}
            </h1>
            <h2 className="mobile-hero__subtitle">{t("heroSubtitle")}</h2>
          </div>
        </section>

        <section className="mobile-article-section">
          <div className="mobile-copy">
            <div className="mobile-pill-row">
              <div className="mobile-pill mobile-pill--author">
                <Image
                  src="https://github.com/Mohamad-Mortada.png"
                  alt="Mohamad Mortada"
                  width={36}
                  height={36}
                  className="mobile-pill__avatar"
                />
                <span>Mohamad Mortada</span>
              </div>
              <div className="mobile-pill">{t("date")}</div>
            </div>

            <article className="mobile-article">
              <p>{t("p1")}</p>

              <p>
                {t.rich("p2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>

              <p>
                {t.rich("p3", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                  fn1: (chunks) => (
                    <sup>
                      <a href="#fn-1" id="fnref-1">
                        {chunks}
                      </a>
                    </sup>
                  ),
                })}
              </p>

              <p>
                {t.rich("p4", {
                  em: (chunks) => <em>{chunks}</em>,
                  github: (chunks) => (
                    <a
                      href="https://github.com/hackclub/hcb-mobile"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>

              <h2>{t("whyTitle")}</h2>

              <p>{t("whyBody")}</p>

              <ul>
                <li>
                  {t.rich("whyLi1", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </li>
                <li>
                  {t.rich("whyLi2", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </li>
                <li>
                  {t.rich("whyLi3", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </li>
                <li>
                  {t.rich("whyLi4", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </li>
              </ul>

              <h2>{t("techTitle")}</h2>

              <p>
                {t.rich("techP1", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>

              <p>
                {t.rich("techP2", {
                  em: (chunks) => <em>{chunks}</em>,
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>

              <p>
                {t.rich("techP3", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>

              <div className="mobile-article__spacer" aria-hidden="true" />

              <h2>{t("downloadTitle")}</h2>

              <div className="mobile-badges">
                <a
                  href="https://apps.apple.com/us/app/hcb-by-hack-club/id6465424810"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("appStoreAria")}
                >
                  <Image
                    src="/fiscal-sponsorship/apple-web-badge.svg"
                    alt={t("appStoreAlt")}
                    width={120}
                    height={40}
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.hackclub.hcb"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("googlePlayAria")}
                >
                  <Image
                    src="/fiscal-sponsorship/google-play-web-badge.webp"
                    alt={t("googlePlayAlt")}
                    width={135}
                    height={40}
                  />
                </a>
              </div>

              <ol className="mobile-footnotes">
                <li id="fn-1">
                  <em>
                    {t.rich("footnote", {
                      finances: (chunks) => (
                        <a href="https://hcb.hackclub.com/hq" target="_blank" rel="noreferrer">
                          {chunks}
                        </a>
                      ),
                    })}
                  </em>{" "}
                  <a href="#fnref-1" aria-label={t("backToRef")}>
                    ↩
                  </a>
                </li>
              </ol>
            </article>
          </div>
        </section>

        <section className="mobile-cta">
          <div className="mobile-cta__grid mobile-copy">
            <div className="mobile-cta__icon" aria-hidden="true">
              <Icon glyph="bank-account" size={72} />
            </div>
            <div>
              <h2 className="mobile-cta__title">{t("ctaTitle")}</h2>
              <p className="mobile-cta__body">{t("ctaBody")}</p>
              <div className="mobile-cta__actions">
                <Link
                  href="/fiscal-sponsorship"
                  className="mobile-cta__button mobile-cta__button--cyan"
                >
                  {t("learnMore")}
                </Link>
                <a
                  href="https://nonprofit.new"
                  className="mobile-cta__button mobile-cta__button--orange"
                >
                  {t("applyNow")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .mobile-page {
          background: #ffffff;
          color: #17171d;
        }

        .mobile-shell,
        .mobile-copy {
          width: min(1100px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .mobile-copy {
          width: min(680px, calc(100vw - 48px));
        }

        .mobile-hero {
          background: linear-gradient(132deg, rgb(104, 41, 205) 14%, #ff8c37 82%);
          color: #ffffff;
          padding: 128px 0 56px;
        }

        .mobile-hero__inner {
          text-align: center;
        }

        .mobile-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 400;
          line-height: 0.95;
          color: #ffffff;
        }

        .mobile-hero__link {
          color: #ffffff;
          text-decoration: underline;
          text-underline-offset: 0.08em;
        }

        .mobile-hero__link span {
          -webkit-text-stroke: currentColor;
          -webkit-text-stroke-width: 3px;
          -webkit-text-fill-color: transparent;
        }

        .mobile-hero__subtitle {
          margin: 24px auto 0;
          max-width: 900px;
          font-family: var(--font-zarathustra);
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-weight: 400;
          line-height: 1.15;
          color: #ffffff;
        }

        .mobile-article-section {
          padding: 40px 0 64px;
        }

        .mobile-pill-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .mobile-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 40px;
          padding: 2px 18px;
          border: 1px solid #e0e6ed;
          border-radius: 999px;
          background: #f9fafc;
          color: #8492a6;
          font-family: var(--font-phantom);
          font-size: 1rem;
          line-height: 1;
        }

        .mobile-pill--author {
          padding-left: 8px;
        }

        .mobile-pill__avatar {
          width: 36px;
          height: 36px;
          border-radius: 999px;
        }

        .mobile-article {
          font-family: var(--font-phantom);
          font-size: 1.25rem;
          line-height: 1.45;
          color: #17171d;
        }

        .mobile-article p,
        .mobile-article ul,
        .mobile-article ol {
          margin: 0 0 20px;
        }

        .mobile-article h2 {
          margin: 40px 0 16px;
          font-family: var(--font-zarathustra);
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 400;
          line-height: 1;
          color: #17171d;
        }

        .mobile-article ul {
          padding-left: 28px;
          list-style: disc;
        }

        .mobile-article li {
          margin-bottom: 10px;
        }

        .mobile-article a {
          color: #ec3750;
          text-decoration: none;
        }

        .mobile-article a:hover {
          text-decoration: underline;
        }

        .mobile-article sup {
          font-size: 0.7em;
          vertical-align: super;
        }

        .mobile-article sup a,
        .mobile-footnotes a {
          color: inherit;
        }

        .mobile-article__spacer {
          height: 16px;
        }

        .mobile-badges {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .mobile-badges a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-badges img {
          height: 64px;
          width: auto;
        }

        .mobile-footnotes {
          margin-top: 8px;
          padding-left: 22px;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #4f6074;
        }

        .mobile-cta {
          background: linear-gradient(32deg, #ffd700 0%, #ff8c37 100%);
          color: #ffffff;
          padding: 32px 0 40px;
        }

        .mobile-cta__grid {
          display: grid;
          grid-template-columns: 72px minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }

        .mobile-cta__icon {
          color: #ffffff;
          line-height: 1;
        }

        .mobile-cta__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 400;
          line-height: 1;
          color: #ffffff;
        }

        .mobile-cta__body {
          margin: 12px 0 32px;
          font-family: var(--font-phantom);
          font-size: 1.25rem;
          line-height: 1.2;
          color: #ffffff;
        }

        .mobile-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .mobile-cta__button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          font-family: var(--font-phantom);
          font-size: 1.25rem;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .mobile-cta__button:hover {
          opacity: 0.85;
        }

        .mobile-cta__button--cyan {
          background: #5bc0de;
          color: #ffffff;
        }

        .mobile-cta__button--orange {
          background: #ff8c37;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .mobile-shell,
          .mobile-copy {
            width: calc(100vw - 32px);
          }

          .mobile-hero {
            padding-top: 112px;
            padding-bottom: 40px;
          }

          .mobile-hero__link span {
            -webkit-text-stroke-width: 2px;
          }

          .mobile-article-section {
            padding-top: 32px;
            padding-bottom: 48px;
          }

          .mobile-pill-row {
            justify-content: flex-start;
          }

          .mobile-article {
            font-size: 1rem;
            line-height: 1.6;
          }

          .mobile-article h2 {
            margin-top: 36px;
          }

          .mobile-cta {
            padding: 28px 0 36px;
          }

          .mobile-cta__grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .mobile-cta__body {
            margin-bottom: 24px;
            font-size: 1rem;
            line-height: 1.5;
          }

          .mobile-cta__button {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
