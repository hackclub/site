import { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Jobs — Hack Club",
  description: "Join the Hack Club team. View open positions and apply to work with us.",
  canonical: "/jobs",
});

type JobItem = {
  id: string;
  title: string;
  job_category_name?: string;
  job_post_url: string;
  display_location?: string;
  kind_pretty?: string;
};

type JobsResponse = {
  items: JobItem[];
};

const decodeEntities = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const jobMeta = (job: JobItem) =>
  [job.job_category_name, job.display_location, job.kind_pretty].filter(Boolean).join(" • ");

async function getJobs(): Promise<JobsResponse> {
  const fallback: JobsResponse = { items: [] };

  try {
    const response = await fetch("https://api.polymer.co/v1/hire/organizations/hackclub/jobs", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as JobsResponse;
  } catch {
    return fallback;
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();
  const hasJobs = jobs.items.length > 0;

  return (
    <main id="main" tabIndex={-1} className="jobs-page">
      <section className="jobs-hero">
        <Navbar invertColors />
        <div className="jobs-shell jobs-hero__inner">
          <div className="jobs-hero__copy">
            <h1 className="jobs-hero__title">Join the Hack Club Team</h1>
            <p className="jobs-hero__lede">
              We are a nonprofit building the best programs and adventures for teenage makers around
              the world. If you love making things, you will feel right at home.
            </p>
            <div className="jobs-hero__terminal">
              <span>$ ssh jobs.hackclub.com -p 1337</span>
            </div>
          </div>
        </div>
        <div className="jobs-hero__grain" aria-hidden="true" />
      </section>

      <section className="jobs-shell jobs-section" id="open-roles">
        <div className="jobs-section__header">
          <h2 className="jobs-section__title">Open roles</h2>
        </div>

        <div className="jobs-grid">
          {hasJobs ? (
            jobs.items.map((job) => (
              <a
                key={job.id}
                className="jobs-card"
                href={job.job_post_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="jobs-card__head">
                  <h3>{decodeEntities(job.title)}</h3>
                  <span aria-hidden="true">↗</span>
                </div>
                <p>{jobMeta(job)}</p>
              </a>
            ))
          ) : (
            <div className="jobs-empty">
              <h3>No open roles at this time. Check back later!</h3>
              <p>
                Interested in working with us? Email us at team@hackclub.com with how you&apos;d
                like to contribute.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        .jobs-page {
          background:
            radial-gradient(circle at 10% 0%, rgba(255, 140, 55, 0.2), transparent 34%),
            radial-gradient(circle at 90% 8%, rgba(236, 55, 80, 0.16), transparent 32%),
            var(--background);
          color: var(--foreground);
        }

        .jobs-shell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .jobs-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.36), transparent 32%),
            radial-gradient(circle at 90% 0%, rgba(255, 140, 55, 0.35), transparent 35%),
            linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 45%, var(--red) 100%);
          padding: 120px 0 88px;
        }

        .jobs-hero__inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          justify-items: center;
        }

        .jobs-hero__copy {
          max-width: 800px;
          color: var(--cream);
          text-align: center;
        }

        .jobs-hero__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(3rem, 6.8vw, 5.6rem);
          line-height: 0.92;
          color: var(--cream);
        }

        .jobs-hero__lede {
          margin: 24px 0 24px;
          font-family: var(--font-phantom);
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          line-height: 1.5;
          color: rgba(255, 246, 235, 0.86);
        }

        .jobs-hero__terminal {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(23, 23, 29, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: #9affc0;
        }

        .jobs-hero__grain {
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

        .jobs-section {
          padding: 72px 0 96px;
        }

        .jobs-section__header {
          max-width: 860px;
          margin-bottom: 28px;
        }

        .jobs-section__title {
          margin: 0;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: clamp(2.1rem, 4vw, 3.2rem);
          line-height: 0.96;
        }


        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .jobs-card {
          border-radius: 24px;
          padding: 20px 22px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 18px 40px rgba(91, 52, 18, 0.08);
          text-decoration: none;
          color: inherit;
          display: grid;
          gap: 10px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .jobs-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 24px 50px rgba(91, 52, 18, 0.12);
        }

        .jobs-card__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .jobs-card__head h3 {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .jobs-card__head span {
          font-size: 1.2rem;
          color: var(--red);
        }

        .jobs-card p {
          margin: 0;
          font-family: var(--font-phantom);
          font-size: 0.95rem;
          color: var(--muted);
        }

        .jobs-empty {
          grid-column: 1 / -1;
          border-radius: 28px;
          padding: 28px;
          text-align: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          color: var(--muted);
        }

        .jobs-empty h3 {
          margin: 0 0 8px;
          font-family: var(--font-zarathustra);
          font-weight: 400;
          font-size: 1.8rem;
        }

        .jobs-empty p {
          margin: 0;
          font-family: var(--font-phantom);
        }

        @media (max-width: 1100px) {
          .jobs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .jobs-shell {
            width: calc(100vw - 32px);
          }

          .jobs-hero {
            padding: 110px 0 72px;
          }

          .jobs-card {
            border-radius: 24px;
            padding: 20px;
          }
        }
      `}</style>
    </main>
  );
}
