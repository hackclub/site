"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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
    </section>
  );
}
