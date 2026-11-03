"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { Icon } from "@/components/Icon";
import styles from "./FeatureCards.module.css";

export type FeatureItem = {
  key: string;
  icon: string;
  name: string;
  lead: string;
  points: string[];
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
// Keep in sync with the breakpoint in FeatureCards.module.css; wider screens get tabs.
const CAROUSEL_QUERY = "(max-width: 820px)";

function subscribeToCarousel(callback: () => void) {
  const mediaQuery = window.matchMedia(CAROUSEL_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function useIsCarousel() {
  return useSyncExternalStore(
    subscribeToCarousel,
    () => window.matchMedia(CAROUSEL_QUERY).matches,
    () => false,
  );
}

export function FeatureCards({ items, labels }: { items: FeatureItem[]; labels: Labels }) {
  const isCarousel = useIsCarousel();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
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
    if (!isCarousel || stopped || hovered || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [isCarousel, stopped, hovered, visible, index, total]);

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

  return (
    <section
      ref={rootRef}
      className={styles.features}
      aria-roledescription={isCarousel ? "carousel" : undefined}
      aria-label={labels.region}
    >
      <div
        className={styles.tabs}
        role="tablist"
        aria-orientation="vertical"
        aria-label={labels.region}
      >
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
          </button>
        ))}
      </div>

      <div className={styles.stage}>
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
            if (isCarousel) swipeStart.current = event.clientX;
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
          <div
            className={styles.track}
            style={isCarousel ? { transform: `translateX(-${index * 100}%)` } : undefined}
          >
            {items.map((item, i) => (
              <article
                key={item.key}
                id={`${baseId}-panel-${i}`}
                className={styles.feature}
                data-active={i === index}
                role={isCarousel ? undefined : "tabpanel"}
                aria-labelledby={isCarousel ? undefined : `${baseId}-tab-${i}`}
                aria-roledescription={isCarousel ? "slide" : undefined}
                aria-label={isCarousel ? labels.counter(i + 1, total) : undefined}
                aria-hidden={isCarousel && i !== index}
                inert={isCarousel && i !== index}
              >
                <div className={styles.body}>
                  <div className={styles.intro}>
                    <p className={styles.counter}>{labels.counter(i + 1, total)}</p>
                    <div className={styles.heading}>
                      <span className={styles.icon}>
                        <Icon glyph={item.icon} size={26} />
                      </span>
                      <h3 className={styles.name}>{item.name}</h3>
                    </div>
                    <p className={styles.lead}>{item.lead}</p>
                  </div>
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
      </div>
    </section>
  );
}
