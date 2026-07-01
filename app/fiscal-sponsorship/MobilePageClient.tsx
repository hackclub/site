import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeLock } from "@/components/ThemeToggle";
import { Icon } from "@/components/Icon";

export default function MobilePageClient() {
  return (
    <>
      <ThemeLock />
      <main id="main" tabIndex={-1} className="mobile-page">
        <section className="mobile-hero">
          <Navbar invertColors />
          <div className="mobile-shell mobile-hero__inner">
            <h1 className="mobile-hero__title">
              <Link href="/fiscal-sponsorship" className="mobile-hero__link">
                <span>HCB</span>
              </Link>{" "}
              Mobile is here!
            </h1>
            <h2 className="mobile-hero__subtitle">
              Manage your HCB organizations on the go. Issue cards, view transactions, and more!
            </h2>
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
              <div className="mobile-pill">Dec 2, 2025</div>
            </div>

            <article className="mobile-article">
              <p>
                I&apos;m Mohamad, a 17-year-old from the SF Bay Area, and I just shipped the
                official mobile app for HCB.
              </p>

              <p>
                If you haven&apos;t heard of it, HCB is the financial backbone for over{" "}
                <strong>6,500 teenager-led nonprofits</strong>, clubs, and hackathons. We provide{" "}
                <strong>501(c)(3) nonprofit</strong> status, access to a bank account, a donation
                collection platform, and debit cards for thousands of young people trying to do good
                in their communities.
              </p>

              <p>
                HCB is currently processing an average of <strong>$6 million per month</strong>{" "}
                (over $80M in its lifetime)
                <sup>
                  <a href="#fn-1" id="fnref-1">
                    1
                  </a>
                </sup>
                . For the last year, I&apos;ve led the project to build the first-ever mobile app
                for this entire community.
              </p>

              <p>
                <em>
                  The entire project is open source on{" "}
                  <a href="https://github.com/hackclub/hcb-mobile" target="_blank" rel="noreferrer">
                    GitHub
                  </a>{" "}
                  (we&apos;d love a ⭐️!).
                </em>
              </p>

              <h2>Why build this?</h2>

              <p>
                These teenagers are running run robotics teams, hackathons, and nonprofit projects
                that improve their community. They need a way to manage their organization&apos;s
                finances from their pocket. With HCB Mobile, they&apos;ll be able to:
              </p>

              <ul>
                <li>
                  Track their <strong>organization&apos;s balance</strong> and transactions on the
                  go.
                </li>
                <li>
                  Accept in-person <strong>tap-to-pay donations</strong>, perfect for an in-person
                  fundraiser or event! No extra hardware required. Just tap any credit/debit card
                  against your phone.
                </li>
                <li>
                  <strong>Issue new debit cards</strong>, add them to{" "}
                  <strong>Apple / Google Wallet</strong>, and freeze or cancel them directly from
                  their phone.
                </li>
                <li>
                  <strong>Upload receipts</strong> directly from their device or match existing
                  receipts in Receipt Bin to transactions with a tap.
                </li>
              </ul>

              <h2>The Technical Stuff</h2>

              <p>
                When I started working on this app, I wanted to build in native code like{" "}
                <strong>SwiftUI</strong> for iOS and <strong>Kotlin/Jetpack Compose</strong> for
                Android. However, I realized that it would be a pain for me, a{" "}
                <strong>full-time student</strong> with classes, to handle two codebases. I&apos;d
                have to duplicate every feature I created for one OS to the other and deal with all
                the integration issues along the way. Then, I discovered <strong>Expo</strong> (a
                React Native framework) which allowed me to write one app that worked on multiple
                devices. Working with Expo, I learned about creating my own Expo Modules (to bridge
                native code features to Typescript) and optimization methods like memoization and
                component recycling.
              </p>

              <p>
                The non-code side of this app was <em>no joke</em>, either. I had to work with the
                Apple and Google app review teams to obtain <strong>restricted entitlements</strong>{" "}
                for features like mobile <strong>tap-to-pay terminal provisioning</strong> (made
                possible by Stripe) and <strong>push provisioning</strong> (which allows users to
                add cards to their payment wallet directly from HCB Mobile). It took several months
                and many back-and-forth email chains to finally get the entitlements we needed.
              </p>

              <p>
                After over 250 hours of development work, I can say that I&apos;m incredibly proud
                of HCB Mobile because it&apos;s <strong>built by teenagers</strong> to make it
                easier for teenagers like me to run nonprofit organizations and projects with HCB.
                Beyond teenagers, HCB also supports hundreds of adult-ran organizations such as
                mutual aid groups, open source projects, and community spaces.
              </p>

              <div className="mobile-article__spacer" aria-hidden="true" />

              <h2>Download the app!</h2>

              <div className="mobile-badges">
                <a
                  href="https://apps.apple.com/us/app/hcb-by-hack-club/id6465424810"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download HCB on the App Store"
                >
                  <Image
                    src="/fiscal-sponsorship/apple-web-badge.svg"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.hackclub.hcb"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Get HCB on Google Play"
                >
                  <Image
                    src="/fiscal-sponsorship/google-play-web-badge.webp"
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                  />
                </a>
              </div>

              <ol className="mobile-footnotes">
                <li id="fn-1">
                  <em>
                    This amount is excluding HQ (our own){" "}
                    <a href="https://hcb.hackclub.com/hq" target="_blank" rel="noreferrer">
                      finances
                    </a>
                    .
                  </em>{" "}
                  <a href="#fnref-1" aria-label="Back to reference">
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
              <h2 className="mobile-cta__title">Looking to start a nonprofit?</h2>
              <p className="mobile-cta__body">
                We&apos;re accepting applications! No startup fees, no minimum balance, and no long
                wait time.
              </p>
              <div className="mobile-cta__actions">
                <Link
                  href="/fiscal-sponsorship"
                  className="mobile-cta__button mobile-cta__button--cyan"
                >
                  Learn more
                </Link>
                <a
                  href="https://nonprofit.new"
                  className="mobile-cta__button mobile-cta__button--orange"
                >
                  Apply now
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
