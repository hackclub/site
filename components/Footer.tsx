"use client";

import { useTranslations } from "next-intl";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const footerLinkStyles = {
  fontWeight: 400,
  fontSize: 16,
  color: "var(--paper)",
  textDecoration: "none",
  opacity: 0.8,
  transition: "opacity 0.15s",
  display: "inline-block",
} as const;
const sectionHeadingStyles = {
  fontWeight: 700,
  fontSize: 20,
  color: "var(--paper)",
  margin: 0,
  marginBottom: 16,
  lineHeight: 1.2,
} as const;
const u = { color: "var(--paper)", textDecoration: "underline", textUnderlineOffset: 2 } as const;

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
    <div style={title === "Resources" || title === "Ресурсы" ? { minWidth: 140 } : undefined}>
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
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const hcLinks = [
    { label: t("philosophy"), href: "/philosophy" },
    { label: t("teamBoard"), href: "/team" },
    { label: t("jobs"), href: "/jobs" },
    { label: t("branding"), href: "/brand" },
    { label: t("press"), href: "/press" },
    { label: t("donate"), href: "/philanthropy" },
    { label: t("imprint"), href: "/imprint" },
  ];

  const resLinks = [
    { label: t("programs"), href: "/programs" },
    { label: t("communityEvents"), href: "https://events.hackclub.com/" },
    { label: t("hackathons"), href: "https://hackathons.hackclub.com/" },
    { label: t("toolbox"), href: "https://toolbox.hackclub.com/" },
    { label: t("clubs"), href: "/clubs" },
    { label: t("hcb"), href: "/fiscal-sponsorship" },
    { label: t("conduct"), href: "/conduct" },
    { label: t("safeguarding"), href: "/safeguarding" },
    { label: t("privacy"), href: "/privacy-and-terms" },
  ];

  return (
    <footer
      className="site-footer"
      style={{
        background: `linear-gradient(90deg, var(--grid-line) 1px, transparent 1px), linear-gradient(var(--grid-line) 1px, transparent 1px), var(--footer-bg)`,
        backgroundSize: "50px 50px",
        color: "var(--paper)",
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
              color: "var(--paper)",
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            {t("tagline")}
          </p>
          <a
            href="tel:18556254225"
            aria-label={t("phoneLabel")}
            style={{
              fontWeight: 400,
              fontSize: 20,
              color: "var(--paper)",
              margin: 0,
              marginBottom: 32,
              lineHeight: 1.2,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {t("phone")}
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
                  color: "var(--paper)",
                }}
              >
                <Icon glyph={i.glyph} size={48} />
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <LinkCol title={t("hackClub")} links={hcLinks} />
          <LinkCol title={t("resources")} links={resLinks} />
        </div>
      </div>

      <div
        style={{
          paddingTop: 32,
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: "var(--paper)",
            opacity: 0.8,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {t("copyright", { year })}{" "}
          <a
            href="https://the.hackfoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={u}
          >
            {t("hackFoundation")}
          </a>
          {t("nonprofit")}
          {` ${t("commit", { sha })}`}
          {t("openSourceAt")}{" "}
          <a
            href="https://github.com/hackclub/site"
            target="_blank"
            rel="noopener noreferrer"
            style={u}
          >
            hackclub/site
          </a>
        </p>
        <ThemeToggle variant="footer" />
      </div>

      <style>{`
        .footer-link:hover, .footer-link:focus-visible,
        .footer-social-link:hover, .footer-social-link:focus-visible,
        .footer-theme-toggle:hover, .footer-theme-toggle:focus-visible { opacity: 1 !important; }
        @media (max-width: 767px) {
          .site-footer { padding-top: 120px !important; }
          .site-footer-illustration { width: min(320px, 72vw) !important; transform: translateY(-40%) !important; }
        }
      `}</style>
    </footer>
  );
}
