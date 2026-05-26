import { Icon } from "./Icon";
import Image from "next/image";
import Link from "next/link";

const footerLinkStyles = {
  fontWeight: 400,
  fontSize: 16,
  color: "#fff",
  textDecoration: "none",
  opacity: 0.8,
  transition: "opacity 0.15s",
  display: "inline-block",
} as const;

const sectionHeadingStyles = {
  fontWeight: 700,
  fontSize: 20,
  color: "#fff",
  margin: 0,
  marginBottom: 16,
  lineHeight: 1.2,
} as const;

const hcLinks = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Our Team & Board", href: "/team" },
  { label: "Jobs", href: "/jobs" },
  { label: "Branding", href: "/brand" },
  { label: "Press Inquiries", href: "/press" },
  { label: "Donate", href: "/philanthropy" },
  { label: "Imprint", href: "/imprint" },
];

const resLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Community Events", href: "https://events.hackclub.com/" },
  { label: "Toolbox", href: "https://toolbox.hackclub.com/" },
  { label: "Clubs", href: "/clubs" },
  { label: "HCB", href: "/fiscal-sponsorship" },
  { label: "Code of Conduct", href: "/conduct" },
  { label: "Safeguarding Policy", href: "/safeguarding" },
  { label: "Privacy & Terms", href: "/privacy-and-terms" },
];

const icons = [
  { label: "GitHub", href: "https://github.com/hackclub", glyph: "github" },
  { label: "YouTube", href: "https://www.youtube.com/c/HackClubHQ", glyph: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/starthackclub", glyph: "instagram" },
  { label: "Email", href: "mailto:team@hackclub.com", glyph: "email" },
];

const sha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "dev";

function isExternal(href: string) {
  return href.startsWith("http");
}

function LinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div style={title === "Resources" ? { minWidth: 140 } : undefined}>
      <p style={sectionHeadingStyles}>{title}</p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {links.map((l) => (
          <li key={l.label}>
            {isExternal(l.href) ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={footerLinkStyles}
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="footer-link" style={footerLinkStyles}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer"
      style={{
        background: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), #000`,
        backgroundSize: "50px 50px",
        color: "#fff",
        paddingTop: 80,
        paddingBottom: 60,
        paddingLeft: "clamp(24px, 6vw, 80px)",
        paddingRight: "clamp(24px, 6vw, 80px)",
        fontFamily: "var(--font-phantom)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="cat-playground">
        <div className="cat-wrapper cat-runner">
          <div className="smooth-cat">
            <div className="cat-head">
              <div className="cat-ear left"></div>
              <div className="cat-ear right"></div>
              <div className="cat-eye left"></div>
              <div className="cat-eye right"></div>
              <div className="cat-snout"></div>
            </div>
            <div className="cat-body">
              <div className="cat-leg front-left"></div>
              <div className="cat-leg front-right"></div>
              <div className="cat-leg back-left"></div>
              <div className="cat-leg back-right"></div>
            </div>
            <div className="cat-tail-container">
              <div className="cat-tail-smooth"></div>
            </div>
          </div>
        </div>

        <div className="cat-wrapper cat-chaser">
          <div className="smooth-cat">
            <div className="cat-head">
              <div className="cat-ear left"></div>
              <div className="cat-ear right"></div>
              <div className="cat-eye left"></div>
              <div className="cat-eye right"></div>
              <div className="cat-snout"></div>
            </div>
            <div className="cat-body">
              <div className="cat-leg front-left"></div>
              <div className="cat-leg front-right"></div>
              <div className="cat-leg back-left"></div>
              <div className="cat-leg back-right"></div>
            </div>
            <div className="cat-tail-container">
              <div className="cat-tail-smooth"></div>
            </div>
          </div>
        </div>

        <div className="cat-wrapper cat-pouncer">
          <div className="smooth-cat">
            <div className="cat-head">
              <div className="cat-ear left"></div>
              <div className="cat-ear right"></div>
              <div className="cat-eye left"></div>
              <div className="cat-eye right"></div>
              <div className="cat-snout"></div>
            </div>
            <div className="cat-body">
              <div className="cat-leg front-left"></div>
              <div className="cat-leg front-right"></div>
              <div className="cat-leg back-left"></div>
              <div className="cat-leg back-right"></div>
            </div>
            <div className="cat-tail-container">
              <div className="cat-tail-smooth"></div>
            </div>
          </div>
        </div>

        <div className="cat-wrapper cat-stroller">
          <div className="smooth-cat">
            <div className="cat-head">
              <div className="cat-ear left"></div>
              <div className="cat-ear right"></div>
              <div className="cat-eye left"></div>
              <div className="cat-eye right"></div>
              <div className="cat-snout"></div>
            </div>
            <div className="cat-body">
              <div className="cat-leg front-left"></div>
              <div className="cat-leg front-right"></div>
              <div className="cat-leg back-left"></div>
              <div className="cat-leg back-right"></div>
            </div>
            <div className="cat-tail-container">
              <div className="cat-tail-smooth"></div>
            </div>
          </div>
        </div>
      </div>

      <Image
        className="site-footer-illustration"
        src="/assets/footer.webp"
        alt=""
        width={680}
        height={558}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          transform: "translateY(-40.5%)",
          width: "clamp(340px, 48vw, 680px)",
          height: "auto",
          display: "block",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "48px 64px",
          marginBottom: 64,
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: 0, flexShrink: 0, width: 280 }}
        >
          <div style={{ marginBottom: 28 }}>
            <Link href="/">
              <Image
                src="/assets/hackClubFlag.svg"
                alt="Hack Club"
                width={200}
                height={70}
                style={{ display: "block", objectFit: "contain" }}
              />
            </Link>
          </div>
          <p
            style={{
              fontWeight: 400,
              fontSize: 20,
              color: "#fff",
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            For teens, by teens.
          </p>
          <a
            href="tel:18556254225"
            aria-label="Call Hack Club toll-free at 1-855-625-4225"
            style={{
              fontWeight: 400,
              fontSize: 20,
              color: "#fff",
              margin: 0,
              marginBottom: 32,
              lineHeight: 1.2,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            1-855-625-HACK (call toll-free)
          </a>
          <div style={{ display: "flex", gap: 12 }}>
            {icons.map((i) => (
              <a
                key={i.label}
                href={i.href}
                target={isExternal(i.href) ? "_blank" : undefined}
                rel={isExternal(i.href) ? "noopener noreferrer" : undefined}
                aria-label={i.label}
                className="footer-social-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  background: "transparent",
                  flexShrink: 0,
                  transition: "opacity 0.15s",
                  color: "#fff",
                }}
              >
                <Icon glyph={i.glyph} size={48} />
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", position: "relative", zIndex: 3 }}>
          <LinkCol title="Hack Club" links={hcLinks} />
          <LinkCol title="Resources" links={resLinks} />
        </div>
      </div>

      <div style={{ paddingTop: 32, maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 3 }}>
        <p
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: "#fff",
            opacity: 0.8,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          © {year} Hack Club. Registered under{" "}
          <a
            href="https://the.hackfoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            The Hack Foundation
          </a>
          , a 501(c)(3) nonprofit (EIN: 81-2908499).
          {` Commit ${sha}`}, open source at{" "}
          <a
            href="https://github.com/hackclub/site"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            hackclub/site
          </a>
        </p>
      </div>

      <style>{`
        .footer-link:hover, .footer-link:focus-visible,
        .footer-social-link:hover, .footer-social-link:focus-visible { opacity: 1 !important; }
        @media (max-width: 767px) {
          .site-footer { padding-top: 120px !important; }
          .site-footer-illustration { width: min(320px, 72vw) !important; transform: translateY(-40%) !important; }
        }

        .cat-playground {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 110px;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .cat-wrapper {
          position: absolute;
          bottom: 4px;
          display: flex;
          align-items: flex-end;
          will-change: transform;
        }

        .smooth-cat {
          position: relative;
          width: 52px;
          height: 32px;
        }

        .cat-body {
          position: absolute;
          bottom: 8px;
          left: 10px;
          width: 36px;
          height: 22px;
          background: #ffffff;
          border-radius: 14px 11px 12px 14px;
          box-shadow: inset -3px -3px 0px rgba(0,0,0,0.06);
        }

        .cat-head {
          position: absolute;
          top: -2px;
          left: 0;
          width: 24px;
          height: 22px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: inset -1px -2px 0px rgba(0,0,0,0.06);
          z-index: 2;
        }

        .cat-ear {
          position: absolute;
          top: -5px;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 9px solid #ffffff;
        }
        .cat-ear.left {
          left: 3px;
          transform: rotate(-15deg);
        }
        .cat-ear.right {
          left: 12px;
          transform: rotate(10deg);
        }

        .cat-eye {
          position: absolute;
          top: 9px;
          width: 3px;
          height: 4px;
          background: #23272a;
          border-radius: 50%;
        }
        .cat-eye.left { left: 4px; }
        .cat-eye.right { left: 11px; }

        .cat-snout {
          position: absolute;
          top: 13px;
          left: 7px;
          width: 2px;
          height: 2px;
          background: #ffb6c1;
          border-radius: 50%;
        }

        .cat-leg {
          position: absolute;
          bottom: -8px;
          width: 6px;
          height: 10px;
          background: #ffffff;
          border-radius: 0 0 4px 4px;
          transform-origin: top center;
        }
        .cat-leg.front-left { left: 4px; }
        .cat-leg.front-right { left: 12px; background: #f5f5f5; z-index: -1; }
        .cat-leg.back-left { left: 22px; }
        .cat-leg.back-right { left: 28px; background: #f5f5f5; z-index: -1; }

        .cat-tail-container {
          position: absolute;
          right: -2px;
          top: 10px;
          width: 16px;
          height: 16px;
          transform-origin: left top;
        }

        .cat-tail-smooth {
          width: 18px;
          height: 6px;
          background: #ffffff;
          border-radius: 0 4px 4px 0;
          transform-origin: left center;
          transform: rotate(-20deg);
        }

        .cat-runner {
          animation: moveLeft linear infinite 13s;
        }
        .cat-runner .smooth-cat {
          animation: organicRun 0.22s infinite alternate ease-in-out;
        }
        .cat-runner .cat-leg.front-left, .cat-runner .cat-leg.back-left {
          animation: legTrot 0.22s infinite alternate linear;
        }
        .cat-runner .cat-leg.front-right, .cat-runner .cat-leg.back-right {
          animation: legTrot 0.22s infinite alternate-reverse linear;
        }
        .cat-runner .cat-tail-container {
          animation: tailOrganicWag 0.15s infinite alternate ease-in-out;
        }

        .cat-chaser {
          animation: moveLeft linear infinite 13s;
          animation-delay: -0.8s;
        }
        .cat-chaser .smooth-cat {
          animation: organicRun 0.18s infinite alternate ease-in-out;
        }
        .cat-chaser .cat-leg.front-left, .cat-chaser .cat-leg.back-left {
          animation: legTrot 0.18s infinite alternate linear;
        }
        .cat-chaser .cat-leg.front-right, .cat-chaser .cat-leg.back-right {
          animation: legTrot 0.18s infinite alternate-reverse linear;
        }
        .cat-chaser .cat-tail-container {
          animation: tailOrganicWag 0.12s infinite alternate ease-in-out;
        }

        .cat-pouncer {
          animation: moveLeft linear infinite 18s;
          animation-delay: -4.5s;
        }
        .cat-pouncer .smooth-cat {
          animation: organicPounce 2.4s infinite ease-in-out;
        }
        .cat-pouncer .cat-leg.front-left, .cat-pouncer .cat-leg.front-right {
          animation: frontLegPounce 2.4s infinite ease-in-out;
        }
        .cat-pouncer .cat-leg.back-left, .cat-pouncer .cat-leg.back-right {
          animation: backLegPounce 2.4s infinite ease-in-out;
        }
        .cat-pouncer .cat-tail-container {
          animation: tailOrganicWag 0.4s infinite alternate ease-in-out;
        }

        .cat-stroller {
          animation: moveLeft linear infinite 25s;
          animation-delay: -8s;
        }
        .cat-stroller .smooth-cat {
          animation: organicWalk 0.5s infinite alternate ease-in-out;
        }
        .cat-stroller .cat-leg.front-left, .cat-stroller .cat-leg.back-left {
          animation: legWalk 0.5s infinite alternate linear;
        }
        .cat-stroller .cat-leg.front-right, .cat-stroller .cat-leg.back-right {
          animation: legWalk 0.5s infinite alternate-reverse linear;
        }
        .cat-stroller .cat-tail-container {
          animation: tailOrganicTwitch 4s infinite ease-in-out;
        }

        @keyframes moveLeft {
          0% { transform: translateX(105vw) scaleX(1); }
          100% { transform: translateX(-120px) scaleX(1); }
        }

        @keyframes organicRun {
          0% { transform: translateY(0) scaleY(1) rotate(0deg); }
          100% { transform: translateY(-5px) scaleY(0.95) rotate(-2deg); }
        }

        @keyframes organicWalk {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-2px) rotate(1deg); }
        }

        @keyframes legTrot {
          0% { transform: rotate(-28deg); }
          100% { transform: rotate(28deg); }
        }

        @keyframes legWalk {
          0% { transform: rotate(-18deg); }
          100% { transform: rotate(18deg); }
        }

        @keyframes tailOrganicWag {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(30deg); }
        }

        @keyframes tailOrganicTwitch {
          0%, 85%, 100% { transform: rotate(0deg); }
          88%, 94% { transform: rotate(-25deg); }
          91% { transform: rotate(15deg); }
        }

        @keyframes organicPounce {
          0%, 15%, 55%, 100% { transform: translateY(0) rotate(0deg); }
          22% { transform: translateY(2px) scaleY(0.85) rotate(4deg); }
          32% { transform: translateY(-32px) rotate(-18deg); }
          40% { transform: translateY(0) scaleY(0.9) rotate(5deg); }
          45% { transform: translateY(-3px) rotate(0deg); }
        }

        @keyframes frontLegPounce {
          0%, 15%, 55%, 100% { transform: rotate(0deg); }
          22% { transform: rotate(20deg); }
          32% { transform: rotate(-45deg); }
          40% { transform: rotate(15deg); }
        }

        @keyframes backLegPounce {
          0%, 15%, 55%, 100% { transform: rotate(0deg); }
          22% { transform: rotate(-15deg); }
          32% { transform: rotate(35deg); }
          40% { transform: rotate(-10deg); }
        }
      `}</style>
    </footer>
  );
}
