"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useLocale } from "next-intl";
import styles from "./LedgerBackground.module.css";

// Amounts in cents, index-aligned with the ledgerIncoming / ledgerOutgoing translation arrays.
// Adding, removing, or reordering a memo there means updating its row here too.
const INCOMING_AMOUNTS = [
  [2500, 5000, 10000, 25000],
  [18650, 23475],
  [50000, 35000],
  [41200, 38800],
  [25000, 50000],
  [100000],
];
const OUTGOING_AMOUNTS = [
  [3842, 2719],
  [6417, 4388],
  [12500],
  [14280],
  [124000],
  [5630, 8915],
  [2396],
  [4875, 6210],
  [3120],
  [17500],
  [4489],
  [21450],
  [1863, 2457],
];

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

type LedgerRow = { memo: string; incoming: boolean; amount: string };

function buildColumns(incoming: string[], outgoing: string[], count: number): LedgerRow[][] {
  const length = incoming.length + outgoing.length;
  return Array.from({ length: count }, (_, col) =>
    Array.from({ length }, (_, i) => {
      const isIncoming = (i + col) % 3 === 0;
      const pool = isIncoming ? incoming : outgoing;
      const index = (i * (col + 2) + col * 5) % pool.length;
      const options = (isIncoming ? INCOMING_AMOUNTS : OUTGOING_AMOUNTS)[index] ?? [0];
      const cents = options[(i + col) % options.length];
      return {
        memo: pool[index],
        incoming: isIncoming,
        amount: `${isIncoming ? "+" : "−"}${usd.format(cents / 100)}`,
      };
    }),
  );
}

// One DI season for a sample team: [year, month (1-12), day, balance in cents].
// Dips are the Team Number, supplies, tournament registration, and a Global Finals hotel deposit.
// The chartEvents translation keys are indexes into this list.
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

// Owns the hover state on its own, so moving the pointer re-renders only the tooltip, not every ledger row.
function ChartOverlay({
  rootRef,
  chartRef,
  chartEvents,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  chartRef: RefObject<SVGSVGElement | null>;
  chartEvents: Record<string, string>;
}) {
  const locale = useLocale();
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
  }, [rootRef, chartRef]);

  if (!hover) return null;

  const [year, month, day, cents] = BALANCE_HISTORY[hover.index];
  const dateLabel = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));

  return (
    <>
      <span className={styles.guide} style={{ left: hover.left, top: hover.top }} />
      <span className={styles.chartDot} style={{ left: hover.left, top: hover.top }} />
      <span
        className={hover.flip ? `${styles.tip} ${styles.tipFlip}` : styles.tip}
        style={{ left: hover.left, top: hover.top }}
      >
        <span className={styles.tipDate}>{dateLabel}</span>
        <span className={styles.tipAmount}>{usd.format(cents / 100)}</span>
        {chartEvents[hover.index] ? (
          <span className={styles.tipEvent}>{chartEvents[hover.index]}</span>
        ) : null}
      </span>
    </>
  );
}

export function LedgerBackground({
  incoming,
  outgoing,
  chartEvents,
}: {
  incoming: string[];
  outgoing: string[];
  chartEvents: Record<string, string>;
}) {
  const columns = useMemo(() => buildColumns(incoming, outgoing, 3), [incoming, outgoing]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<SVGSVGElement | null>(null);
  const colClass = [styles.col, `${styles.col} ${styles.col1}`, `${styles.col} ${styles.col2}`];

  return (
    <div ref={rootRef} className={styles.ledger} aria-hidden="true">
      <div className={styles.columns}>
        {columns.map((rows, col) => (
          <div key={col} className={colClass[col]}>
            <div className={styles.track}>
              {[...rows, ...rows].map((row, i) => (
                <div
                  key={i}
                  className={row.incoming ? `${styles.row} ${styles.incoming}` : styles.row}
                >
                  <span className={styles.dot} />
                  <span className={styles.memo}>{row.memo}</span>
                  <span className={styles.amount}>{row.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <svg
        ref={chartRef}
        className={styles.chart}
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="di-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#33d6a6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#33d6a6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={FILL_PATH} fill="url(#di-chart-fill)" />
        <path
          d={LINE_PATH}
          fill="none"
          stroke="#33d6a6"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ChartOverlay rootRef={rootRef} chartRef={chartRef} chartEvents={chartEvents} />
    </div>
  );
}
