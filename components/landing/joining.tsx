"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { BtnArrowSvg } from "./btn-arrow";

type SlackStat = {
  value: number;
  label: string;
  icon: "online" | "channels" | "messages" | "members";
};

const DIGIT_HEIGHT_PX = 24;

type SlackApiSnapshot = {
  readers_count_1d: number;
  chats_channels_count_1d: number;
  messages_count_1d: number;
  total_members_count: number;
};

type SlackApiResponse = {
  stats?: SlackApiSnapshot[];
};

const cardWrapStyle: CSSProperties = { position: "relative", borderRadius: 16 };
const cardBgClipStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 16,
  overflow: "hidden",
  pointerEvents: "none",
};
const cardBgImageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};
const cardOverlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
};
const cardContentStyle: CSSProperties = {
  position: "relative",
  zIndex: 1,
  padding: "32px 44px 32px",
};
const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};
const cardTitleStyle: CSSProperties = {
  fontFamily: "var(--font-zarathustra)",
  fontSize: 40,
  fontWeight: "normal",
  lineHeight: 1,
  color: "var(--paper)",
  margin: 0,
};
const cardBodyStyle: CSSProperties = {
  fontFamily: "var(--font-phantom)",
  fontSize: 20,
  color: "var(--paper)",
  margin: 0,
  lineHeight: 1.2,
};
const cardBodyGapStyle: CSSProperties = { ...cardBodyStyle, margin: "1em 0 0" };
const cardCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 20,
  paddingRight: 20,
  height: 44,
  background: "var(--red)",
  color: "var(--paper)",
  borderRadius: 32,
  fontFamily: "var(--font-phantom)",
  fontSize: 20,
  fontWeight: "normal",
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  marginTop: 16,
  lineHeight: 1,
  gap: 8,
};

async function getSlackStats(): Promise<SlackStat[] | null> {
  try {
    const response = await fetch("https://slack-data.hackclub.dev/full", {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = (await response.json()) as SlackApiResponse;
    const latest = data.stats?.[data.stats.length - 1];

    if (!latest) return null;

    return [
      {
        value: latest.readers_count_1d,
        label: "Currently Online",
        icon: "online",
      },
      {
        value: latest.chats_channels_count_1d,
        label: "Total Channels",
        icon: "channels",
      },
      {
        value: latest.messages_count_1d,
        label: "Daily Messages",
        icon: "messages",
      },
      {
        value: latest.total_members_count,
        label: "Total Members",
        icon: "members",
      },
    ];
  } catch {
    return null;
  }
}

function CardBg({ src }: { src: string }) {
  return (
    <div style={cardBgClipStyle}>
      <Image src={src} alt="" fill sizes="100vw" style={cardBgImageStyle} />
      <div style={cardOverlayStyle} />
    </div>
  );
}

function CardCta({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} style={cardCtaStyle} className="cta-btn">
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, lineHeight: 1 }}>
        {children}{" "}
        <span
          className="btn-arrow"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <BtnArrowSvg />
        </span>
      </span>
    </Link>
  );
}

function IconGlyph({ icon }: { icon: SlackStat["icon"] }) {
  const iconColor = "var(--foreground)";
  const wrap: CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  if (icon === "online") {
    return (
      <span style={wrap} aria-hidden>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="5.2" stroke={iconColor} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.25" fill={iconColor} />
        </svg>
      </span>
    );
  }

  if (icon === "channels") {
    return (
      <span style={wrap} aria-hidden>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path d="M10 3.8L8.8 20.2" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15.2 3.8L14 20.2" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3.8 10H20.2" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3.8 15.2H20.2" stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (icon === "messages") {
    return (
      <span style={wrap} aria-hidden>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M6.1 5.7H17.9C18.9 5.7 19.7 6.5 19.7 7.5V14.6C19.7 15.6 18.9 16.4 17.9 16.4H10.6L6.1 19V7.5C6.1 6.5 5.1 5.7 6.1 5.7Z"
            stroke={iconColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="9.4" cy="11" r="1" fill={iconColor} />
          <circle cx="12" cy="11" r="1" fill={iconColor} />
          <circle cx="14.6" cy="11" r="1" fill={iconColor} />
        </svg>
      </span>
    );
  }

  return (
    <span style={wrap} aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <circle cx="9.5" cy="9.2" r="2.7" stroke={iconColor} strokeWidth="1.8" />
        <circle cx="15.9" cy="10.4" r="2.1" stroke={iconColor} strokeWidth="1.8" opacity="0.78" />
        <path
          d="M4.8 18.8C5.3 15.9 7.5 14.3 9.9 14.3C12.3 14.3 14.6 15.9 15.1 18.8"
          stroke={iconColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M13.9 18.2C14.1 16.6 15.5 15.5 17 15.5C18.4 15.5 19.7 16.6 19.9 18.2"
          stroke={iconColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.78"
        />
      </svg>
    </span>
  );
}

function OdometerNumber({
  value,
  animate,
  baseDelay,
}: {
  value: number;
  animate: boolean;
  baseDelay: number;
}) {
  const formatted = value.toLocaleString("en-US");
  const chars = formatted.split("");
  const totalDigits = chars.filter((char) => /\d/.test(char)).length;
  const digitIndexes = chars.flatMap((char, index) => (/\d/.test(char) ? [index] : []));

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        minWidth: `${formatted.length * 0.62}em`,
        position: "relative",
      }}
    >
      <span
        aria-hidden="true"
        style={{ display: "inline-flex", alignItems: "center", lineHeight: 1 }}
      >
        {chars.map((char, charIndex) => {
          if (!/\d/.test(char)) {
            return (
              <span
                key={`sep-${charIndex}`}
                style={{
                  width: "0.34em",
                  textAlign: "center",
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(4px)",
                  transition: `opacity 200ms ease-out ${baseDelay + 120}ms, transform 240ms cubic-bezier(0.23, 1, 0.32, 1) ${baseDelay + 120}ms`,
                }}
                aria-hidden
              >
                {char}
              </span>
            );
          }

          const targetDigit = Number(char);
          const digitPosition = digitIndexes.indexOf(charIndex);
          const digitPlaceFromRight = totalDigits - digitPosition - 1;
          const loops = Math.max(2, 4 - Math.floor(digitPlaceFromRight / 2));
          const finalStep = loops * 10 + targetDigit;
          const wheel = Array.from({ length: finalStep + 1 }, (_, idx) => idx % 10);

          return (
            <span
              key={`digit-${charIndex}`}
              style={{
                width: "0.62em",
                height: `${DIGIT_HEIGHT_PX}px`,
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
              aria-hidden
            >
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  transform: animate
                    ? `translateY(-${finalStep * DIGIT_HEIGHT_PX}px)`
                    : "translateY(0)",
                  transition: `transform ${700 + digitPlaceFromRight * 130}ms cubic-bezier(0.19, 1, 0.22, 1) ${baseDelay + digitPosition * 60}ms`,
                  willChange: "transform",
                }}
              >
                {wheel.map((digit, wheelIdx) => (
                  <span
                    key={`wheel-${charIndex}-${wheelIdx}`}
                    style={{
                      height: `${DIGIT_HEIGHT_PX}px`,
                      lineHeight: `${DIGIT_HEIGHT_PX}px`,
                      textAlign: "center",
                    }}
                  >
                    {digit}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      <span style={srOnly}>{formatted}</span>
    </span>
  );
}

function SlackStatBadge({
  icon,
  label,
  value,
  animate,
  delay,
}: {
  icon: SlackStat["icon"];
  label: string;
  value: number;
  animate: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "var(--background)",
        border: "1px solid var(--border)",
        borderRadius: 52,
        height: 50,
        paddingLeft: 14,
        paddingRight: 24,
        whiteSpace: "nowrap",
        flexShrink: 0,
        minWidth: 260,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateX(0)" : "translateX(12px)",
        transition: `opacity 240ms ease-out ${delay}ms, transform 280ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      }}
    >
      <IconGlyph icon={icon} />
      <span
        style={{
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          color: "var(--foreground)",
          fontWeight: "normal",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <OdometerNumber value={value} animate={animate} baseDelay={delay} />
        <span>{label}</span>
      </span>
    </div>
  );
}

function InlineSlackStatsBadges({ stats }: { stats: SlackStat[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element || hasEnteredView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredView]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {stats.map((stat, idx) => (
        <SlackStatBadge
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          animate={hasEnteredView}
          delay={idx * 55}
        />
      ))}
    </div>
  );
}

export function JoiningSection() {
  const [slackStats, setSlackStats] = useState<SlackStat[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getSlackStats().then((nextStats) => {
      if (!cancelled) setSlackStats(nextStats);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      style={{
        background: "var(--surface)",
        paddingTop: 80,
        paddingBottom: 48,
        position: "relative",
      }}
    >
      {/* Creature1 — right side, centered on top wave */}
      <Image
        src={"/assets/creature1.webp"}
        alt=""
        width={544}
        height={544}
        style={{
          position: "absolute",
          right: 0,
          top: -22,
          width: "calc(544 / 1920 * 100vw)",
          height: "auto",
          transform: "translateY(calc(-50% - 8px))",
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      {/* Wavy top border — matches HeroSection WaveDivider exactly */}
      <div
        className="wave-container"
        style={{
          position: "absolute",
          top: -54,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 25,
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
        {/* Main fill wave */}
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
      <div
        className="section-padded"
        style={{
          maxWidth: 1366,
          margin: "0 auto",
          paddingLeft: "clamp(24px, 14.29%, 195px)",
          paddingRight: "clamp(24px, 14.29%, 195px)",
        }}
      >
        {/* Section headline */}
        <h2
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontSize: 40,
            fontWeight: "normal",
            lineHeight: 0.9,
            color: "var(--foreground)",
            margin: "0 0 20px",
            width: 1022,
            maxWidth: "100%",
          }}
        >
          Everything that comes with joining.
        </h2>

        {/* Sub-headline */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            color: "var(--foreground)",
            margin: "0 0 48px",
            lineHeight: 1.2,
          }}
        >
          {
            "Hack Club isn\u2019t just events \u2014 here\u2019s what you get as part of the community."
          }
        </p>

        {/* Cards stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {/* ── Card 1: Our online community ── */}
          <div style={{ ...cardWrapStyle, overflow: "visible" }}>
            {/* Background + overlay clipped to rounded corners */}
            <CardBg
              src={
                "https://cdn.hackclub.com/019db857-6029-75d8-b74b-1de86e95a794/joiningCard1Bg.webp"
              }
            />

            {/* Content — normal flow so card shrinks to fit */}
            <div
              className="joining-card1-content"
              style={{
                position: "relative",
                zIndex: 1,
                padding: "32px 44px 32px",
                maxWidth: "calc(100% - 260px)",
              }}
            >
              {/* Icon + title row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 12,
                }}
              >
                <Image
                  src={
                    "https://cdn.hackclub.com/019db857-62cb-75fb-99e3-8b7813b65ac9/joiningCard1Icon.webp"
                  }
                  alt="Slack"
                  width={40}
                  height={40}
                  style={{
                    objectFit: "contain",
                    borderRadius: 12,
                    flexShrink: 0,
                    marginRight: 8,
                  }}
                />
                <h3 style={cardTitleStyle}>Our online community</h3>
              </div>

              {/* Body text */}
              <p style={cardBodyStyle}>
                Chat, collaborate, and hang out with tens of thousands of teen makers from around
                the world. Find people working on the same weird projects as you, get help when
                you&rsquo;re stuck, or just #lounge.
              </p>
              <p style={cardBodyGapStyle}>
                We also host AMAs with people like Sal Khan, George Hotz, and Lady Ada &mdash;
                people we really wanted to talk to, so we just invited them.
              </p>
              {/* CTA Button */}
              <CardCta href="https://slack.hackclub.com/">Join the Slack</CardCta>
            </div>

            {/* Slack stats badges — overflow off right edge, hidden on mobile */}
            {slackStats && (
              <div
                className="joining-slack-stats"
                style={{
                  position: "absolute",
                  right: -60,
                  top: 32,
                  bottom: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <InlineSlackStatsBadges stats={slackStats} />
              </div>
            )}
          </div>

          {/* ── Card 2: HCB ── */}
          <div style={{ ...cardWrapStyle, overflow: "visible" }}>
            {/* Background + overlay clipped to rounded corners */}
            <CardBg
              src={
                "https://cdn.hackclub.com/019db857-6649-7f66-9184-21b9f538728a/joiningCard2Bg.webp"
              }
            />

            {/* Right decorative image — hangs off right edge, hidden on mobile */}
            <Image
              src={
                "https://cdn.hackclub.com/019db857-6b76-7bfa-acda-8bf66cb16dc4/joiningCard2Right.webp"
              }
              alt=""
              className="joining-card2-deco"
              width={380}
              height={216}
              style={{
                position: "absolute",
                right: -60,
                top: 110,
                objectFit: "cover",
                zIndex: 1,
              }}
            />

            {/* Content — normal flow */}
            <div className="joining-card-content" style={{ ...cardContentStyle, zIndex: 2 }}>
              {/* Icon + title — full width since image is below the header */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <Image
                  src={
                    "https://cdn.hackclub.com/019db857-688f-7536-9ec3-5033f559b7e8/joiningCard2Icon.webp"
                  }
                  alt="HCB"
                  width={50}
                  height={50}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <h3 style={cardTitleStyle}>HCB &mdash; run your event like a nonprofit</h3>
              </div>
              {/* Body text — constrained to leave room for right image */}
              <div className="joining-card2-body" style={{ maxWidth: "calc(100% - 340px)" }}>
                <p style={cardBodyStyle}>
                  Got an idea for a hackathon, club, or event? HCB gives your team the financial
                  tools to accept donations, manage money, and operate under a real 501(c)(3)
                  umbrella &mdash; no paperwork nightmare.
                </p>
                <p style={cardBodyGapStyle}>
                  Already used by 700+ teenager-led teams running world-class events
                </p>
              </div>
              <CardCta href="https://hcb.hackclub.com/applications/new">Start fundraising</CardCta>
            </div>
          </div>

          {/* ── Card 3: Clubs ── */}
          <div style={cardWrapStyle}>
            {/* Background + overlay */}
            <CardBg
              src={
                "https://cdn.hackclub.com/019db857-6e96-70e9-bf4c-c2e50b6092e1/joiningCard3Bg.webp"
              }
            />

            {/* Content — normal flow */}
            <div
              className="joining-card-content"
              style={{ ...cardContentStyle, maxWidth: "calc(100% - 88px)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12 }}>
                <Image
                  src={
                    "https://cdn.hackclub.com/019db857-7127-7f50-94df-c948bf0eb601/joiningCard3Icon.svg"
                  }
                  alt=""
                  width={48}
                  height={48}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <h3 style={cardTitleStyle}>1,500+ in-person clubs</h3>
              </div>
              <p style={cardBodyStyle}>
                There are Hack Clubs at high schools all over the world. Each one is a place where
                you build real projects from day one &mdash; no boring lectures, no prerequisites.
              </p>
              <p style={cardBodyGapStyle}>
                Find one near you, or start your own and we&rsquo;ll help you get it off the ground.
              </p>
              <CardCta href="https://hackclub.com/clubs/">Start or find a club</CardCta>
            </div>
          </div>

          {/* ── Card 4: Free stuff ── */}
          <div style={cardWrapStyle}>
            {/* Background + overlay */}
            <CardBg
              src={
                "https://cdn.hackclub.com/019db857-7448-732f-9016-6ebbe0d2fe28/joiningCard4Bg.webp"
              }
            />

            {/* Content — normal flow */}
            <div
              className="joining-card-content"
              style={{ ...cardContentStyle, maxWidth: "calc(100% - 88px)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                <Image
                  src={
                    "https://cdn.hackclub.com/019db857-76a0-7d26-87cd-35a340d34585/joiningCard4Icon.svg"
                  }
                  alt=""
                  width={58}
                  height={58}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <h3 style={cardTitleStyle}>Free stuff, just for joining</h3>
              </div>
              <p style={cardBodyStyle}>
                GitHub Education, Brilliant Premium, and a bunch more &mdash; all unlocked just by
                being part of Hack Club. No catch, no cost.
              </p>
              <CardCta href="https://toolbox.hackclub.com/">See all perks</CardCta>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .joining-slack-stats { display: none !important; }
          .joining-card1-content { max-width: 100% !important; padding: 24px 20px !important; }
          .joining-card-content { max-width: 100% !important; padding: 24px 20px !important; }
          .joining-card2-deco { display: none !important; }
          .joining-card2-body { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
