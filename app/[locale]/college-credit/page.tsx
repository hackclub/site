import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CollegeCredit" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/college-credit",
    locale,
  });
}

export default async function CollegeCreditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CollegeCredit");

  const contacts = [
    {
      kind: t("contactHighSchool"),
      name: t("contactHighSchoolName"),
      email: "christina@hackclub.com",
      avatar:
        "https://cdn.hackclub.com/019d8d79-0da7-7b99-a8fe-ee6412aca976/2026_04_14_0pu_Kleki%20(1).png",
    },
    {
      kind: t("contactCollege"),
      name: t("contactCollegeName"),
      email: "dev@hackclub.com",
      avatar: "https://github.com/devenjadhav.png",
    },
  ];

  const facts = [t("isItem1"), t("isItem2"), t("isItem3"), t("isItem4"), t("isItem5")];

  return (
    <main id="main" tabIndex={-1} className="credit-page">
      <section className="credit-hero">
        <Navbar invertColors />
        <div className="credit-shell credit-hero__inner">
          <div className="credit-hero__copy">
            <h1 className="credit-hero__title">{t("heroTitle")}</h1>
            <p className="credit-hero__lede">{t("heroLede")}</p>
            <div className="credit-hero__actions">
              <a className="credit-btn credit-btn--ghost" href="#contact">
                {t("getInTouch")}
              </a>
            </div>
          </div>
        </div>
        <div className="credit-hero__grain" aria-hidden="true" />
      </section>

      <section className="credit-shell credit-section" id="standards">
        <div className="credit-facts">
          <h2 className="credit-section__title">{t("isTitle")}</h2>
          <ul>
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="credit-shell credit-section">
        <div className="credit-questions">
          <a className="credit-question" href="#contact">
            <span className="credit-kicker">{t("contactHighSchool")}</span>
            <p>{t("askEducators")}</p>
          </a>
          <a className="credit-question" href="#contact">
            <span className="credit-kicker">{t("contactEither")}</span>
            <p>{t("askStudents")}</p>
          </a>
        </div>
      </section>

      <section className="credit-shell credit-section credit-section--cta" id="contact">
        <div className="credit-cta">
          <p className="credit-cta__copy">{t("contactLede")}</p>
          <div className="credit-cta__contacts">
            {contacts.map((c) => (
              <a key={c.email} className="credit-contact" href={`mailto:${c.email}`}>
                <Image
                  src={c.avatar}
                  alt={c.name}
                  width={68}
                  height={68}
                  className="credit-contact__avatar"
                />
                <span className="credit-contact__body">
                  <span className="credit-kicker">{c.kind}</span>
                  <span className="credit-contact__name">{c.name}</span>
                  <span className="credit-contact__email">{c.email}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .credit-page {
          background:
            radial-gradient(circle at 10% 0%, rgba(255, 140, 55, 0.18), transparent 34%),
            radial-gradient(circle at 90% 8%, rgba(236, 55, 80, 0.16), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .credit-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .credit-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.36), transparent 32%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.35), transparent 35%),
            linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 45%, var(--red) 100%);
          padding: 120px 0 88px;
        }

        .credit-hero__inner {
          position: relative;
          z-index: 2;
        }

        .credit-hero__copy {
          max-width: 720px;
          color: var(--cream);
        }

        .credit-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(3rem, 6.5vw, 5.5rem);
          line-height: 0.92;
          color: var(--cream);
          text-wrap: balance;
        }

        .credit-hero__lede {
          margin: 24px 0 0;
          font-family: var(--font-phantom);
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          line-height: 1.55;
          color: rgba(255, 246, 235, 0.86);
        }

        .credit-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .credit-btn {
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

        .credit-btn--ghost {
          background: rgba(255, 255, 255, 0.12);
          color: var(--cream);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .credit-btn:hover {
          transform: scale(1.04);
        }

        .credit-kicker {
          font-family: var(--font-phantom);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .credit-hero__grain {
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

        .credit-section {
          padding: 72px 0 0;
        }

        .credit-section__header {
          max-width: 860px;
          margin-bottom: 28px;
        }

        .credit-section__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2.1rem, 4vw, 3.2rem);
          line-height: 0.96;
        }

        .credit-questions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .credit-question {
          display: grid;
          gap: 12px;
          align-content: start;
          border-radius: 26px;
          padding: 22px 26px 26px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 18px 40px rgba(91, 52, 18, 0.08);
          text-decoration: none;
          color: inherit;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .credit-question:hover {
          transform: translateY(-2px);
          box-shadow: 0 24px 50px rgba(91, 52, 18, 0.12);
        }

        .credit-question p {
          margin: 0;
          font-family: var(--font-phantom);
          font-weight: 500;
          font-size: clamp(1.1rem, 1.5vw, 1.3rem);
          line-height: 1.5;
        }

        .credit-facts {
          border-radius: 30px;
          padding: 32px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
          display: grid;
          gap: 24px;
        }

        .credit-facts ul {
          margin: 0;
          padding-left: 22px;
          list-style: disc;
          display: grid;
          gap: 12px;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--foreground);
        }

        .credit-section--cta {
          padding: 72px 0 140px;
        }

        .credit-cta {
          border-radius: 32px;
          padding: 32px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
          display: grid;
          gap: 24px;
        }

        .credit-cta__copy {
          margin: 0;
          text-wrap: pretty;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--muted);
        }

        .credit-cta__contacts {
          display: grid;
          grid-template-columns: repeat(2, minmax(220px, 1fr));
          gap: 12px;
        }

        .credit-contact {
          display: flex;
          align-items: center;
          gap: 16px;
          border-radius: 20px;
          padding: 16px 18px;
          background: var(--surface-hover);
          border: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          transition: background-color 0.15s ease;
        }

        .credit-contact:hover,
        .credit-contact:focus-visible {
          background: var(--background);
        }

        .credit-contact:hover .credit-contact__email,
        .credit-contact:focus-visible .credit-contact__email {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .credit-contact__avatar {
          width: 68px;
          height: 68px;
          border-radius: 20px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .credit-contact__body {
          display: grid;
          gap: 4px;
          min-width: 0;
        }

        .credit-contact__name {
          font-family: var(--font-zarathustra);
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 1.1;
        }

        .credit-contact__email {
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--red);
        }

        .credit-page > .site-footer {
          margin-top: 140px;
        }

        @media (max-width: 767px) {
          .credit-shell {
            width: calc(100vw - 32px);
          }

          .credit-hero {
            padding: 110px 0 72px;
          }

          .credit-questions,
          .credit-cta__contacts {
            grid-template-columns: 1fr;
          }

          .credit-section--cta {
            padding-bottom: 104px;
          }

          .credit-cta,
          .credit-facts {
            padding: 24px;
          }

          .credit-btn {
            width: 100%;
          }

          .credit-page > .site-footer {
            margin-top: 104px;
          }
        }
      `}</style>
    </main>
  );
}
