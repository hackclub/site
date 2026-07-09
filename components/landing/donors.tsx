import Image from "next/image";
import Link from "next/link";
import { BtnArrowSvg } from "./btn-arrow";

const donors = [
  {
    src: "https://cdn.hackclub.com/019db857-4e1c-7b22-9252-78c368e53eef/donorGithub.webp",
    width: 147,
    height: 147,
    invert: true,
  },
  {
    src: "https://cdn.hackclub.com/019e64cd-d05f-7436-9d0d-ae814369415f/amd.webp",
    width: 821,
    height: 197,
    invert: true,
  },
  {
    src: "https://cdn.hackclub.com/019db857-53a5-7e88-809e-45709e065277/donorMIT.webp",
    width: 125,
    height: 159,
    invert: true,
  },
  {
    src: "https://cdn.hackclub.com/019db857-5624-7ffb-ae4c-132aabbbe537/donorLogoMasked.webp",
    width: 143,
    height: 143,
  },
  {
    src: "https://cdn.hackclub.com/019db857-58db-7e5d-823d-ba7651096cd6/donorLogo4.webp",
    width: 248,
    height: 161,
  },
];

const donorNames = [
  "Musk Foundation",
  "Michael Dell (CEO of Dell)",
  "Dr. Lisa Su (CEO of AMD)",
  "Tobi Lutke (CEO of Shopify)",
  "Tom Preston-Werner (Co-founder of GitHub)",
];

export function DonorsSection({ minimal }: { minimal?: boolean } = {}) {
  return (
    <section
      className="section-padded"
      style={{
        position: "relative",
        background: "var(--background)",
        paddingTop: 80,
        paddingBottom: minimal ? 40 : 160,
        paddingLeft: "clamp(24px, 14.29%, 220px)",
        paddingRight: "clamp(24px, 14.29%, 220px)",
        textAlign: "center",
      }}
    >
      {!minimal && (
        <>
          {/* Red gradient background — bottom portion only */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background:
                "linear-gradient(0deg, rgba(236,55,80,0.40) 0%, rgba(236,55,80,0.04) 75%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          {/* Two-layer wave at gradient boundary — matches HeroSection WaveDivider style */}
          <div
            className="wave-container"
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            {/* Thin stroke wave on top */}
            <svg
              viewBox="0 0 1920 22"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 22, display: "block", marginBottom: -8 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
                fill="none"
                style={{ stroke: "var(--surface)" }}
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Main white fill wave */}
            <svg
              viewBox="0 0 1920 40"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 40, display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
                style={{ fill: "var(--surface)" }}
              />
            </svg>
          </div>
        </>
      )}
      {/* Headline */}
      <h2
        style={{
          fontFamily: "var(--font-zarathustra)",
          fontSize: 40,
          fontWeight: "normal",
          lineHeight: 0.9,
          color: "var(--foreground)",
          margin: "48px auto 32px",
          whiteSpace: "nowrap",
        }}
        className="donors-headline"
      >
        Supported by people who believe in teens.
      </h2>

      {/* Subtext — "free for every teenager" */}
      <p
        style={{
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          fontWeight: "normal",
          color: "var(--foreground)",
          margin: "0 auto 40px",
          maxWidth: 560,
          lineHeight: 1.2,
        }}
      >
        Hack Club is free for every teenager, forever.
      </p>

      {/* Donor logo wall — static and larger */}
      <div
        className="donor-logos-grid"
        style={{
          display: "flex",
          flexWrap: minimal ? "nowrap" : "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(24px, 3.5vw, 52px)",
          maxWidth: minimal ? "100%" : 1080,
          margin: "0 auto 24px",
          padding: "8px 0",
          overflowX: minimal ? "auto" : undefined,
        }}
      >
        {donors.map((donor, i) => (
          <div
            key={i}
            className="donor-logo-item"
            style={{
              width: donor.width * 0.9,
              height: donor.height * 0.9,
              maxWidth: 240,
              maxHeight: 170,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={donor.src}
              alt="Donor logo"
              width={donor.width}
              height={donor.height}
              className={donor.invert ? "donor-logo-image--invert" : undefined}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Donor name pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginBottom: 48,
          maxWidth: 980,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {donorNames.map((name) => (
          <div
            key={name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--surface-hover)",
              borderRadius: 9999,
              minHeight: 40,
              paddingLeft: 20,
              paddingRight: 20,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-phantom)",
                fontSize: 16,
                color: "var(--foreground)",
                fontWeight: "normal",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Subtext block with red spans */}
      <div
        style={{
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          color: "var(--foreground)",
          margin: "0 auto 36px",
          maxWidth: 720,
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 0" }}>
          {"Hack Club is a 501(c)(3) nonprofit. Our finances are fully open — anyone can "}
          <a
            href="https://hcb.hackclub.com/hq"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--red)", textDecoration: "underline" }}
          >
            see exactly how money is spent.
          </a>
        </p>
        <p style={{ margin: "0.75em 0 0" }}>
          {"If you believe in what we're building, "}
          <Link href="/philanthropy" style={{ color: "var(--red)", textDecoration: "underline" }}>
            {"we'd love your support."}
          </Link>
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/philanthropy"
        className="cta-btn dark-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          lineHeight: 1,
          background: "var(--foreground)",
          color: "var(--background)",
          borderRadius: 41,
          height: 48,
          paddingLeft: 32,
          paddingRight: 32,
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          fontWeight: "normal",
          textDecoration: "none",
          whiteSpace: "nowrap",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
          marginBottom: 80,
        }}
      >
        Learn more &amp; donate
        <BtnArrowSvg />
      </Link>

      <style>{`
        html.dark .donor-logo-image--invert {
          filter: invert(1);
        }

        @media (max-width: 900px) {
          .donor-logo-item {
            width: min(140px, 28vw) !important;
            height: min(120px, 24vw) !important;
          }
        }
        @media (max-width: 900px) {
          .donors-headline {
            font-size: clamp(26px, 3.2vw, 44px) !important;
            white-space: normal !important;
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>
    </section>
  );
}
