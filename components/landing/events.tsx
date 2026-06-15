"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AirtableProgram } from "../../lib/programs";
import { parseLocalDate, selectFeaturedPrograms } from "../../lib/programs";
import { BtnArrow } from "./btn-arrow";

// ── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 16,
        background: "var(--surface-hover)",
        minHeight: 260,
        boxShadow: "2px 4px 6px rgba(0,0,0,0.10)",
        animation: "events-pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

// ── Dynamic event card ───────────────────────────────────────────────────────
function EventCard({ program }: { program: AirtableProgram }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const endDate = parseLocalDate(program.endDate);

  const s = program.site;
  const bgColor = s?.bgColor ?? "var(--surface)";
  const textColor = s?.textColor ?? "var(--foreground)";
  const accentColor = s?.accentColor ?? "#ec3750";
  const logoUrl = s?.logoUrl ?? null;
  const logoSize = s?.logoSize ?? 48;
  const bgImageUrl = s?.bgType === "image" ? (s?.bgImageUrl ?? null) : null;
  const buttonColor = s?.buttonColor ?? "#ec3750";
  const buttonTextColor = s?.buttonTextColor ?? "#ffffff";
  const buttonRadius = s?.buttonBorderRadius ?? 44;
  const buttonBorderWidth = s?.buttonBorderWidth ?? 0;
  const buttonBorderColor = s?.buttonBorderColor ?? "var(--foreground)";
  const slackChannel = s?.slackChannel ?? null;
  const slackUrl = slackChannel
    ? `https://hackclub.slack.com/channels/${slackChannel.replace(/^#/, "")}`
    : null;
  const description = s?.description ?? null;

  const irlStart = s?.inPersonStart ?? null;
  const irlEnd = s?.inPersonEnd ?? null;
  let badgeLabel: string;
  if (irlStart) {
    const start = parseLocalDate(irlStart);
    const end = irlEnd ? parseLocalDate(irlEnd) : null;
    const month = start.toLocaleDateString("en-GB", { month: "short" });
    const year = start.getFullYear();
    if (!end || irlStart === irlEnd) {
      badgeLabel = `${start.getDate()} ${month} ${year}`;
    } else if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      badgeLabel = `${start.getDate()}–${end.getDate()} ${month} ${year}`;
    } else {
      badgeLabel = `${start.getDate()} ${start.toLocaleDateString("en-GB", { month: "short" })} – ${end.getDate()} ${end.toLocaleDateString("en-GB", { month: "short" })} ${end.getFullYear()}`;
    }
  } else {
    badgeLabel = `Ends ${endDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={(e) => {
        const el = wrapperRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left) / rect.width - 0.5;
        const dy = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) scale(1.012) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
      }}
      onMouseLeave={() => {
        const el = wrapperRef.current;
        if (!el) return;
        el.style.transition = "transform 0.4s ease";
        el.style.transform = "perspective(900px) scale(1) rotateY(0deg) rotateX(0deg)";
        setTimeout(() => {
          if (wrapperRef.current) wrapperRef.current.style.transition = "transform 0.06s ease";
        }, 400);
      }}
      onMouseEnter={() => {
        if (wrapperRef.current) wrapperRef.current.style.transition = "transform 0.06s ease";
      }}
      style={{ position: "relative", transition: "transform 0.06s ease", willChange: "transform" }}
    >
      <div
        style={{
          position: "relative",
          background: bgImageUrl ? "transparent" : bgColor,
          borderRadius: 16,
          boxShadow: "2px 4px 6px rgba(0,0,0,0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "28px 32px 16px",
          minHeight: 260,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Pin icon */}
        {program.site?.pinned && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 36,
              height: 36,
              background: "#ec3750",
              borderBottomRightRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
            </svg>
          </div>
        )}

        {/* Background image */}
        {bgImageUrl && (
          <Image
            src={bgImageUrl}
            alt=""
            width={400}
            height={260}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
            unoptimized
          />
        )}

        {/* Logo or title */}
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={program.name}
            width={logoSize}
            height={logoSize}
            style={{
              height: logoSize,
              width: "auto",
              maxWidth: "100%",
              objectFit: "contain",
              marginBottom: 12,
              position: "relative",
              zIndex: 1,
              alignSelf: "center",
            }}
            unoptimized
          />
        ) : (
          <h2
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-zarathustra)",
              fontSize: 40,
              fontWeight: "normal",
              color: textColor,
              margin: "0 0 8px",
              lineHeight: 1,
              textAlign: "center",
              width: "100%",
            }}
          >
            {program.name}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: textColor,
              opacity: 0.9,
              margin: "0 0 4px",
              lineHeight: 1.2,
            }}
          >
            {description}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: "1 0 12px" }} />

        {/* CTA button */}
        {program.websiteUrl && (
          <a
            href={program.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 20,
              paddingRight: 20,
              background: buttonColor,
              borderRadius: buttonRadius,
              border: `${buttonBorderWidth}px solid ${buttonBorderColor}`,
              fontFamily: "var(--font-phantom)",
              fontWeight: "bold",
              fontSize: 20,
              color: buttonTextColor,
              textDecoration: "none",
              whiteSpace: "nowrap",
              marginBottom: slackChannel ? 6 : 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start now <BtnArrow />
          </a>
        )}

        {/* Slack channel */}
        {slackChannel && (
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-phantom)",
              fontStyle: "italic",
              fontSize: 16,
              color: textColor,
              margin: 0,
              lineHeight: 1.2,
              paddingRight: 110,
            }}
          >
            Join the discussion in{" "}
            <a
              href={slackUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: accentColor,
                textDecoration: "none",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              #{slackChannel.replace(/^#/, "")}
            </a>
          </p>
        )}

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: 36,
            width: 130,
            background: "#ec3750",
            borderTopLeftRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-phantom)",
              fontWeight: "bold",
              fontSize: 16,
              color: "var(--paper)",
              whiteSpace: "nowrap",
            }}
          >
            {badgeLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function EventsSection({
  initialCards = null,
}: {
  initialCards?: AirtableProgram[] | null;
}) {
  const [cards, setCards] = useState<AirtableProgram[] | null>(initialCards);

  useEffect(() => {
    if (initialCards !== null) return;

    fetch("/api/programs")
      .then((r) => r.json())
      .then((all: AirtableProgram[]) => setCards(selectFeaturedPrograms(all)))
      .catch(() => setCards([]));
  }, [initialCards]);

  const loading = cards === null;
  const displayCards = cards ?? [null, null, null, null];

  return (
    <section
      className="section-padded"
      style={{
        background: "var(--background)",
        paddingTop: 80,
        paddingBottom: 60,
        paddingLeft: "clamp(24px, 14.29%, 220px)",
        paddingRight: "clamp(24px, 14.29%, 220px)",
        position: "relative",
      }}
    >
      {/* Red gradient — top of section, below wave borders */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(180deg, rgba(236,55,80,0.15) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Magazine background — flipped, tucked behind top wave, extends down */}
      <Image
        src={"/assets/background.webp"}
        alt=""
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: -40,
          left: 0,
          width: "100%",
          height: "auto",
          transform: "scaleY(-1)",
          opacity: 0.12,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Headline — right-aligned */}
      <div
        style={{
          textAlign: "right",
          marginBottom: 4,
          marginTop: 100,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontSize: 40,
            lineHeight: 1,
            color: "var(--foreground)",
            margin: 0,
            fontWeight: "normal",
          }}
        >
          Imagine a world where
        </p>
        <p
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontSize: 40,
            lineHeight: 1.15,
            margin: 0,
            fontWeight: "normal",
            display: "inline-block",
            background: "linear-gradient(90deg, #ec3750 0%, #ff8c37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            paddingBottom: 4,
          }}
        >
          you were here:
        </p>
      </div>

      {/* Subtext — right-aligned */}
      <p
        style={{
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          color: "var(--foreground)",
          textAlign: "right",
          marginBottom: 32,
          marginTop: 8,
          lineHeight: 1.2,
          position: "relative",
          zIndex: 1,
        }}
      >
        Every event below is free, open to any teen, and happening right now. Yes, you can go.
      </p>

      {/* 2×2 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          position: "relative",
          zIndex: 1,
          alignItems: "stretch",
        }}
        className="events-grid"
      >
        {displayCards.map((p, i) =>
          loading || p === null ? <SkeletonCard key={i} /> : <EventCard key={p.id} program={p} />,
        )}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            color: "var(--foreground)",
            margin: 0,
            marginTop: 40,
            marginBottom: 8,
          }}
        >
          Don&apos;t see something you like?
        </p>
        <Link
          href="/programs"
          className="cta-btn dark-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--foreground)",
            color: "var(--background)",
            borderRadius: 41,
            height: 48,
            paddingLeft: 28,
            paddingRight: 28,
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            fontWeight: "normal",
            textDecoration: "none",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          Explore all programs <BtnArrow />
        </Link>
      </div>

      {/* Responsive: stack cards on small screens */}
      <style>{`
        @media (max-width: 640px) {
          .events-grid {
            grid-template-columns: 1fr !important;
          }
          .events-grid > div {
            aspect-ratio: unset !important;
            min-height: 280px;
          }
        }
        @keyframes events-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
