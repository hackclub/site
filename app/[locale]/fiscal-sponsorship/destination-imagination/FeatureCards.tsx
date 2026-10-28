"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import styles from "./FeatureCards.module.css";

export type FeatureItem = {
  key: string;
  icon: string;
  name: string;
  lead: string;
  points: string[];
  imageAlt: string;
};

type Labels = {
  region: string;
  previous: string;
  next: string;
  goTo: (number: number) => string;
  counter: (current: number, total: number) => string;
};

const SWIPE_THRESHOLD = 50;
const AUTOPLAY_MS = 6000;

export function FeatureCards({ items, labels }: { items: FeatureItem[]; labels: Labels }) {
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const swipeStart = useRef<number | null>(null);
  const total = items.length;

  // Any manual move stops the auto-advance for good.
  const go = (next: number) => {
    setIndex(((next % total) + total) % total);
    setStopped(true);
  };
  const onArrowKeys = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(index + 1);
    if (event.key === "ArrowLeft") go(index - 1);
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.5 },
    );
    observer.observe(node);
    const pause = () => setHovered(true);
    const resume = () => setHovered(false);
    node.addEventListener("mouseenter", pause);
    node.addEventListener("mouseleave", resume);
    node.addEventListener("focusin", pause);
    node.addEventListener("focusout", resume);
    return () => {
      observer.disconnect();
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("mouseleave", resume);
      node.removeEventListener("focusin", pause);
      node.removeEventListener("focusout", resume);
    };
  }, []);

  useEffect(() => {
    if (stopped || hovered || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [stopped, hovered, visible, index, total]);

  return (
    <section
      ref={rootRef}
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label={labels.region}
    >
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={() => go(index - 1)}
        onKeyDown={onArrowKeys}
        aria-label={labels.previous}
      >
        ←
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={() => go(index + 1)}
        onKeyDown={onArrowKeys}
        aria-label={labels.next}
      >
        →
      </button>

      <div
        className={styles.viewport}
        onPointerDown={(event) => {
          swipeStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (swipeStart.current === null) return;
          const dx = event.clientX - swipeStart.current;
          swipeStart.current = null;
          if (dx <= -SWIPE_THRESHOLD) go(index + 1);
          if (dx >= SWIPE_THRESHOLD) go(index - 1);
        }}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item, i) => (
            <article
              key={item.key}
              className={styles.feature}
              aria-roledescription="slide"
              aria-label={labels.counter(i + 1, total)}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <figure className={styles.picture}>
                <div aria-hidden="true" className={styles.pictureInner}>
                  <Mockup kind={item.key} />
                </div>
                <figcaption className={styles.srOnly}>{item.imageAlt}</figcaption>
              </figure>
              <div className={styles.body}>
                <p className={styles.counter}>{labels.counter(i + 1, total)}</p>
                <div className={styles.heading}>
                  <span className={styles.icon}>
                    <Icon glyph={item.icon} size={26} />
                  </span>
                  <h3 className={styles.name}>{item.name}</h3>
                </div>
                <p className={styles.lead}>{item.lead}</p>
                <ul className={styles.points}>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Icon
                        glyph="checkmark"
                        size={26}
                        style={{ color: "#33d6a6", flexShrink: 0 }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            onClick={() => go(i)}
            onKeyDown={onArrowKeys}
            aria-label={labels.goTo(i + 1)}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}

function Mockup({ kind }: { kind: string }) {
  switch (kind) {
    case "Nonprofit":
      return <ReceiptEmailMockup />;
    case "Donations":
      return <DonationMockup />;
    case "Records":
      return <LedgerMockup />;
    case "Cards":
      return <CardMockup />;
    case "Reimburse":
      return <ReimbursementMockup />;
    case "Balance":
      return <TransparencyMockup />;
    default:
      return null;
  }
}

const TEAM = "Cardboard Comets";

function Badge({
  tone,
  children,
}: {
  tone: "success" | "warning" | "muted" | "purple";
  children: ReactNode;
}) {
  return <span className={`${styles.badge} ${styles[`badge-${tone}`]}`}>{children}</span>;
}

function ReceiptEmailMockup() {
  return (
    <div className={styles.appCard}>
      <p className={styles.emailSubject}>Your donation to {TEAM}</p>
      <p className={styles.emailLine}>Hi Jordan,</p>
      <p className={styles.emailLine}>
        Thank you for your generous donation of <strong>$100.00</strong> to {TEAM}. Please consider
        this email a receipt for your gift.
      </p>
      <p className={styles.emailLine}>
        {TEAM} is fiscally sponsored by Hack Club, a 501(c)(3) nonprofit. Our EIN is 81-2908499.
      </p>
      <p className={`${styles.emailLine} ${styles.appMuted}`}>Best regards, The HCB Team</p>
    </div>
  );
}

function DonationMockup() {
  return (
    <div className={styles.stack}>
      <div className={styles.appCard}>
        <p className={styles.donateTo}>Donate to</p>
        <p className={styles.donateOrg}>{TEAM}</p>
        <p className={styles.goalLine}>
          <strong>$1,240</strong> raised of $5,000 goal.
        </p>
        <div className={styles.goalBar}>
          <span style={{ width: "25%" }} />
        </div>
        <div className={styles.tabs}>
          <span className={styles.tabActive}>One-time</span>
          <span>Monthly</span>
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Donation amount</span>
          <span className={styles.fieldInput}>
            <span className={styles.appMuted}>$</span>100.00
          </span>
        </div>
        <span className={styles.check}>
          <span className={styles.checkbox} /> Add $3.30 to cover all fees
        </span>
        <span className={styles.btnSuccess}>Continue →</span>
      </div>
      <div className={styles.phone}>
        <span className={styles.phoneIcon}>◉</span>
        <span>Tap to pay</span>
        <strong>$20.00</strong>
      </div>
    </div>
  );
}

function LedgerMockup() {
  const rows = [
    { date: "Oct 3, 2025", memo: "Craft store", amount: "-$38.42", receipts: 1 },
    { date: "Oct 2, 2025", memo: "Hardware store", amount: "-$64.17", receipts: 1 },
    { date: "Sep 30, 2025", memo: "Pizza after practice", amount: "-$48.75", receipts: 0 },
  ];
  return (
    <div className={`${styles.appCard} ${styles.appCardFlush}`}>
      <p className={styles.appH3}>Transactions</p>
      {rows.map((row) => (
        <div key={row.memo} className={styles.txRow}>
          <span className={`${styles.txIcon} ${styles.appMuted}`}>
            <Icon glyph="card" size={20} />
          </span>
          <span className={`${styles.txDate} ${styles.appMuted}`}>{row.date}</span>
          <span className={styles.txMemo}>{row.memo}</span>
          <span
            className={
              row.receipts === 0
                ? `${styles.listBadge} ${styles.listBadgeWarning}`
                : styles.listBadge
            }
          >
            <Icon glyph="payment-docs" size={16} />
            {row.receipts}
          </span>
          <span className={styles.txAmount}>{row.amount}</span>
        </div>
      ))}
    </div>
  );
}

function CardMockup() {
  return (
    <div className={styles.stack}>
      <div className={styles.stripeCard}>
        <span className={styles.stripeChip} />
        <p className={styles.stripeNumber}>•••• •••• •••• 4821</p>
        <p className={styles.stripeName}>
          JAMIE RIVERA <span className={styles.stripeStatus}>Active</span>
        </p>
      </div>
      <div className={styles.cardActions}>
        <span className={styles.actionBtn}>
          <Icon glyph="freeze" size={18} /> Freeze
        </span>
        <span className={`${styles.actionBtn} ${styles.actionBtnError}`}>Burn</span>
        <span className={styles.actionBtn}>Rename</span>
      </div>
    </div>
  );
}

function ReimbursementMockup() {
  return (
    <div className={styles.appCard}>
      <p className={styles.appMuted}>
        Jamie Rivera is requesting <strong className={styles.appStrong}>$44.89</strong> for{" "}
        <Badge tone="success">Reimbursed</Badge>
      </p>
      <p className={styles.appH2}>Costume fabric</p>
      <div className={styles.expense}>
        <span className={styles.expenseCode}>#1</span>
        <span className={styles.expenseMemo}>Costume fabric</span>
        <span className={styles.listBadge}>
          <Icon glyph="payment-docs" size={16} />1
        </span>
        <span className={styles.txAmount}>$44.89</span>
      </div>
      <p className={styles.appH3}>Payout information</p>
      <div className={styles.kv}>
        <span className={styles.appMuted}>Payout method</span>
        <span>ACH Transfer</span>
      </div>
      <div className={styles.kv}>
        <span className={styles.appMuted}>Recipient</span>
        <span>Jamie Rivera</span>
      </div>
    </div>
  );
}

function TransparencyMockup() {
  const chart = "M0 58 C 30 56, 50 50, 80 52 S 130 36, 160 40 S 220 18, 260 12 L 260 70 L 0 70 Z";
  const line = "M0 58 C 30 56, 50 50, 80 52 S 130 36, 160 40 S 220 18, 260 12";
  return (
    <div className={styles.stack}>
      <p className={styles.transparencyBanner}>{TEAM} has made their finances public using HCB</p>
      <div className={styles.homeGrid}>
        <div className={styles.appCard}>
          <p className={styles.appH3}>Account balance</p>
          <p className={styles.statValue}>$2,418.36</p>
          <svg className={styles.sparkline} viewBox="0 0 260 70" preserveAspectRatio="none">
            <path d={chart} fill="rgba(51,214,166,0.3)" />
            <path
              d={line}
              fill="none"
              stroke="#33d6a6"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className={styles.appCard}>
          <p className={styles.appH3}>Team members</p>
          <div className={styles.avatars}>
            <span className={styles.avatar}>TM</span>
            <span className={styles.avatar}>JR</span>
            <span className={styles.avatar}>AL</span>
            <span className={`${styles.avatar} ${styles.avatarMore}`}>+2</span>
          </div>
          <p className={styles.appMuted}>2 managers · 3 readers</p>
        </div>
      </div>
    </div>
  );
}
