"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

type Styles = Record<string, string>;

type StatKey = "online" | "channels" | "messages" | "members";

type Stat = {
  key: StatKey;
  value: number;
  labelKey:
    | "joiningStatOnline"
    | "joiningStatChannels"
    | "joiningStatMessages"
    | "joiningStatMembers";
};

type SlackApiSnapshot = {
  readers_count_1d: number;
  chats_channels_count_1d: number;
  messages_count_1d: number;
  total_members_count: number;
};

type SlackApiResponse = { stats?: SlackApiSnapshot[] };

async function fetchSlackStats(): Promise<Stat[] | null> {
  try {
    const response = await fetch("https://slack-data.hackclub.dev/full", { cache: "no-store" });
    if (!response.ok) return null;

    const data = (await response.json()) as SlackApiResponse;
    const latest = data.stats?.[data.stats.length - 1];
    if (!latest) return null;

    return [
      { key: "online", value: latest.readers_count_1d, labelKey: "joiningStatOnline" },
      { key: "channels", value: latest.chats_channels_count_1d, labelKey: "joiningStatChannels" },
      { key: "messages", value: latest.messages_count_1d, labelKey: "joiningStatMessages" },
      { key: "members", value: latest.total_members_count, labelKey: "joiningStatMembers" },
    ];
  } catch {
    return null;
  }
}

function StatIcon({ statKey }: { statKey: StatKey }) {
  if (statKey === "online") {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="5.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.25" fill="currentColor" />
      </svg>
    );
  }

  if (statKey === "channels") {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" aria-hidden="true">
        <path d="M10 3.8L8.8 20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.2 3.8L14 20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3.8 10H20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3.8 15.2H20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (statKey === "messages") {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" aria-hidden="true">
        <path
          d="M6.1 5.7H17.9C18.9 5.7 19.7 6.5 19.7 7.5V14.6C19.7 15.6 18.9 16.4 17.9 16.4H10.6L6.1 19V7.5C6.1 6.5 5.1 5.7 6.1 5.7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="9.4" cy="11" r="1" fill="currentColor" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <circle cx="14.6" cy="11" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.2" r="2.7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="15.9" cy="10.4" r="2.1" stroke="currentColor" strokeWidth="1.8" opacity="0.78" />
      <path
        d="M4.8 18.8C5.3 15.9 7.5 14.3 9.9 14.3C12.3 14.3 14.6 15.9 15.1 18.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.9 18.2C14.1 16.6 15.5 15.5 17 15.5C18.4 15.5 19.7 16.6 19.9 18.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.78"
      />
    </svg>
  );
}

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useCountUp(target: number, animate: boolean, delayMs: number) {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animate || reducedMotion) return;

    let raf = 0;
    const duration = 900;
    const start = performance.now() + delayMs;
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, reducedMotion, target, delayMs]);

  return animate && reducedMotion ? target : value;
}

function StatBadge({
  stat,
  styles,
  animate,
  delay,
}: {
  stat: Stat;
  styles: Styles;
  animate: boolean;
  delay: number;
}) {
  const t = useTranslations("Home");
  const value = useCountUp(stat.value, animate, delay);

  return (
    <div
      className={styles["clubs-slack-stat"]}
      data-visible={animate}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles["clubs-slack-stat-icon"]}>
        <StatIcon statKey={stat.key} />
      </span>
      <span className={styles["clubs-slack-stat-text"]}>
        <strong>{value.toLocaleString("en-US")}</strong> {t(stat.labelKey)}
      </span>
    </div>
  );
}

export function SlackStats({ styles }: { styles: Styles }) {
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void fetchSlackStats().then(setStats);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  if (!stats) return <div ref={containerRef} className={styles["clubs-slack-stats"]} />;

  return (
    <div ref={containerRef} className={styles["clubs-slack-stats"]}>
      {stats.map((stat, index) => (
        <StatBadge
          key={stat.key}
          stat={stat}
          styles={styles}
          animate={visible}
          delay={index * 80}
        />
      ))}
    </div>
  );
}
