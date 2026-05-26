import { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Press — Hack Club",
  description: "Hack Club press resources, media coverage, and official logos for press use.",
  canonical: "/press",
});

const logoAssets = [
  { key: "flag-standalone", width: 526, height: 184 },
  { key: "flag-orpheus-top", width: 280, height: 158 },
  { key: "flag-orpheus-left", width: 280, height: 158 },
  { key: "flag-standalone-bw", width: 526, height: 184 },
  { key: "icon-rounded", width: 256, height: 256 },
  { key: "icon-square", width: 256, height: 256 },
] as const;

const photoItems = [
  {
    src: "https://cdn.hackclub.com/019e3850-82f9-7a36-8043-2748e49cd8cb/assemble-2022-group-photo.webp",
    alt: "Group photo at Assemble, our Summer 2022 hackathon",
    width: 1820,
    height: 1218,
  },
  {
    src: "https://cdn.hackclub.com/019db8b9-ea4c-7e47-b0be-a0f87f1cc75b/1assemble2-min.webp",
    alt: "Teenager leading a workshop at Assemble",
    width: 2048,
    height: 1367,
  },
  {
    src: "https://cdn.hackclub.com/019db8b8-ede0-70f1-a6c9-11c3a1fee944/flagship4-min.webp",
    alt: "Teens with hands raised at Flagship",
    width: 2224,
    height: 1483,
  },
  {
    src: "https://cdn.hackclub.com/019db857-4b48-7633-9df8-a4b335a251ef/bigCollage.webp",
    alt: "Group photo at Outernet, our Summer 2023 hackathon",
    width: 1920,
    height: 1280,
  },
  {
    src: "https://cdn.hackclub.com/019db8bb-d694-73e4-b303-aab32069b1e6/4outernet1-min.webp",
    alt: "Teens coding at Outernet",
    width: 6644,
    height: 4429,
  },
  {
    src: "https://cdn.hackclub.com/019db8bc-afb5-74ac-8487-5a0b1362ba2a/0outernet.webp",
    alt: "Teens demonstrating a flame thrower at Outernet",
    width: 1804,
    height: 1218,
  },
] as const;

const stats = [
  { label: "Founded", value: "2014" },
  { label: "High schools", value: "1,400+" },
  { label: "Teens yearly", value: "100,000" },
];

const assetUrl = (name: string, ext: string) => `https://assets.hackclub.com/${name}.${ext}`;

const logoTitle = (name: string) =>
  name
    .replace(/-/g, " ")
    .replace("flag orpheus", "orpheus flag")
    .replace("bw", "b/w")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function PressPage() {
  return (
    <main id="main" tabIndex={-1} className="press-page">
      <section className="press-hero">
        <Navbar invertColors />
        <div className="press-shell press-hero__inner">
          <div className="press-hero__copy">
            <h1 className="press-hero__title">
              Hack Club
              <br />
              Press Kit
            </h1>
            <p className="press-hero__lede">
              Hack Club is a global nonprofit network of high school makers &amp; student-led coding
              clubs where young people build the agency, the network, &amp; the technical talent to
              think big &amp; do big things in the world.
            </p>
            <div className="press-hero__actions">
              <a
                className="press-btn press-btn--ghost"
                href="https://assets.hackclub.com/2020_branding.zip"
              >
                Download press kit
              </a>
            </div>
            <div className="press-hero__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="press-stat">
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="press-hero__panel">
            <div className="press-hero__card">
              <p>Quick facts</p>
              <ul>
                <li>Global nonprofit network of teen makers.</li>
                <li>Nearly 1,400 high schools worldwide.</li>
                <li>100,000 teenagers each year.</li>
              </ul>
            </div>
            <div className="press-hero__card press-hero__card--accent">
              <p>Press contact</p>
              <p className="press-contact__name">Christina Asquith</p>
              <span>Co-founder &amp; COO</span>
              <a href="mailto:christina@hackclub.com">christina@hackclub.com</a>
            </div>
          </div>
        </div>
        <div className="press-hero__grain" aria-hidden="true" />
      </section>

      <section className="press-shell press-section">
        <div className="press-section__header">
          <p className="press-kicker press-kicker--dark">About</p>
          <h2 className="press-section__title">Who we are.</h2>
          <p className="press-section__copy">
            Founded in 2014 by 16-year-old Zach Latta, Hack Clubs are now in nearly 1,400 high
            schools with 100,000 teenagers each year. Hack Club has been profiled on the TODAY Show,
            in the Wall Street Journal, and in many other publications around the country.
          </p>
        </div>
        <div className="press-callout">
          <div>
            <h3>Press inquiries</h3>
            <p>
              If you are writing a story or have other press inquiries, please contact Christina
              Asquith.
            </p>
          </div>
          <a className="press-btn press-btn--dark" href="mailto:christina@hackclub.com">
            Email Christina
          </a>
        </div>
      </section>

      <section className="press-shell press-section" id="photos">
        <div className="press-section__header">
          <p className="press-kicker press-kicker--dark">Photos</p>
          <h2 className="press-section__title">Press-ready event shots.</h2>
          <p className="press-section__copy">
            Download and use these images for coverage of Hack Club programs and events.
          </p>
        </div>
        <div className="press-photo-grid">
          {photoItems.map((photo) => (
            <figure key={photo.src} className="press-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
              <figcaption>{photo.alt}</figcaption>
            </figure>
          ))}
        </div>
        <a
          className="press-btn press-btn--ghost press-btn--block press-photos-download"
          href="https://assets.hackclub.com/press-photos.zip"
        >
          Download all photos
        </a>
      </section>

      <section className="press-shell press-section" id="logos">
        <div className="press-section__header">
          <p className="press-kicker press-kicker--dark">Logos</p>
          <h2 className="press-section__title">Official Hack Club marks.</h2>
          <p className="press-section__copy">
            Use these official logo files for Hack Club HQ. Stick to SVG, PNG, or PDF. Avoid
            stretching, outlining, or recoloring.
          </p>
        </div>
        <div className="press-logo-grid">
          {logoAssets.map((logo) => (
            <article key={logo.key} className="press-logo-card">
              <div className="press-logo-card__preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetUrl(logo.key, "svg")}
                  alt={logoTitle(logo.key)}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
              <div className="press-logo-card__body">
                <h3>{logoTitle(logo.key)}</h3>
                <div className="press-logo-card__actions">
                  <a className="press-link" href={assetUrl(logo.key, "svg")}>
                    SVG
                  </a>
                  <a className="press-link" href={assetUrl(logo.key, "png")}>
                    PNG
                  </a>
                  <a className="press-link" href={assetUrl(logo.key, "pdf")}>
                    PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="press-shell press-section press-section--cta">
        <div className="press-cta">
          <div>
            <p className="press-kicker press-kicker--dark">Need more?</p>
            <h2 className="press-section__title">We can help.</h2>
            <p className="press-section__copy">
              Reach out for photography, event branding, or co-branded work.
            </p>
          </div>
          <div className="press-cta__actions">
            <a className="press-btn press-btn--dark" href="mailto:christina@hackclub.com">
              Contact the team
            </a>
            <a className="press-btn press-btn--ghost" href="https://hackclub.com/brand">
              Brand guide
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .press-page {
          background:
            radial-gradient(circle at 10% 0%, rgba(255, 140, 55, 0.18), transparent 34%),
            radial-gradient(circle at 90% 8%, rgba(236, 55, 80, 0.16), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .press-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .press-kicker {
          margin: 0 0 14px;
          font-family: var(--font-phantom);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }

        .press-kicker--dark {
          color: var(--muted);
        }

        .press-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.36), transparent 32%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.35), transparent 35%),
            linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 45%, var(--red) 100%);
          padding: 120px 0 88px;
        }

        .press-hero__inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(240px, 0.9fr);
          gap: 40px;
          align-items: center;
        }

        .press-hero__copy {
          max-width: 640px;
          color: #fff6eb;
        }

        .press-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(3.2rem, 6.5vw, 5.5rem);
          line-height: 0.92;
          color: #fff6eb;
        }

        .press-hero__lede {
          margin: 24px 0 24px;
          font-family: var(--font-phantom);
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          line-height: 1.5;
          color: rgba(255, 246, 235, 0.86);
        }

        .press-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .press-btn {
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

        .press-btn--dark {
          background: var(--foreground);
          color: var(--background);
        }

        .press-btn--ghost {
          background: rgba(255, 255, 255, 0.12);
          color: #fff6eb;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .press-btn--block {
          margin-top: 24px;
          width: 100%;
        }

        .press-photos-download {
          background: rgba(23, 23, 29, 0.04);
          color: var(--foreground);
          border-color: rgba(23, 23, 29, 0.16);
          box-shadow: none;
        }

        .press-photos-download:hover {
          background: rgba(23, 23, 29, 0.08);
        }

        .press-logo-download {
          margin-bottom: 24px;
        }

        .press-btn:hover {
          transform: scale(1.04);
        }

        .press-hero__stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .press-stat {
          border-radius: 20px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          font-family: var(--font-phantom);
        }

        .press-stat span {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff6eb;
        }

        .press-stat p {
          margin: 6px 0 0;
          font-size: 0.9rem;
          color: rgba(255, 246, 235, 0.8);
        }

        .press-hero__panel {
          display: grid;
          gap: 18px;
        }

        .press-hero__card {
          border-radius: 26px;
          padding: 20px 22px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.2);
          display: grid;
          gap: 12px;
        }

        .press-hero__card p {
          margin: 0;
          font-family: var(--font-phantom);
          font-weight: 700;
          color: #17171d;
        }

        .press-hero__card ul {
          margin: 0;
          padding-left: 20px;
          list-style: disc;
          list-style-position: outside;
          font-family: var(--font-phantom);
          color: rgba(23, 23, 29, 0.78);
          line-height: 1.5;
        }

        .press-hero__card--accent {
          background: linear-gradient(135deg, #fff4e8, #ffd7c4);
        }

        .press-contact__name {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-size: 1.6rem;
          font-weight: 400;
          color: #17171d;
        }

        .press-hero__card--accent span {
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: rgba(23, 23, 29, 0.7);
        }

        .press-hero__card--accent a {
          font-family: var(--font-phantom);
          color: #ec3750;
          font-weight: 700;
          text-decoration: none;
        }

        .press-hero__grain {
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

        .press-section {
          padding: 72px 0 0;
        }

        .press-section__header {
          max-width: 860px;
          margin-bottom: 28px;
        }

        .press-section__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2.1rem, 4vw, 3.2rem);
          line-height: 0.96;
        }

        .press-section__copy {
          margin: 16px 0 0;
          font-family: var(--font-phantom);
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--muted);
        }

        .press-callout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          border-radius: 30px;
          padding: 28px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(91, 52, 18, 0.12);
        }

        .press-callout h3 {
          margin: 0 0 8px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: 2rem;
        }

        .press-callout p {
          margin: 0;
          font-family: var(--font-phantom);
          color: var(--muted);
        }

        .press-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .press-photo {
          margin: 0;
          border-radius: 24px;
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 20px 44px rgba(91, 52, 18, 0.1);
          display: grid;
        }

        .press-photo img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }

        .press-photo figcaption {
          padding: 14px 16px 18px;
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: var(--muted);
        }

        .press-logo-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .press-logo-card {
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
          box-shadow: 0 18px 40px rgba(91, 52, 18, 0.08);
          display: grid;
          grid-template-rows: 160px 1fr;
        }

        .press-logo-card__preview {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          min-height: 160px;
          background: linear-gradient(135deg, #fff7ef, #fff0e5);
        }

        .press-logo-card__preview img {
          max-width: 180px;
          max-height: 100px;
          height: auto;
          width: auto;
          object-fit: contain;
        }

        .press-logo-card__body {
          padding: 16px 18px 18px;
          display: grid;
          gap: 8px;
        }

        .press-logo-card__body h3 {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1rem;
          font-weight: 700;
        }

        .press-logo-card__actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .press-link {
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

        .press-section--cta {
          padding: 72px 0 140px;
        }

        .press-cta {
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

        .press-cta__actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .press-cta .press-btn--ghost {
          background: var(--surface-hover);
          color: var(--foreground);
          border-color: var(--border);
          box-shadow: none;
        }

        .press-cta .press-btn--ghost:hover {
          background: var(--surface-hover);
        }

        .press-page > .site-footer {
          margin-top: 140px;
        }

        @media (max-width: 1100px) {
          .press-hero__inner,
          .press-photo-grid,
          .press-logo-grid,
          .press-cta {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .press-shell {
            width: calc(100vw - 32px);
          }

          .press-hero {
            padding: 110px 0 72px;
          }

          .press-hero__stats {
            grid-template-columns: 1fr;
          }

          .press-section--cta {
            padding-bottom: 104px;
          }

          .press-page > .site-footer {
            margin-top: 104px;
          }

          .press-callout {
            grid-template-columns: 1fr;
            padding: 22px;
          }

          .press-photo img {
            height: 200px;
          }

          .press-btn {
            width: 100%;
          }

          .press-cta {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}
