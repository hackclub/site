"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeLock } from "@/components/ThemeToggle";
import { Icon } from "@/components/Icon";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "@/components/fiscal-sponsorship/constants";
import { FeatureCards } from "./FeatureCards";

type HCBStats = {
  transactions_volume?: number;
};

const FEATURE_KEYS = [
  { icon: "bank-account", key: "Nonprofit" },
  { icon: "support", key: "Donations" },
  { icon: "docs", key: "Records" },
  { icon: "card", key: "Cards" },
  { icon: "payment-transfer", key: "Reimburse" },
  { icon: "controls", key: "Balance" },
] as const;
// HCB's dark theme tokens, taken from hcb.hackclub.com's stylesheet.
const HCB = {
  dark: "#17171d",
  darker: "#121217",
  card: "#252429",
  smoke: "#e0e6ed",
  muted: "#8492a6",
  purple: "#a633d6",
  outline: "inset 0 0 0 0.5px hsla(0, 0%, 100%, 0.25)",
} as const;
const ACCENT = HCB.purple;
const GREEN = "#33d6a6";
const RED = "#ec3750";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

type LedgerRow = { memo: string; incoming: boolean };

function buildColumns(incoming: string[], outgoing: string[], count: number): LedgerRow[][] {
  const length = incoming.length + outgoing.length;
  return Array.from({ length: count }, (_, col) =>
    Array.from({ length }, (_, i) => {
      const isIncoming = (i + col) % 3 === 0;
      const pool = isIncoming ? incoming : outgoing;
      const index = (i * (col + 2) + col * 5) % pool.length;
      return {
        memo: pool[index],
        incoming: isIncoming,
      };
    }),
  );
}

// One DI season for a sample team: [year, month (1-12), day, balance in cents].
// Dips are the Team Number, supplies, tournament registration, and a Global Finals hotel deposit.
const BALANCE_HISTORY: [number, number, number, number][] = [
  [2025, 8, 8, 31240],
  [2025, 8, 22, 48740],
  [2025, 9, 5, 31240],
  [2025, 9, 19, 53815],
  [2025, 10, 3, 47183],
  [2025, 10, 17, 89683],
  [2025, 10, 31, 81250],
  [2025, 11, 14, 121250],
  [2025, 11, 28, 143675],
  [2025, 12, 12, 196175],
  [2025, 12, 26, 224830],
  [2026, 1, 9, 210764],
  [2026, 1, 23, 201889],
  [2026, 2, 6, 189389],
  [2026, 2, 20, 241836],
  [2026, 3, 6, 328611],
  [2026, 3, 20, 380455],
  [2026, 4, 3, 491230],
  [2026, 4, 17, 367230],
  [2026, 5, 1, 548692],
  [2026, 5, 15, 693147],
];

const CHART_W = 1200;
const CHART_H = 240;
const CHART_MAX_CENTS = 750000;

const CHART_POINTS = BALANCE_HISTORY.map(([, , , cents], i) => ({
  x: (i / (BALANCE_HISTORY.length - 1)) * CHART_W,
  y: CHART_H - 12 - (cents / CHART_MAX_CENTS) * (CHART_H - 40),
}));

function smoothPath(points: { x: number; y: number }[]) {
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const LINE_PATH = smoothPath(CHART_POINTS);
const FILL_PATH = `${LINE_PATH} L${CHART_W} ${CHART_H} L0 ${CHART_H} Z`;

type ChartHover = { index: number; left: number; top: number; flip: boolean };

function LedgerBackground({
  incoming,
  outgoing,
  chartEvents,
}: {
  incoming: string[];
  outgoing: string[];
  chartEvents: Record<string, string>;
}) {
  const columns = buildColumns(incoming, outgoing, 3);
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<ChartHover | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;

    const onMove = (event: PointerEvent) => {
      const chart = chartRef.current?.getBoundingClientRect();
      const box = root.getBoundingClientRect();
      if (!chart || event.clientX < chart.left || event.clientX > chart.right) {
        setHover(null);
        return;
      }
      const fraction = (event.clientX - chart.left) / chart.width;
      const index = Math.round(fraction * (CHART_POINTS.length - 1));
      const point = CHART_POINTS[index];
      const left = chart.left - box.left + (point.x / CHART_W) * chart.width;
      const top = chart.top - box.top + (point.y / CHART_H) * chart.height;
      if (event.clientY < box.top + top - 90 || event.clientY > chart.bottom) {
        setHover(null);
        return;
      }
      setHover((prev) =>
        prev?.index === index && prev.left === left && prev.top === top
          ? prev
          : { index, left, top, flip: left > box.width - 180 },
      );
    };
    const onLeave = () => setHover(null);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const hovered = hover ? BALANCE_HISTORY[hover.index] : null;
  const dateLabel = hovered
    ? new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(
        new Date(hovered[0], hovered[1] - 1, hovered[2]),
      )
    : "";

  return (
    <div ref={rootRef} className="ledger" aria-hidden="true">
      <div className="ledger-columns">
        {columns.map((rows, col) => (
          <div key={col} className={`ledger-col ledger-col-${col}`}>
            <div className="ledger-track">
              {[...rows, ...rows].map((row, i) => (
                <div key={i} className="ledger-row">
                  <span
                    className="ledger-dot"
                    style={{ backgroundColor: row.incoming ? GREEN : RED }}
                  />
                  <span className="ledger-memo">{row.memo}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <svg
        ref={chartRef}
        className="ledger-chart"
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="di-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.28" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={FILL_PATH} fill="url(#di-chart-fill)" />
        <path
          d={LINE_PATH}
          fill="none"
          stroke={GREEN}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {hover && hovered ? (
        <>
          <span className="chart-guide" style={{ left: hover.left, top: hover.top }} />
          <span className="chart-dot" style={{ left: hover.left, top: hover.top }} />
          <span
            className={hover.flip ? "chart-tip chart-tip-flip" : "chart-tip"}
            style={{ left: hover.left, top: hover.top }}
          >
            <span className="chart-tip-date">{dateLabel}</span>
            <span className="chart-tip-amount">{usd.format(hovered[3] / 100)}</span>
            {chartEvents[hover.index] ? (
              <span className="chart-tip-event">{chartEvents[hover.index]}</span>
            ) : null}
          </span>
        </>
      ) : null}

      <style jsx>{`
        .ledger {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .ledger-columns {
          position: absolute;
          inset: -40px 0 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          padding: 0 clamp(16px, 4vw, 48px);
          opacity: 0.55;
          -webkit-mask-image: radial-gradient(
            ellipse 58% 50% at 50% 52%,
            transparent 0%,
            transparent 45%,
            #000 100%
          );
          mask-image: radial-gradient(
            ellipse 58% 50% at 50% 52%,
            transparent 0%,
            transparent 45%,
            #000 100%
          );
        }

        .ledger-col {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            180deg,
            transparent 8%,
            #000 26%,
            #000 72%,
            transparent
          );
          mask-image: linear-gradient(180deg, transparent 8%, #000 26%, #000 72%, transparent);
        }

        .ledger-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: ledger-scroll 70s linear infinite;
        }

        .ledger-col-1 .ledger-track {
          animation-duration: 90s;
          animation-delay: -30s;
        }

        .ledger-col-2 .ledger-track {
          animation-duration: 80s;
          animation-delay: -55s;
        }

        .ledger-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 8px;
          background: rgba(37, 36, 41, 0.6);
          box-shadow: ${HCB.outline};
          font-family: var(--font-phantom);
          font-size: 15px;
          color: ${HCB.smoke};
          white-space: nowrap;
        }

        .ledger-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          flex-shrink: 0;
        }

        .ledger-memo {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ledger-chart {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 42%;
          opacity: 0.7;
          clip-path: inset(0 100% 0 0);
          animation: ledger-draw 3.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .chart-guide {
          position: absolute;
          bottom: 0;
          width: 1px;
          transform: translateX(-0.5px);
          background: linear-gradient(180deg, rgba(51, 214, 166, 0.7), rgba(51, 214, 166, 0));
        }

        .chart-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          margin: -6px 0 0 -6px;
          border-radius: 9999px;
          background: ${GREEN};
          box-shadow:
            0 0 0 4px rgba(51, 214, 166, 0.25),
            0 0 18px rgba(51, 214, 166, 0.8);
        }

        .chart-tip {
          position: absolute;
          display: grid;
          gap: 2px;
          padding: 8px 12px;
          transform: translate(14px, calc(-100% - 14px));
          border-radius: 8px;
          background: ${HCB.card};
          box-shadow:
            ${HCB.outline},
            0 10px 30px rgba(0, 0, 0, 0.5);
          font-family: var(--font-phantom);
          white-space: nowrap;
        }

        .chart-tip-flip {
          transform: translate(calc(-100% - 14px), calc(-100% - 14px));
        }

        .chart-tip-date {
          font-size: 12px;
          color: ${HCB.muted};
        }

        .chart-tip-event {
          font-size: 13px;
          color: ${HCB.smoke};
        }

        .chart-tip-amount {
          font-size: 18px;
          font-weight: 700;
          color: ${GREEN};
          font-variant-numeric: tabular-nums;
        }

        @keyframes ledger-scroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }

        @keyframes ledger-draw {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @media (max-width: 900px) {
          .ledger-columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ledger-col-2 {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ledger-track {
            animation: none;
          }

          .ledger-chart {
            animation: none;
            clip-path: none;
          }
        }
      `}</style>
    </div>
  );
}

type MoneyToken =
  | { type: "static"; value: string }
  | { type: "digit"; value: number; key: string; delay: number; turns: number };

function getMoneyTokens(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const tokens: MoneyToken[] = [];
  let digitIndex = 0;

  for (const part of formatter.formatToParts(amount / 100)) {
    if (part.type === "integer" || part.type === "fraction") {
      for (const char of part.value) {
        const digit = Number(char);
        tokens.push({
          type: "digit",
          value: digit,
          key: `${part.type}-${digitIndex}`,
          delay: digitIndex * 0.085,
          turns: 4 + ((digitIndex + digit) % 3),
        });
        digitIndex += 1;
      }
      continue;
    }
    tokens.push({ type: "static", value: part.value });
  }

  return tokens;
}

function MoneyWheel({
  digit,
  delay,
  turns,
  reveal,
}: {
  digit: number;
  delay: number;
  turns: number;
  reveal: boolean;
}) {
  const digitList = Array.from({ length: (turns + 1) * 10 }, (_, index) => index % 10);

  return (
    <span
      style={{
        display: "inline-block",
        height: "1em",
        width: "0.64em",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: reveal ? `translateY(${-(turns * 10 + digit)}em)` : "translateY(0em)",
          transition: "transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: reveal ? `${delay}s` : "0s",
        }}
      >
        {digitList.map((value, index) => (
          <span key={index} style={{ height: "1em", lineHeight: 1 }}>
            {value}
          </span>
        ))}
      </span>
    </span>
  );
}

function AnimatedMoney({ amount }: { amount: number | undefined }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || amount === undefined) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: 84,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        lineHeight: 1,
        fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
        fontSize: "clamp(42px, 7vw, 72px)",
        fontWeight: 700,
        letterSpacing: "-0.05em",
        color: GREEN,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {amount === undefined ? (
        <span style={{ color: HCB.muted, fontSize: 24 }}>...</span>
      ) : (
        getMoneyTokens(amount).map((token, index) =>
          token.type === "digit" ? (
            <MoneyWheel
              key={token.key}
              digit={token.value}
              delay={token.delay}
              turns={token.turns}
              reveal={isVisible}
            />
          ) : (
            <span key={index} style={{ whiteSpace: "pre" }}>
              {token.value}
            </span>
          ),
        )
      )}
    </div>
  );
}

function QuoteCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <figure
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "clamp(28px, 5vw, 48px)",
        borderRadius: 18,
        backgroundColor: HCB.card,
        boxShadow: HCB.outline,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "block",
          fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
          fontSize: 96,
          lineHeight: 0.6,
          color: ACCENT,
          marginBottom: 12,
        }}
      >
        “
      </span>
      <blockquote
        style={{
          margin: 0,
          fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
          fontSize: "clamp(28px, 3.6vw, 44px)",
          lineHeight: 1.2,
          letterSpacing: "-0.025em",
          color: "#ffffff",
        }}
      >
        {quote}
      </blockquote>
      <figcaption style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
        <span
          aria-hidden="true"
          style={{
            width: 56,
            height: 56,
            borderRadius: 9999,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            backgroundColor: ACCENT,
            color: "#ffffff",
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontWeight: 700,
          }}
        >
          {initials}
        </span>
        <span style={{ fontFamily: FISCAL_TYPOGRAPHY.bodyFont }}>
          <span style={{ display: "block", fontWeight: 700, fontSize: 18, color: "#ffffff" }}>
            {name}
          </span>
          <span style={{ display: "block", fontSize: 16, color: HCB.muted }}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
}) {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto 40px", textAlign: "center" }}>
      {eyebrow ? (
        <p
          style={{
            margin: "0 0 10px",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: 12,
            fontWeight: 700,
            color: HCB.muted,
          }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        style={{
          fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
          fontSize: "clamp(34px, 4.8vw, 56px)",
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          style={{
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontSize: "clamp(18px, 2vw, 21px)",
            lineHeight: 1.5,
            color: HCB.muted,
            margin: "14px 0 0",
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

const pillButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 56,
  padding: "0 28px",
  borderRadius: 9999,
  color: "#ffffff",
  textDecoration: "none",
  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
  fontSize: 20,
  fontWeight: 700,
} as const;

const sectionPadding = {
  paddingTop: "clamp(56px, 7vw, 96px)",
  paddingBottom: "clamp(56px, 7vw, 96px)",
  paddingLeft: "clamp(16px, 4vw, 64px)",
  paddingRight: "clamp(16px, 4vw, 64px)",
} as const;

export function DIPageClient() {
  const t = useTranslations("HcbDI");
  const [stats, setStats] = useState<HCBStats>({});
  const features = FEATURE_KEYS.map((feature) => ({
    key: feature.key,
    icon: feature.icon,
    name: t(`feature${feature.key}Name`),
    lead: t(`feature${feature.key}Lead`),
    points: t.raw(`feature${feature.key}Points`) as string[],
  }));

  useEffect(() => {
    fetch("https://hcb.hackclub.com/stats")
      .then((res) => res.json())
      .then((data: HCBStats) => setStats(data || {}))
      .catch(() => {});
  }, []);

  const ledgerIncoming = t.raw("ledgerIncoming") as string[];
  const ledgerOutgoing = t.raw("ledgerOutgoing") as string[];

  return (
    <>
      <ThemeLock />
      <Navbar invertColors />
      <main id="main" tabIndex={-1} style={{ backgroundColor: HCB.dark }}>
        <section
          style={{
            position: "relative",
            minHeight: "min(92vh, 860px)",
            display: "flex",
            alignItems: "center",
            paddingTop: 104,
            paddingBottom: 96,
            overflow: "hidden",
            backgroundColor: HCB.darker,
          }}
        >
          <LedgerBackground
            incoming={ledgerIncoming}
            outgoing={ledgerOutgoing}
            chartEvents={t.raw("chartEvents") as Record<string, string>}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 960,
              margin: "0 auto",
              paddingLeft: 16,
              paddingRight: 16,
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: "0 0 18px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontSize: 13,
                fontWeight: 700,
                color: FISCAL_COLORS.primary,
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              }}
            >
              {t("heroEyebrow")}
            </p>
            <h1
              style={{
                fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                fontSize: "clamp(46px, 7.4vw, 88px)",
                lineHeight: 0.98,
                margin: 0,
                color: "#ffffff",
                textShadow: "0 0 40px rgba(18,18,23,0.9)",
              }}
            >
              {t.rich("heroTitle", {
                highlight: (chunks) => (
                  <span
                    style={{
                      WebkitTextStroke: `1px ${ACCENT}`,
                      WebkitTextFillColor: "#ffffff",
                      textShadow: "0 0 18px rgba(166, 51, 214, 0.75)",
                    }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </h1>
            <p
              style={{
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                color: HCB.smoke,
                fontSize: "clamp(19px, 2.2vw, 24px)",
                lineHeight: 1.45,
                margin: "24px auto 0",
                maxWidth: 640,
                textShadow: "0 0 24px rgba(18,18,23,0.9)",
              }}
            >
              {t("heroBody")}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "26px auto 0",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px 28px",
                maxWidth: 760,
              }}
            >
              {[t("badgeNonprofit"), t("badgeDonations"), t("badgeCards")].map((badge) => (
                <li
                  key={badge}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: HCB.smoke,
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    fontSize: 17,
                    fontWeight: 700,
                    textShadow: "0 0 16px rgba(18,18,23,0.9)",
                  }}
                >
                  <Icon glyph="checkmark" size={24} style={{ color: GREEN }} />
                  {badge}
                </li>
              ))}
            </ul>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 30,
              }}
            >
              <a href="#apply" style={{ ...pillButton, backgroundColor: FISCAL_COLORS.primary }}>
                {t("openAccount")}
              </a>
            </div>
          </div>
        </section>

        <section id="features" style={{ ...sectionPadding, scrollMarginTop: 96 }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <SectionHeading
              eyebrow={t("featuresEyebrow")}
              title={t("featuresTitle")}
              body={t("featuresBody")}
            />
            <FeatureCards
              items={features}
              labels={{
                region: t("featuresEyebrow"),
                previous: t("previousSlide"),
                next: t("nextSlide"),
                goTo: (number) => t("goToSlide", { number }),
                counter: (current, total) => t("slideCounter", { current, total }),
              }}
            />
          </div>
        </section>

        <section id="apply" style={sectionPadding}>
          <div
            style={{
              maxWidth: 880,
              margin: "0 auto",
              padding: "clamp(28px, 5vw, 48px)",
              borderRadius: 18,
              backgroundColor: HCB.card,
              boxShadow: HCB.outline,
              textAlign: "center",
            }}
          >
            <SectionHeading title={t("applyTitle")} body={t("applyBody")} />
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: 18,
                color: HCB.muted,
              }}
            >
              {t("soFarEnabled")}
            </p>
            <AnimatedMoney amount={stats.transactions_volume} />
            <p
              style={{
                margin: "10px 0 28px",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: 18,
                color: HCB.muted,
              }}
            >
              {t("inTransactions")}
            </p>
            <a
              href="https://hcb.hackclub.com/applications/new"
              target="_blank"
              rel="noreferrer"
              style={{ ...pillButton, backgroundColor: FISCAL_COLORS.primary }}
            >
              {t("applyNow")}
            </a>
            <p
              style={{
                margin: "24px 0 0",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: 17,
                color: HCB.muted,
              }}
            >
              {t("runHq")}{" "}
              <a
                href="https://hcb.hackclub.com/hq"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: FISCAL_COLORS.primary,
                  textDecoration: "none",
                  borderBottom: `1px solid ${RED}`,
                }}
              >
                {t("seeOurFinances")}
              </a>
            </p>
          </div>
        </section>

        <section style={{ ...sectionPadding, backgroundColor: HCB.darker }}>
          <SectionHeading
            eyebrow={t("allianceEyebrow")}
            title={t.rich("allianceTitle", { first: (chunks) => <i>{chunks}</i> })}
            body={t("allianceBody")}
          />
          {/* Placeholder until Mark's endorsement quote and headshot arrive. */}
          <QuoteCard quote={t("markQuote")} name={t("markName")} role={t("markRole")} />
        </section>
      </main>
      <Footer />
    </>
  );
}
