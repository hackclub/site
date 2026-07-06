"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import type { ProgramFormat, ProjectType } from "../../lib/site-programs";
import { PROJECT_TYPE_OPTIONS, formatInPersonDate } from "../../lib/site-programs";
import type { AirtableProgram } from "../../lib/programs";
import { getProgramStatus, parseLocalDate } from "../../lib/programs";
import { BtnArrowSvg } from "../../components/landing/btn-arrow";

function ProgramCard({ program }: { program: AirtableProgram }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const now = new Date();
  const isEnded = parseLocalDate(program.endDate) < now;
  const isDraft = parseLocalDate(program.startDate) > now;

  const s = program.site;
  const bgColor = s?.bgColor ?? "var(--surface)";
  const textColor = s?.textColor ?? "var(--foreground)";
  const accentColor = s?.accentColor ?? "#ec3750";
  const logoUrl = s?.logoUrl ?? null;
  const logoSize = s?.logoSize ?? 48;
  const bgImageUrl = s?.bgType === "image" ? (s?.bgImageUrl ?? null) : null;
  const buttonLabel = isEnded ? "See the site" : "Start now";
  const buttonColor = s?.buttonColor ?? "#ec3750";
  const buttonTextColor = s?.buttonTextColor ?? "#ffffff";
  const buttonRadius = s?.buttonBorderRadius ?? 44;
  const buttonBorderWidth = s?.buttonBorderWidth ?? 0;
  const buttonBorderColor = s?.buttonBorderColor ?? "var(--foreground)";
  const slackChannel = s?.slackChannel ?? null;
  const slackUrl = slackChannel
    ? `https://hackclub.slack.com/channels/${slackChannel.replace(/^#/, "")}`
    : null;
  const projectTypes = s?.projectTypes ?? [];
  const format = s?.format ?? null;
  const description = s?.description ?? null;

  const badgeLabel = isDraft
    ? "Coming soon"
    : isEnded
      ? "Ended"
      : `Ends ${parseLocalDate(program.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
  const badgeEnded = isEnded || isDraft;

  // Italic metadata lines
  const metaLines: string[] = [];
  const inPersonStr = formatInPersonDate(
    s?.inPersonStart ?? null,
    s?.inPersonEnd ?? null,
    s?.inPersonLocation ?? null,
  );
  if ((format === "In-Person Only" || format === "Both") && inPersonStr)
    metaLines.push(`In-person: ${inPersonStr}`);
  if (format === "Online Only") metaLines.push("Online-only");
  if (format === "Both" && !inPersonStr) metaLines.push("In-person & online");
  if (projectTypes.length > 0)
    metaLines.push(
      projectTypes.length === PROJECT_TYPE_OPTIONS.length
        ? "Project type: Any"
        : `Project types: ${projectTypes.join(", ")}`,
    );
  const additionalRequirements = s?.additionalRequirements ?? null;
  if (additionalRequirements) metaLines.push(additionalRequirements);

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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgImageUrl}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Logo or title */}
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={program.name}
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

        {/* Italic metadata */}
        {metaLines.length > 0 && (
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--font-phantom)",
              fontStyle: "italic",
              fontSize: 20,
              color: textColor,
              opacity: 0.55,
              margin: "0 0 4px",
              lineHeight: 1.2,
            }}
          >
            {metaLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < metaLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}

        {/* Spacer — min 12px, grows to push button toward bottom */}
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
            {buttonLabel}
            <span className="btn-arrow" aria-hidden="true">
              <BtnArrowSvg />
            </span>
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
            background: badgeEnded ? "var(--surface-hover)" : "var(--red)",
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
              color: badgeEnded ? "var(--foreground)" : "var(--paper)",
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

// ── Loading skeleton ──────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div
      style={{
        borderRadius: 16,
        background: "var(--surface-hover)",
        minHeight: 260,
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

// ── Chevron icon ──────────────────────────────────────────────────────────────
function Chevron({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M1 1l6 6 6-6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Generic pill dropdown ─────────────────────────────────────────────────────
function PillDropdown({
  label,
  active,
  onClear,
  children,
}: {
  label: string;
  active: boolean;
  onClear: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const openRafRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (openRafRef.current !== null) {
      cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openPanel = useCallback(() => {
    clearTimers();
    setOpen(true);
    setMounted(true);
    openRafRef.current = requestAnimationFrame(() => {
      openRafRef.current = requestAnimationFrame(() => {
        setVisible(true);
        openRafRef.current = null;
      });
    });
  }, [clearTimers]);

  const closePanel = useCallback(() => {
    clearTimers();
    setOpen(false);
    setVisible(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setMounted(false);
      closeTimeoutRef.current = null;
    }, 180);
  }, [clearTimers]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) closePanel();
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      clearTimers();
    };
  }, [clearTimers, closePanel]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => (open ? closePanel() : openPanel())}
        className="filter-pill"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 40,
          paddingLeft: active ? 8 : 16,
          paddingRight: 16,
          borderRadius: 9999,
          border: "2.5px solid var(--red)",
          background: "transparent",
          fontFamily: "var(--font-phantom)",
          fontSize: 20,
          color: active ? "var(--red)" : "var(--foreground)",
          cursor: "pointer",
          whiteSpace: "nowrap",
          outline: "none",
        }}
      >
        {active && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#ec3750",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{ display: "block" }}
            >
              <path d="M2 2l6 6M8 2L2 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        )}
        {label}
        <Chevron />
      </button>
      {mounted && (
        <div
          className="filter-panel"
          data-open={visible}
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            background: "var(--surface)",
            border: "3px solid var(--red)",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            zIndex: 100,
            minWidth: 220,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function CheckItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      style={{
        appearance: "none",
        border: "none",
        background: "none",
        padding: 0,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontFamily: "var(--font-phantom)",
        fontSize: 20,
        color: "var(--foreground)",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          border: "2.5px solid var(--red)",
          background: checked ? "var(--red)" : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 150ms ease",
        }}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5l3.5 3.5L11 1"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

type StatusOption = "ongoing" | "ended" | "draft";
const STATUS_LABELS: Record<StatusOption, string> = {
  ongoing: "Ongoing",
  ended: "Ended",
  draft: "Draft",
};
type SortOption = "deadline-asc" | "deadline-desc" | "az" | "za";
const SortArrow = () => (
  <span
    aria-hidden="true"
    style={{ display: "inline-flex", verticalAlign: "middle", margin: "0 4px" }}
  >
    <BtnArrowSvg />
  </span>
);
const SORT_LABELS: Record<SortOption, ReactNode> = {
  "deadline-asc": "Earliest deadline",
  "deadline-desc": "Latest deadline",
  az: (
    <>
      A<SortArrow />Z
    </>
  ),
  za: (
    <>
      Z<SortArrow />A
    </>
  ),
};
const FORMAT_OPTIONS: ProgramFormat[] = ["In-Person Only", "Online Only", "Both"];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProgramsPage({
  initialPrograms = null,
}: {
  initialPrograms?: AirtableProgram[] | null;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("deadline-asc");
  const [statusFilter, setStatusFilter] = useState<Set<StatusOption>>(new Set(["ongoing"]));
  const [formatFilter, setFormatFilter] = useState<Set<ProgramFormat>>(new Set());
  const [typeFilter, setTypeFilter] = useState<Set<ProjectType>>(new Set());
  const [programs, setPrograms] = useState<AirtableProgram[] | null>(initialPrograms);
  const [error, setError] = useState<string | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMounted, setSortMounted] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const magazineBgRef = useRef<HTMLImageElement>(null);
  const sortOpenRafRef = useRef<number | null>(null);
  const sortCloseTimeoutRef = useRef<number | null>(null);

  const clearSortTimers = useCallback(() => {
    if (sortOpenRafRef.current !== null) {
      cancelAnimationFrame(sortOpenRafRef.current);
      sortOpenRafRef.current = null;
    }
    if (sortCloseTimeoutRef.current !== null) {
      window.clearTimeout(sortCloseTimeoutRef.current);
      sortCloseTimeoutRef.current = null;
    }
  }, []);

  const openSortPanel = useCallback(() => {
    clearSortTimers();
    setSortOpen(true);
    setSortMounted(true);
    sortOpenRafRef.current = requestAnimationFrame(() => {
      sortOpenRafRef.current = requestAnimationFrame(() => {
        setSortVisible(true);
        sortOpenRafRef.current = null;
      });
    });
  }, [clearSortTimers]);

  const closeSortPanel = useCallback(() => {
    clearSortTimers();
    setSortOpen(false);
    setSortVisible(false);
    sortCloseTimeoutRef.current = window.setTimeout(() => {
      setSortMounted(false);
      sortCloseTimeoutRef.current = null;
    }, 180);
  }, [clearSortTimers]);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    if (magazineBgRef.current)
      magazineBgRef.current.style.transform = `scaleY(-1) translateY(-${y * 0.5}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) closeSortPanel();
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      clearSortTimers();
    };
  }, [clearSortTimers, closeSortPanel]);

  useEffect(() => {
    if (initialPrograms !== null) return;

    fetch("/api/programs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPrograms(data);
        else setError(data.error ?? "Failed to load programs");
      })
      .catch(() => setError("Network error — could not load programs"));
  }, [initialPrograms]);

  const filtered = (programs ?? []).filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.site?.description ?? "").toLowerCase().includes(q) ||
      (p.site?.inPersonLocation ?? "").toLowerCase().includes(q);
    if (!matchesSearch) return false;
    const programStatus = getProgramStatus(p);
    if (statusFilter.size > 0 && !statusFilter.has(programStatus)) return false;
    if (formatFilter.size > 0) {
      const pFormat = p.site?.format ?? null;
      if (!pFormat || !formatFilter.has(pFormat)) return false;
    }
    if (typeFilter.size > 0) {
      const pTypes = p.site?.projectTypes ?? [];
      if (![...typeFilter].some((t) => pTypes.includes(t))) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aPinned = Number(Boolean(a.site?.pinned));
    const bPinned = Number(Boolean(b.site?.pinned));
    if (aPinned !== bPinned) return bPinned - aPinned;

    if (sort === "deadline-asc")
      return parseLocalDate(a.endDate).getTime() - parseLocalDate(b.endDate).getTime();
    if (sort === "deadline-desc")
      return parseLocalDate(b.endDate).getTime() - parseLocalDate(a.endDate).getTime();
    if (sort === "az") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  function toggleStatus(s: StatusOption) {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  function toggleFormat(f: ProgramFormat) {
    setFormatFilter((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  }

  function toggleType(t: ProjectType) {
    setTypeFilter((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  const statusLabel =
    statusFilter.size === 0
      ? "Status"
      : `Status | ${(["ongoing", "ended", "draft"] as StatusOption[])
          .filter((s) => statusFilter.has(s))
          .map((s) => STATUS_LABELS[s])
          .join(", ")}`;
  const formatLabel =
    formatFilter.size === 0 ? "Format" : `Format | ${[...formatFilter].join(", ")}`;
  const typeLabel = typeFilter.size === 0 ? "Project type" : `Type | ${[...typeFilter].join(", ")}`;

  return (
    <main
      id="main"
      tabIndex={-1}
      style={{
        position: "relative",
        background: "var(--background)",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 700px) { .programs-grid { grid-template-columns: 1fr !important; } }
        input[data-programs-search]::placeholder { opacity: 0.5; }
        input[data-programs-search] { outline: none; }
        .cta-btn .btn-arrow { display: inline-block; transition: transform 0.2s ease; }
        .cta-btn:hover .btn-arrow { transform: translateX(5px); }
        .filter-pill { transition: background 150ms ease, color 150ms ease; }
        .filter-pill:hover { background: rgba(236,55,80,0.08) !important; }
        .filter-pill:active { transform: scale(0.97); }
        .filter-panel { transform-origin: top left; transition: opacity 180ms ease-out, transform 180ms ease-out; }
        .filter-panel[data-open="false"] { opacity: 0; transform: translateY(-8px) scale(0.96); pointer-events: none; }
        .filter-panel[data-open="true"] { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .sort-pill { transition: transform 150ms ease, filter 150ms ease, box-shadow 150ms ease; transform-origin: center; }
        .sort-pill[aria-expanded="true"] { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(236,55,80,0.18); }
        .sort-pill:hover { filter: brightness(0.92); }
        .sort-panel { transform-origin: top left; transition: opacity 180ms ease-out, transform 180ms ease-out; }
        .sort-panel[data-open="false"] { opacity: 0; transform: translateY(-8px) scale(0.96); pointer-events: none; }
        .sort-panel[data-open="true"] { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .sort-option { transition: background-color 120ms ease, color 120ms ease; }
        .sort-option[data-active="true"] { background: #ec3750; color: #fff; }
        .sort-option:active { transform: scale(0.98); }
        @media (prefers-reduced-motion: reduce) {
          .sort-pill, .sort-panel, .sort-option, .filter-pill, .filter-panel { transition: none !important; }
          .filter-pill:active, .sort-option:active { transform: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(236,55,80,0.18) 0%, rgba(236,55,80,0.04) 20%, transparent 40%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/bgFade.svg"
        alt=""
        style={{
          position: "absolute",
          top: -12,
          left: -1,
          width: "101%",
          height: "auto",
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
          transform: "scaleY(-1)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={magazineBgRef}
        src="/assets/background.webp"
        alt=""
        style={{
          position: "absolute",
          top: -60,
          left: 0,
          width: "100%",
          height: "auto",
          transform: "scaleY(-1)",
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navbar />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "clamp(100px, 14vh, 140px)",
          paddingBottom: 80,
          paddingLeft: "clamp(24px, 14.29%, 220px)",
          paddingRight: "clamp(24px, 14.29%, 220px)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontSize: 60,
            fontWeight: "normal",
            lineHeight: 0.92,
            color: "var(--foreground)",
            textAlign: "center",
            margin: "40px 0 16px",
          }}
        >
          Programs @ Hack Club
        </h1>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: "var(--foreground)",
              margin: "0 0 4px",
            }}
          >
            Every event below is free and open to any teen, over the world. Yes, you can go!
          </p>
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            (Check out our program documentary videos{" "}
            <a
              href="https://www.youtube.com/@HackClubHQ/videos"
              target="_blank"
              style={{ color: "#ec3750", textDecoration: "none" }}
            >
              on YouTube
              <span
                aria-hidden="true"
                style={{ display: "inline-flex", verticalAlign: "middle", marginLeft: 2 }}
              >
                <BtnArrowSvg />
              </span>
            </a>
            )
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: 9999,
            height: 64,
            border: "2.5px solid var(--border)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 28,
            paddingRight: 28,
            marginBottom: 20,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, opacity: 0.4, marginRight: 12 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            data-programs-search
            type="text"
            aria-label="Search programs"
            placeholder="Search for your next adventure..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 32,
            alignItems: "center",
          }}
        >
          {/* Sort dropdown */}
          <div ref={sortRef} style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() => (sortOpen ? closeSortPanel() : openSortPanel())}
              className="sort-pill"
              aria-expanded={sortOpen}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 40,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 9999,
                border: "2.5px solid #ec3750",
                background: "#ec3750",
                fontFamily: "var(--font-phantom)",
                fontSize: 20,
                color: "#fff",
                cursor: "pointer",
                whiteSpace: "nowrap",
                outline: "none",
              }}
            >
              Sort by | {SORT_LABELS[sort]}
              <Chevron color="#fff" />
            </button>
            {sortMounted && (
              <div
                className="sort-panel"
                data-open={sortVisible}
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  background: "var(--surface)",
                  border: "3px solid var(--red)",
                  borderRadius: 16,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  zIndex: 100,
                  minWidth: 220,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                  <button
                    key={k}
                    data-active={sort === k}
                    className="sort-option"
                    onClick={() => {
                      setSort(k);
                      closeSortPanel();
                    }}
                    style={{
                      background: sort === k ? "var(--red)" : "transparent",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontFamily: "var(--font-phantom)",
                      fontSize: 20,
                      color: sort === k ? "#fff" : "var(--foreground)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {SORT_LABELS[k]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <PillDropdown
            label={statusLabel}
            active={statusFilter.size > 0}
            onClear={() => setStatusFilter(new Set())}
          >
            {(["ongoing", "ended", "draft"] as StatusOption[]).map((s) => (
              <CheckItem
                key={s}
                label={STATUS_LABELS[s]}
                checked={statusFilter.has(s)}
                onToggle={() => toggleStatus(s)}
              />
            ))}
          </PillDropdown>

          {/* Format */}
          <PillDropdown
            label={formatLabel}
            active={formatFilter.size > 0}
            onClear={() => setFormatFilter(new Set())}
          >
            {FORMAT_OPTIONS.map((f) => (
              <CheckItem
                key={f}
                label={f}
                checked={formatFilter.has(f)}
                onToggle={() => toggleFormat(f)}
              />
            ))}
          </PillDropdown>

          {/* Project type */}
          <PillDropdown
            label={typeLabel}
            active={typeFilter.size > 0}
            onClear={() => setTypeFilter(new Set())}
          >
            {PROJECT_TYPE_OPTIONS.map((t) => (
              <CheckItem
                key={t}
                label={t}
                checked={typeFilter.has(t)}
                onToggle={() => toggleType(t)}
              />
            ))}
          </PillDropdown>
        </div>

        {error && (
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              color: "#ec3750",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            {error}
          </p>
        )}

        <div
          className="programs-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
        >
          {programs === null
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : sorted.map((p) => <ProgramCard key={p.id} program={p} />)}
        </div>

        {programs !== null && sorted.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: "var(--foreground)",
              opacity: 0.5,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            No programs found{search ? ` matching "${search}"` : ""}.
          </p>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: "var(--foreground)",
              opacity: 0.55,
              margin: 0,
            }}
          >
            Looking for more? Our community plans and ideates in the{" "}
            <a
              href="https://slack.hackclub.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ec3750", textDecoration: "none" }}
            >
              Slack
            </a>
            , where new events are being announced all the time.
          </p>
          <p
            style={{
              fontFamily: "var(--font-phantom)",
              fontSize: 20,
              color: "var(--foreground)",
              opacity: 0.55,
              margin: 0,
            }}
          >
            You can also{" "}
            <Link href="/programs/edit" style={{ color: "#ec3750", textDecoration: "none" }}>
              edit an event here
            </Link>
            .
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
