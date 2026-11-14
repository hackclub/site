"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import styles from "./FeatureCards.module.css";

export type FeatureItem = {
  key: string;
  icon: string;
  name: string;
  lead: string;
  points: string[];
  // A real screenshot of the feature in HCB.
  image?: { src: string; alt: string; width: number; height: number };
};

const AUTOPLAY_MS = 6000;

function mediaQueryStore(query: string) {
  return {
    subscribe(callback: () => void) {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    matches: () => window.matchMedia(query).matches,
  };
}

// Keep in sync with the breakpoint in FeatureCards.module.css: narrower screens get an accordion,
// wider screens get tabs.
const stackedQuery = mediaQueryStore("(max-width: 820px)");
const reducedMotionQuery = mediaQueryStore("(prefers-reduced-motion: reduce)");

function useMediaQuery(store: ReturnType<typeof mediaQueryStore>) {
  return useSyncExternalStore(store.subscribe, store.matches, () => false);
}

function FeatureBody({ item, headingLevel }: { item: FeatureItem; headingLevel: "h3" | "none" }) {
  return (
    <div className={styles.body}>
      <div className={styles.intro}>
        {headingLevel === "h3" ? (
          <div className={styles.heading}>
            <span className={styles.icon}>
              <Icon glyph={item.icon} size={26} />
            </span>
            <h3 className={styles.name}>{item.name}</h3>
          </div>
        ) : null}
        <p className={styles.lead}>{item.lead}</p>
      </div>
      <ul className={styles.points}>
        {item.points.map((point) => (
          <li key={point}>
            <Icon glyph="checkmark" size={26} style={{ color: "#33d6a6", flexShrink: 0 }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {item.image ? (
        // Screenshots are 2x captures; capping them at their natural size keeps HCB's UI text true to scale.
        <div className={styles.shot} style={{ maxWidth: item.image.width / 2 }}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            sizes="(max-width: 820px) 92vw, 760px"
          />
        </div>
      ) : null}
    </div>
  );
}

export function FeatureCards({ items, label }: { items: FeatureItem[]; label: string }) {
  const isStacked = useMediaQuery(stackedQuery);
  const reducedMotion = useMediaQuery(reducedMotionQuery);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const total = items.length;
  // Only the desktop tabs auto-advance; on phones the reader opens what they want.
  const autoplaying = !isStacked && !stopped && !hovered && visible && !reducedMotion;

  // Any manual move stops the auto-advance for good.
  const go = (next: number) => {
    setIndex(((next % total) + total) % total);
    setStopped(true);
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
    // Keyboard focus stops autoplay for good, so the selection never moves out from under a focused tab.
    const stop = () => setStopped(true);
    node.addEventListener("mouseenter", pause);
    node.addEventListener("mouseleave", resume);
    node.addEventListener("focusin", stop);
    return () => {
      observer.disconnect();
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("mouseleave", resume);
      node.removeEventListener("focusin", stop);
    };
  }, []);

  // Plays through the features once, then rests on the first one, so the motion doesn't run forever.
  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setTimeout(() => {
      if (index === total - 1) {
        setIndex(0);
        setStopped(true);
      } else {
        setIndex(index + 1);
      }
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplaying, index, total]);

  // Desktop is a vertical tablist; the arrow keys move through it as the WAI-ARIA tabs pattern expects.
  const onTabKeys = (event: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: total - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = ((moves[event.key] % total) + total) % total;
    go(next);
    tabRefs.current[next]?.focus();
  };

  // Phones: an accordion, first item open, so six features don't stretch the page.
  if (isStacked) {
    return (
      <section ref={rootRef} className={styles.accordion} aria-label={label}>
        {items.map((item, i) => (
          <details key={item.key} className={styles.item} open={i === 0}>
            <summary className={styles.summary}>
              <span className={styles.tabIcon}>
                <Icon glyph={item.icon} size={22} />
              </span>
              <h3 className={styles.summaryName}>{item.name}</h3>
              <Icon glyph="down-caret" size={24} className={styles.caret} />
            </summary>
            <FeatureBody item={item} headingLevel="none" />
          </details>
        ))}
      </section>
    );
  }

  return (
    <section ref={rootRef} className={styles.features} aria-label={label}>
      <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-label={label}>
        {items.map((item, i) => (
          <button
            key={item.key}
            ref={(node) => {
              tabRefs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={i === index ? 0 : -1}
            className={i === index ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => go(i)}
            onKeyDown={onTabKeys}
          >
            <span className={styles.tabIcon}>
              <Icon glyph={item.icon} size={22} />
            </span>
            {item.name}
            {/* Fills over one autoplay interval; it remounts whenever the timer restarts. */}
            {i === index && autoplaying ? (
              <span
                className={styles.tabProgress}
                style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                aria-hidden="true"
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {items.map((item, i) => (
          <div
            key={item.key}
            id={`${baseId}-panel-${i}`}
            className={styles.feature}
            data-active={i === index}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`${baseId}-tab-${i}`}
          >
            <FeatureBody item={item} headingLevel="h3" />
          </div>
        ))}
      </div>
    </section>
  );
}
