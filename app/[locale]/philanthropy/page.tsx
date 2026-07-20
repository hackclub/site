import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";
import insiderLogo from "./assets/insider-logo.svg";
import wsjLogo from "./assets/wsj-logo.svg";
import forbesLogo from "./assets/forbes-logo.svg";
import copLogo from "./assets/cop.webp";
import ariannaPhoto from "./assets/arianna.webp";
import jasonPhoto from "./assets/jason.webp";
import samPhoto from "./assets/sam.webp";
import abbyPhoto from "./assets/abby.webp";
import adrianoPhoto from "./assets/adriano.webp";
import bellePhoto from "./assets/belle.webp";
import obreyPhoto from "./assets/obrey.webp";
import maggiePhoto from "./assets/maggie.webp";
import christinaSignature from "./assets/christina-s.webp";
import zachSignature from "./assets/zach-s.webp";

const donorTierNames = {
  tier5to10m: ["Tom Preston-Werner (9x)", "Musk Foundation (6x)"],
  tier1to5m: [
    "Dr. Lisa Su",
    "Michael Dell (3x)",
    "McGovern Foundation",
    "Craig Newmark (4x)",
    "Tobi Lutke",
    "Advanced Micro Devices",
    "The Libermans",
  ],
  tier500kto1m: [
    "GitHub Education (6x)",
    "Argosy Foundation (5x)",
    "Endless Network (4x)",
    "FUTO (3x)",
    "Joe Liemandt",
  ],
  tier200kto500k: [
    "Ron Conway (6x)",
    "Adam Ross (3x)",
    "Gwynne Shotwell",
    "Jack Dorsey",
    "Vitalik Buterin",
  ],
  tier100kto200k: [
    "Quinn Slack (3x)",
    "Mitchell Hashimoto",
    "Proton Foundation",
    "Kellogg Foundation",
    "Pinkerton Foundation",
  ],
} as const;

const inKindDonors: {
  src: string;
  alt: string;
  href: string;
  width: number;
  height: number;
  invert?: boolean;
}[] = [
  {
    src: "https://cdn.hackclub.com/019e7023-c31a-729a-b024-2c0a10b2e268/vercel.webp",
    alt: "Vercel",
    href: "https://vercel.com",
    width: 2048,
    height: 407,
    invert: true,
  },
  {
    src: "https://cdn.hackclub.com/019e7023-ddbd-71b6-8782-0d0233903dd2/google.webp",
    alt: "Google",
    href: "https://google.com",
    width: 1024,
    height: 310,
  },
  {
    src: "https://cdn.hackclub.com/019e7023-e567-77ee-a345-9a090a32292a/checkly.webp",
    alt: "Checkly",
    href: "https://www.checklyhq.com",
    width: 200,
    height: 200,
  },
  {
    src: "https://cdn.hackclub.com/019e7023-ed77-7227-8011-e86d253d6635/fastfoward.webp",
    alt: "Fast Forward",
    href: "https://www.ffwd.org",
    width: 128,
    height: 129,
  },
  {
    src: "https://cdn.hackclub.com/019e702b-11b1-7a26-8a7f-a880ef93cd8c/finintercom.webp",
    alt: "Intercom + Fin",
    href: "https://www.intercom.com",
    width: 692,
    height: 258,
    invert: true,
  },
];

const additionalSupporters = [
  "Dylan Field, Founder, Figma",
  "Guillermo Rauch, Founder, Vercel",
  "Taylor Otwell, Creator of Laravel",
  "Theo Bleier, Technical Staff, Simile",
  "Kevin Yang, Principal Researcher, Microsoft",
  "Amjad Masad, Co-founder, Replit",
  "Conrad Kramer, Co-founder, Workflow",
  "David Cramer, Co-founder, Sentry",
  "Mahmoud Abdelkader, CEO, Very Good Security",
  "Blake Lieberman, Partner, Rief Ventures",
];

const additionalSupportersRU = [
    "Dylan Field, Основатель, Figma",
    "Guillermo Rauch, Основатель, Vercel",
    "Taylor Otwell, Создатель Laravel",
    "Theo Bleier, Технический специалист, Simile",
    "Kevin Yang, Главный научный сотрудник, Microsoft",
    "Amjad Masad, Сооснователь, Replit",
    "Conrad Kramer, Сооснователь, Workflow",
    "David Cramer, Сооснователь, Sentry",
    "Mahmoud Abdelkader, Генеральный директор, Very Good Security",
    "Blake Lieberman, Партнер, Rief Ventures",
];


const pressLogos = [
  {
    href: "https://www.businessinsider.com/zach-lattas-hacker-club-got-him-on-forbes-30-under-30-2016-1",
    src: insiderLogo,
    alt: "Business Insider",
  },
  {
    href: "https://www.wsj.com/articles/teen-hackers-try-to-convince-parents-they-are-up-to-good-11569922200",
    src: wsjLogo,
    alt: "Wall Street Journal",
  },
  {
    href: "https://www.forbes.com/sites/fastforward/2021/06/29/from-journalism-to-a-tech-nonprofit-this-coos-big-pivot-to-empower-the-next-generation-of-coders/",
    src: forbesLogo,
    alt: "Forbes",
  },
  {
    href: "https://www.philanthropy.com/article/nonprofits-need-to-embrace-transparency-even-if-the-supreme-court-rules-to-protect-donor-privacy",
    src: copLogo,
    alt: "Chronicle of Philanthropy",
  },
];

const form990 = [
  {
    year: "2024",
    href: "https://cdn.hackclub.com/019c4366-66a7-7b57-8103-5d7731c114d3/812908499_2024_202533219349309698_990.pdf",
  },
  {
    year: "2023",
    href: "https://cdn.hackclub.com/019c4366-d33c-7b59-a778-f1a932036d43/812908499_2023_202423209349312247_990.pdf",
  },
  {
    year: "2022",
    href: "https://cdn.hackclub.com/019c4367-399e-76b5-8198-66ab98fb6ea9/812908499_2022_202333199349306488_990.pdf",
  },
  {
    year: "2021",
    href: "https://cdn.hackclub.com/019c4367-84af-7e6c-a8bc-cb7dabd69f9f/812908499_2021_202243189349308489_990.pdf",
  },
  {
    year: "2020",
    href: "https://cdn.hackclub.com/019c4367-d7be-73b2-bf65-933c982b3d07/812908499_2020_202103239349300740_990.pdf",
  },
];

const annualReports = [
  {
    year: "2024",
    href: "https://cdn.hackclub.com/019c4369-c21c-7436-9669-4ab80d4774a4/2024%20Annual%20Report.pdf",
  },
  {
    year: "2023",
    href: "https://cdn.hackclub.com/019c4368-9ea2-76fb-96fc-d7859dffa59e/2023%20Annual%20Report.pdf",
  },
  {
    year: "2022",
    href: "https://cdn.hackclub.com/019c436a-61fa-7c33-bd8d-d65b89446bff/2022%20Annual%20Report.pdf",
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Philanthropy" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    canonical: "/philanthropy",
    locale,
  });
}

export default async function PhilanthropyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Philanthropy");

  const testimonials = [
    {
      photo: ariannaPhoto,
      quote: t("testimonialArianna"),
      info: t("testimonialAriannaInfo"),
    },
    {
      photo: jasonPhoto,
      quote: t("testimonialJason"),
      info: t("testimonialJasonInfo"),
    },
    {
      photo: samPhoto,
      quote: t("testimonialSam"),
      info: t("testimonialSamInfo"),
    },
    {
      photo: abbyPhoto,
      quote: t("testimonialAbby"),
      info: t("testimonialAbbyInfo"),
    },
    {
      photo: adrianoPhoto,
      quote: t("testimonialAdriano"),
      info: t("testimonialAdrianoInfo"),
    },
  ];

  const impactStories = [
    {
      title: "Obrey Muchena",
      subtitle: t("impactObreySubtitle"),
      photo: obreyPhoto,
      intro: t("impactObreyIntro"),
      quote: t("impactObreyQuote"),
    },
    {
      title: "Maggie Liu",
      subtitle: t("impactMaggieSubtitle"),
      photo: maggiePhoto,
      intro: t("impactMaggieIntro"),
      quote: t("impactMaggieQuote"),
    },
  ];

  const donorTiers = (Object.keys(donorTierNames) as (keyof typeof donorTierNames)[]).map(
    (key) => ({
      title: t(key),
      names: donorTierNames[key],
    }),
  );

  return (
    <main id="main" tabIndex={-1} className="philanthropy-page">
      <section className="philanthropy-hero">
        <Navbar invertColors />
        <div className="philanthropy-shell philanthropy-hero__grid">
          <div className="philanthropy-hero__copy">
            <h1>
              {t("heroTitleLine1")}
              <br />
              {t("heroTitleLine2")}
            </h1>
            <p className="philanthropy-lede">{t("heroLede")}</p>
            <div className="philanthropy-hero__actions">
              <a
                className="philanthropy-btn philanthropy-btn--dark"
                href="https://hcb.hackclub.com/donations/start/hq?utm_source=site&utm_medium=internal&utm_campaign=philanthropy_page&utm_content=hero_button"
              >
                {t("donateCta")}
              </a>
            </div>
            <p className="philanthropy-caption">{t("taxCaption")}</p>
          </div>

          <div className="philanthropy-hero__collage" aria-hidden="true">
            <div className="philanthropy-collage__frame philanthropy-collage__frame--lg">
              <Image
                src="/assets/hero_photo8.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 260px, 360px"
              />
            </div>
            <div className="philanthropy-collage__frame philanthropy-collage__frame--md">
              <Image
                src="/assets/hero_photo3.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 200px, 260px"
              />
            </div>
            <div className="philanthropy-collage__frame philanthropy-collage__frame--sm">
              <Image
                src="/assets/hero_photo12.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 140px, 180px"
              />
            </div>
            <div className="philanthropy-collage__frame philanthropy-collage__frame--sticker">
              <Image src="/assets/hero_sticker3.webp" alt="" fill sizes="88px" />
            </div>
          </div>
        </div>
        <div className="philanthropy-hero__grain" aria-hidden="true" />
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <h2>{t("visionTitle")}</h2>
          <p>{t("visionIntro")}</p>
        </div>

        <div className="philanthropy-vision">
          <div>
            <p>{t("visionP1")}</p>
            <p>{t("visionP2")}</p>
            <p className="philanthropy-vision__conclusion">{t("visionConclusion")}</p>
          </div>
          <div className="philanthropy-vision__quote">
            <blockquote>{t("visionQuote")}</blockquote>
            <span>{t("visionQuoteAttr")}</span>
          </div>
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-testimonials">
          {testimonials.map((item) => (
            <article key={item.info} className="philanthropy-testimonial-card">
              <Image
                src={item.photo}
                alt={item.info}
                fill
                sizes="(max-width: 1100px) 100vw, 20vw"
              />
              <div>
                <p>&quot;{item.quote}&quot;</p>
                <span>{item.info}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-contact-grid">
          <div>
            <p className="philanthropy-kicker philanthropy-kicker--dark">{t("giftKicker")}</p>
            <h2>{t("giftTitle")}</h2>
            <p>{t("giftContact")}</p>
            <a href="mailto:christina@hackclub.com">christina@hackclub.com</a>
          </div>
          <div className="philanthropy-checks">
            <h3>{t("checksTitle")}</h3>
            <p>{t("checksOrg")}</p>
            <p>{t("checksAddress")}</p>
            <p>{t("checksEin")}</p>
            <a href="https://hcb.hackclub.com/donations/start/hq?utm_source=site&utm_medium=internal&utm_campaign=philanthropy_page&utm_content=body_link">
              {t("donateOnline")}
            </a>
            <p>{t("acceptOther")}</p>
          </div>
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section philanthropy-section--light">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("communityKicker")}</p>
          <h2>{t("communityTitle")}</h2>
        </div>
        <div className="philanthropy-donors">
          {donorTiers.map((tier) => (
            <div key={tier.title} className="philanthropy-donors__tier">
              <h3>{tier.title}</h3>
              <ul>
                {tier.names.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="philanthropy-donors__note">{t("donorsNote")}</p>

        <h3 className="philanthropy-supporters-title">{t("supportersTitle")}</h3>
        <div className="philanthropy-pill-grid">
          {(t("metaTitle") == "Программы — Hack Club" ? additionalSupporters : additionalSupportersRU).map((supporter) => (
            <span key={supporter}>{supporter}</span>
          ))}
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("serviceKicker")}</p>
          <h2>{t("serviceTitle")}</h2>
        </div>
        <div className="philanthropy-inkind">
          {inKindDonors.map((donor) => (
            <a
              key={donor.href}
              href={donor.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={donor.alt}
            >
              <Image
                src={donor.src}
                alt={donor.alt}
                width={donor.width}
                height={donor.height}
                className={donor.invert ? "philanthropy-inkind__logo--invert" : undefined}
              />
            </a>
          ))}
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("impactKicker")}</p>
          <h2>{t("impactTitle")}</h2>
        </div>
        <div className="philanthropy-impact-grid">
          {impactStories.map((story) => (
            <article key={story.title} className="philanthropy-impact-card">
              <div className="philanthropy-impact-card__copy">
                <p>{story.intro}</p>
                <h3>{story.quote}</h3>
              </div>
              <div className="philanthropy-impact-card__person">
                <Image src={story.photo} alt={story.title} width={52} height={52} />
                <div>
                  <strong>{story.title}</strong>
                  <span>{story.subtitle}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="philanthropy-belle-quote">
          <h3>{t("belleQuote")}</h3>
          <div>
            <Image src={bellePhoto} alt="Belle" width={28} height={28} />
            <span>{t("belleInfo")}</span>
          </div>
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("newsKicker")}</p>
          <h2>{t("newsTitle")}</h2>
        </div>
        <div className="philanthropy-press">
          {pressLogos.map((logo) => (
            <a key={logo.href} href={logo.href} target="_blank" rel="noreferrer">
              <Image src={logo.src} alt={logo.alt} width={180} height={60} />
            </a>
          ))}
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("boardKicker")}</p>
          <h2>{t("boardTitle")}</h2>
        </div>
        <div className="philanthropy-board">
          <div className="philanthropy-board__list">
            <p>
              <strong>Tom Preston-Werner</strong>
              <span>{t("boardTomRole")}</span>
            </p>
            <p>
              <strong>Quinn Slack</strong>
              <span>{t("boardQuinnRole")}</span>
            </p>
            <p>
              <strong>Zach Latta</strong>
              <span>{t("boardZachRole")}</span>
            </p>
            <p>
              <strong>Christina Asquith</strong>
              <span>{t("boardChristinaRole")}</span>
            </p>
            <small>{t("boardAdvisor")}</small>
          </div>
          <div className="philanthropy-board__quote">
            <p>{t("boardQuote1")}</p>
            <p>{t("boardQuote2")}</p>
            <span>{t("boardQuoteAttr")}</span>
          </div>
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("fundsKicker")}</p>
          <h2>{t("fundsTitle")}</h2>
        </div>
        <ul className="philanthropy-list">
          <li>{t("funds1")}</li>
          <li>{t("funds2")}</li>
          <li>{t("funds3")}</li>
          <li>{t("funds4")}</li>
          <li>{t("funds5")}</li>
          <li>{t("funds6")}</li>
        </ul>
      </section>

      <section className="philanthropy-shell philanthropy-section">
        <div className="philanthropy-section__header">
          <p className="philanthropy-kicker philanthropy-kicker--dark">{t("transparencyKicker")}</p>
          <h2>{t("transparencyTitle")}</h2>
          <p>{t("transparencyBody")}</p>
        </div>

        <div className="philanthropy-files">
          <div>
            <h3>{t("form990Title")}</h3>
            <div className="philanthropy-files__links">
              {form990.map((link) => (
                <a key={link.year} href={link.href} target="_blank" rel="noreferrer">
                  {link.year}
                </a>
              ))}
            </div>
            <p className="philanthropy-caption philanthropy-caption--dark">{t("form990Pending")}</p>
          </div>

          <div>
            <h3>{t("annualReportsTitle")}</h3>
            <div className="philanthropy-files__links">
              {annualReports.map((link) => (
                <a key={link.year} href={link.href} target="_blank" rel="noreferrer">
                  {link.year}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="philanthropy-shell philanthropy-section philanthropy-section--cta">
        <div className="philanthropy-cta">
          <div>
            <p className="philanthropy-kicker philanthropy-kicker--dark">{t("thankYouKicker")}</p>
            <h2>{t("ctaTitle")}</h2>
            <p>{t("ctaBody")}</p>
          </div>
          <div className="philanthropy-cta__card">
            <h3>{t("ctaChristinaTitle")}</h3>
            <span>{t("ctaChristinaRole")}</span>
            <a href="mailto:christina@hackclub.com">christina@hackclub.com</a>
            <p>
              {t("ctaAddressLine1")}
              <br />
              {t("ctaAddressLine2")}
              <br />
              {t("ctaAddressLine3")}
            </p>
          </div>
        </div>

        <div className="philanthropy-signatures">
          <div>
            <Image
              src={christinaSignature}
              alt={t("sigChristinaAlt")}
              width={420}
              height={168}
              className="philanthropy-signature-image"
            />
            <p>{t("sigChristina")}</p>
          </div>
          <div>
            <Image
              src={zachSignature}
              alt={t("sigZachAlt")}
              width={420}
              height={210}
              className="philanthropy-signature-image"
            />
            <p>{t("sigZach")}</p>
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center", margin: "56px 0" }}>
        <a
          href="https://cdn.hackclub.com/019d9ddf-c03d-76de-8ff1-64edd1bdcb16/hackclub_philanthropy.pdf"
          className="philanthropy-btn philanthropy-btn--red"
          download
          target="_blank"
          rel="noopener noreferrer"
          style={{ minWidth: 210, background: "var(--red)", color: "var(--paper)" }}
        >
          {t("downloadPdf")}
        </a>
      </div>
      <Footer />

      <style>{`
        .philanthropy-btn--red {
          background: var(--red) !important;
          color: var(--paper) !important;
        }

        .philanthropy-page {
          background:
            radial-gradient(circle at 5% 8%, rgba(236, 55, 80, 0.12), transparent 34%),
            radial-gradient(circle at 95% 0%, rgba(255, 140, 55, 0.18), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .philanthropy-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .philanthropy-kicker {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 246, 235, 0.75);
        }

        .philanthropy-kicker--dark {
          color: var(--muted);
        }

        .philanthropy-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.25), transparent 32%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.3), transparent 35%),
            linear-gradient(140deg, var(--ink) 0%, var(--ink-2) 55%, var(--red) 100%);
          color: var(--cream);
          padding: 120px 0 90px;
        }

        .philanthropy-hero__grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 48px;
          align-items: center;
        }

        .philanthropy-hero__copy h1 {
          margin: 0 0 18px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(3rem, 6.5vw, 5.2rem);
          line-height: 0.95;
        }

        .philanthropy-lede {
          margin: 0 0 26px;
          font-family: var(--font-phantom);
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          line-height: 1.55;
          color: rgba(255, 246, 235, 0.88); /* --cream with opacity, on constant dark hero */
        }

        .philanthropy-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }

        .philanthropy-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 999px;
          font-family: var(--font-phantom);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.15s ease;
        }

        .philanthropy-btn--dark {
          background: var(--paper);
          color: var(--ink);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
        }

        .philanthropy-btn--ghost {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: var(--cream);
        }

        .philanthropy-btn:hover {
          transform: translateY(-2px);
        }

        .philanthropy-caption {
          margin: 0 0 26px;
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: rgba(255, 246, 235, 0.78); /* --cream with opacity, on constant dark hero */
        }

        .philanthropy-caption--dark {
          color: var(--muted);
          margin-top: 12px;
        }

        .philanthropy-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .philanthropy-stat {
          border-radius: 20px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-family: var(--font-phantom);
        }

        .philanthropy-stat span {
          display: block;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--cream);
        }

        .philanthropy-stat p {
          margin: 6px 0 0;
          font-size: 0.82rem;
          color: rgba(255, 246, 235, 0.72); /* --cream with opacity, on constant dark hero */
          line-height: 1.3;
        }

        .philanthropy-hero__collage {
          position: relative;
          min-height: 430px;
        }

        .philanthropy-collage__frame {
          position: absolute;
          border-radius: 22px;
          overflow: hidden;
          border: 4px solid var(--paper);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        }

        .philanthropy-collage__frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .philanthropy-collage__frame--lg {
          width: 360px;
          height: 280px;
          right: 40px;
          top: 0;
          transform: rotate(2deg);
        }

        .philanthropy-collage__frame--md {
          width: 260px;
          height: 200px;
          left: 10px;
          top: 160px;
          transform: rotate(-6deg);
        }

        .philanthropy-collage__frame--sm {
          width: 180px;
          height: 140px;
          right: 120px;
          bottom: 0;
          transform: rotate(-10deg);
        }

        .philanthropy-collage__frame--sticker {
          width: 88px;
          height: 88px;
          left: 160px;
          top: 40px;
          border: none;
          box-shadow: none;
        }

        .philanthropy-hero__grain {
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

        .philanthropy-section {
          padding: 80px 0 0;
        }

        .philanthropy-section__header h2 {
          margin: 0 0 16px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 0.96;
        }

        .philanthropy-section__header p {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--muted);
          max-width: 860px;
        }

        .philanthropy-vision {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: 32px;
          margin-top: 32px;
        }

        .philanthropy-vision p {
          margin: 0 0 16px;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--muted);
        }

        .philanthropy-vision__quote {
          border-radius: 26px;
          padding: 26px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
          display: grid;
          gap: 12px;
        }

        .philanthropy-vision__quote blockquote {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: 1.8rem;
          line-height: 1.1;
        }

        .philanthropy-vision__quote span {
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: var(--muted);
        }

        .philanthropy-vision__conclusion {
          font-weight: 700;
        }

        .philanthropy-testimonials {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .philanthropy-testimonial-card {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--border);
          min-height: 260px;
          position: relative;
        }

        .philanthropy-testimonial-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .philanthropy-testimonial-card div {
          position: absolute;
          inset: auto 0 0;
          background: linear-gradient(180deg, rgba(23, 23, 29, 0), rgba(23, 23, 29, 0.94));
          padding: 12px;
          color: #fff6eb;
          display: grid;
          gap: 6px;
        }

        .philanthropy-testimonial-card p {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.9rem;
          line-height: 1.25;
        }

        .philanthropy-testimonial-card span {
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          opacity: 0.78;
        }

        .philanthropy-contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
          gap: 24px;
          align-items: start;
        }

        .philanthropy-contact-grid h2 {
          margin: 0 0 12px;
          font-family: var(--font-zarathustra);
          font-size: clamp(1.9rem, 3vw, 2.5rem);
          font-weight: 400;
        }

        .philanthropy-contact-grid p,
        .philanthropy-contact-grid a {
          font-family: var(--font-phantom);
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 8px;
        }

        .philanthropy-contact-grid a {
          color: var(--red);
          text-decoration: none;
          font-weight: 700;
        }

        .philanthropy-checks {
          border-radius: 22px;
          padding: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .philanthropy-checks h3 {
          margin: 0 0 8px;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          font-weight: 700;
        }

        .philanthropy-section--light {
          margin-top: 72px;
          padding: 72px 0 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .philanthropy-donors {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
          margin-top: 28px;
        }

        .philanthropy-donors__tier {
          border-radius: 20px;
          padding: 18px;
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .philanthropy-donors__tier h3 {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .philanthropy-donors__tier ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 6px;
          font-family: var(--font-phantom);
          font-size: 0.9rem;
          color: var(--muted);
        }

        .philanthropy-donors__note {
          margin: 18px 0 0;
          font-family: var(--font-phantom);
          color: var(--muted);
          font-size: 0.9rem;
        }

        .philanthropy-supporters-title {
          margin: 26px 0 12px;
          font-family: var(--font-phantom);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .philanthropy-pill-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .philanthropy-pill-grid span {
          border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 12px;
          font-family: var(--font-phantom);
          font-size: 0.88rem;
          color: var(--muted);
        }

        .philanthropy-impact-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .philanthropy-impact-card {
          border-radius: 24px;
          padding: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 18px 38px rgba(91, 52, 18, 0.1);
          display: grid;
          gap: 16px;
        }

        .philanthropy-impact-card__copy p {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          line-height: 1.6;
          color: var(--muted);
        }

        .philanthropy-impact-card__copy h3 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1.1;
        }

        .philanthropy-impact-card__person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .philanthropy-impact-card__person img {
          width: 52px;
          height: 52px;
          border-radius: 999px;
        }

        .philanthropy-impact-card__person strong {
          display: block;
          font-family: var(--font-phantom);
        }

        .philanthropy-impact-card__person span {
          font-family: var(--font-phantom);
          color: var(--muted);
          font-size: 0.88rem;
        }

        .philanthropy-belle-quote {
          margin-top: 22px;
          border-radius: 24px;
          padding: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          display: grid;
          gap: 12px;
        }

        .philanthropy-belle-quote h3 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: clamp(1.5rem, 2.6vw, 2.1rem);
          font-weight: 400;
          line-height: 1.1;
        }

        .philanthropy-belle-quote div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .philanthropy-belle-quote img {
          width: 28px;
          height: 28px;
          border-radius: 999px;
        }

        .philanthropy-belle-quote span {
          font-family: var(--font-phantom);
          color: var(--muted);
        }

        .philanthropy-press {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: center;
        }

        .philanthropy-press a {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          padding: 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 14px 30px rgba(91, 52, 18, 0.08);
          min-height: 100px;
        }

        .philanthropy-press img {
          max-width: 170px;
          max-height: 56px;
          height: auto;
          object-fit: contain;
        }

        html.dark .philanthropy-press img,
        html.dark .philanthropy-signature-image {
          filter: invert(1);
        }

        .philanthropy-inkind {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 18px;
          align-items: center;
        }

        .philanthropy-inkind a {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          padding: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 14px 30px rgba(91, 52, 18, 0.08);
          min-height: 120px;
          transition: transform 0.15s ease;
        }

        .philanthropy-inkind a:hover {
          transform: translateY(-2px);
        }

        .philanthropy-inkind img {
          max-width: 100%;
          max-height: 64px;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        html.dark .philanthropy-inkind__logo--invert {
          filter: invert(1);
        }

        .philanthropy-board {
          margin-top: 28px;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 20px;
        }

        .philanthropy-board__list,
        .philanthropy-board__quote {
          border-radius: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 14px 28px rgba(91, 52, 18, 0.08);
          padding: 22px;
        }

        .philanthropy-board__list p {
          margin: 0 0 12px;
          display: grid;
          gap: 2px;
        }

        .philanthropy-board__list strong {
          font-family: var(--font-phantom);
        }

        .philanthropy-board__list span,
        .philanthropy-board__list small {
          font-family: var(--font-phantom);
          color: var(--muted);
          font-size: 0.9rem;
        }

        .philanthropy-board__quote p {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          color: var(--muted);
          line-height: 1.6;
        }

        .philanthropy-board__quote span {
          font-family: var(--font-phantom);
          color: var(--muted);
          font-size: 0.9rem;
        }

        .philanthropy-list {
          margin: 24px 0 0;
          padding: 0 0 0 20px;
          display: grid;
          gap: 8px;
          font-family: var(--font-phantom);
          color: var(--muted);
          line-height: 1.6;
        }

        .philanthropy-files {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .philanthropy-files h3 {
          margin: 0 0 12px;
          font-family: var(--font-phantom);
          font-weight: 700;
        }

        .philanthropy-files__links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .philanthropy-files__links a {
          text-decoration: none;
          font-family: var(--font-phantom);
          font-weight: 700;
          color: var(--red);
          background: rgba(236, 55, 80, 0.1);
          padding: 6px 14px;
          border-radius: 999px;
        }

        .philanthropy-section--cta {
          padding: 84px 0 96px;
        }

        .philanthropy-cta {
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

        .philanthropy-cta h2 {
          margin: 0 0 12px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2rem, 3.6vw, 3rem);
        }

        .philanthropy-cta p {
          margin: 0;
          font-family: var(--font-phantom);
          color: var(--muted);
          line-height: 1.6;
        }

        .philanthropy-cta__card {
          border-radius: 22px;
          padding: 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          display: grid;
          gap: 8px;
        }

        .philanthropy-cta__card h3 {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: 1.6rem;
        }

        .philanthropy-cta__card span {
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: var(--muted);
        }

        .philanthropy-cta__card a {
          font-family: var(--font-phantom);
          font-weight: 700;
          color: var(--red);
          text-decoration: none;
        }

        .philanthropy-signatures {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .philanthropy-signatures div {
          border-radius: 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 20px;
        }

        .philanthropy-signature-image {
          display: block;
          max-width: 100%;
          height: 92px;
          width: auto;
          object-fit: contain;
        }

        .philanthropy-signatures p {
          margin: 8px 0 0;
          font-family: var(--font-phantom);
          color: var(--muted);
          font-size: 0.88rem;
        }

        @media (max-width: 1100px) {
          .philanthropy-hero__grid,
          .philanthropy-vision,
          .philanthropy-contact-grid,
          .philanthropy-impact-grid,
          .philanthropy-board,
          .philanthropy-files,
          .philanthropy-cta {
            grid-template-columns: 1fr;
          }

          .philanthropy-testimonials,
          .philanthropy-donors,
          .philanthropy-press,
          .philanthropy-inkind,
          .philanthropy-signatures {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .philanthropy-hero__collage {
            min-height: 360px;
          }

          .philanthropy-collage__frame--lg {
            right: 0;
          }
        }

        @media (max-width: 767px) {
          .philanthropy-shell {
            width: calc(100vw - 24px);
          }

          .philanthropy-hero {
            padding: 102px 0 64px;
          }

          .philanthropy-hero__copy h1 {
            font-size: clamp(2.2rem, 10vw, 3rem);
            line-height: 1;
          }

          .philanthropy-lede {
            font-size: 1rem;
            line-height: 1.5;
          }

          .philanthropy-section {
            padding: 58px 0 0;
          }

          .philanthropy-section__header p {
            font-size: 0.98rem;
            line-height: 1.55;
          }

          .philanthropy-stats {
            grid-template-columns: 1fr;
          }

          .philanthropy-testimonials,
          .philanthropy-donors,
          .philanthropy-press,
          .philanthropy-inkind,
          .philanthropy-signatures {
            grid-template-columns: 1fr;
          }

          .philanthropy-hero__collage {
            min-height: 280px;
          }

          .philanthropy-collage__frame--lg {
            width: 260px;
            height: 200px;
          }

          .philanthropy-collage__frame--md {
            width: 200px;
            height: 150px;
            left: 0;
          }

          .philanthropy-collage__frame--sm {
            width: 140px;
            height: 110px;
            right: 20px;
          }

          .philanthropy-btn {
            width: 100%;
          }

          .philanthropy-cta {
            padding: 24px;
            border-radius: 24px;
          }

          .philanthropy-impact-card,
          .philanthropy-board__list,
          .philanthropy-board__quote,
          .philanthropy-checks,
          .philanthropy-files > div {
            padding: 18px;
          }

          .philanthropy-signatures div {
            padding: 16px;
          }

          .philanthropy-signature-image {
            height: 76px;
          }

          .philanthropy-press img {
            max-width: 130px;
          }
        }
      `}</style>
    </main>
  );
}
