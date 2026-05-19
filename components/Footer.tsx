import { Icon } from "./Icon";
import Image from "next/image";
import Link from "next/link";

const lnk = {
  fontWeight: 400,
  fontSize: 16,
  color: "#fff",
  textDecoration: "none",
  opacity: 0.8,
  transition: "opacity 0.15s",
  display: "inline-block",
} as const;
const h = {
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

function ext(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function LinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div style={title === "Resources" ? { minWidth: 140 } : undefined}>
      <p style={h}>{title}</p>
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
            {ext(l.href) ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={lnk}
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="footer-link" style={lnk}>
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
        overflow: "visible",
      }}
    >
      <Image
        className="site-footer-illustration"
        src="/assets/footer.webp"
        alt="footer illustration"
        loading="lazy"
        width={2048}
        height={1680}
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
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: 0, flexShrink: 0, width: 280 }}
        >
          <div style={{ marginBottom: 28 }}>
            <Image
              src="/assets/hackClubFlag.svg"
              alt="Hack Club"
              width={200}
              height={70}
              style={{ display: "block", objectFit: "contain" }}
            />
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
                target={ext(i.href) ? "_blank" : undefined}
                rel={ext(i.href) ? "noopener noreferrer" : undefined}
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
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <LinkCol title="Hack Club" links={hcLinks} />
          <LinkCol title="Resources" links={resLinks} />
        </div>
      </div>

      <div style={{ paddingTop: 32, maxWidth: 1200, margin: "0 auto" }}>
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
          © 2026 Hack Club. Registered under{" "}
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
          .site-footer-illustration { width: min(320px, 72vw) !important; height: auto !important; transform: translateY(-40%) !important; }
        }
      `}</style>
    </footer>
  );
}
