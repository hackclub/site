"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeLock } from "@/components/ThemeToggle";
import { Icon } from "@/components/Icon";
import {
  FISCAL_COLORS,
  FISCAL_CONTACT,
  FISCAL_TYPOGRAPHY,
} from "@/components/fiscal-sponsorship/constants";
import { caveat } from "@/app/fonts";
import { FeatureCards } from "./FeatureCards";
import pageStyles from "./DIPage.module.css";
import { LedgerBackground } from "./LedgerBackground";

type HCBStats = {
  transactions_volume?: number;
};

type GlobalFinalsStep = { when: string; what: string };
type CostPoint = { title: string; body: string };

// HCB's referral code for this page. HCB saves `ref` on the application (and syncs it to Airtable),
// so DI applicants can be counted.
const APPLY_URL = "https://hcb.hackclub.com/applications/new?ref=destination-imagination";

// Debit cards are the pain Team Managers feel first (fronting costs on a personal card), so they come second.
// Each feature has a real HCB screenshot: public production pages, with people shown only by initials.
const SHOT_DIR = "/fiscal-sponsorship/destination-imagination/screenshots";
const FEATURE_KEYS = [
  {
    icon: "bank-account",
    key: "Nonprofit",
    shot: { file: "nonprofit.daac4a98.webp", width: 1400, height: 1100 },
  },
  { icon: "card", key: "Cards", shot: { file: "cards.19f3c6f6.webp", width: 1400, height: 1174 } },
  {
    icon: "support",
    key: "Donations",
    shot: { file: "donations.1ad5e4b9.webp", width: 1400, height: 1204 },
  },
  {
    icon: "payment-transfer",
    key: "Reimburse",
    shot: { file: "reimbursements.4e516fff.webp", width: 1400, height: 971 },
  },
  {
    icon: "docs",
    key: "Records",
    shot: { file: "receipts.138a60ba.webp", width: 1400, height: 1225 },
  },
  {
    icon: "controls",
    key: "Balance",
    shot: { file: "roles.5f0db0de.webp", width: 1400, height: 1090 },
  },
] as const;
// A public FIRST team on HCB with a clean, current ledger, until a DI team's can take its place.
const PUBLIC_FINANCES_URL = "https://hcb.hackclub.com/apricot-robotics";
const BADGE_KEYS = ["badgeNonprofit", "badgeDonations", "badgeCards"] as const;
// Photos from DI's own websites (destinationimagination.org and globalfinals.org), pending DI's OK.
const PHOTO_DIR = "/fiscal-sponsorship/destination-imagination/photos";
const PHOTOS = [
  { src: `${PHOTO_DIR}/building.webp`, alt: "photoBuilding" },
  { src: `${PHOTO_DIR}/presenting.webp`, alt: "photoPresenting" },
  { src: `${PHOTO_DIR}/team-managers.webp`, alt: "photoTeamManagers" },
] as const;
// HCB's dark theme tokens, taken from hcb.hackclub.com's stylesheet.
const HCB = {
  dark: "#17171d",
  darker: "#121217",
  card: "#252429",
  smoke: "#e0e6ed",
  muted: "#8492a6",
  outline: "inset 0 0 0 0.5px hsla(0, 0%, 100%, 0.25)",
} as const;
// From DI's brand guide: a primary purple that's safe under white text (chips, step numbers), and a
// secondary purple for accents that never sit under text (icons, the quote mark).
const ACCENT = "#6133aa";
const ACCENT_LIGHT = "#b95ddb";
const GREEN = "#33d6a6";
const RED = "#ec3750";

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type MoneyToken =
  | { type: "static"; value: string }
  | { type: "digit"; value: number; key: string; delay: number; turns: number };

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function getMoneyTokens(amount: number) {
  const tokens: MoneyToken[] = [];
  let digitIndex = 0;

  for (const part of moneyFormatter.formatToParts(amount / 100)) {
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
  animate,
}: {
  digit: number;
  delay: number;
  turns: number;
  reveal: boolean;
  animate: boolean;
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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: reveal ? `translateY(${-(turns * 10 + digit)}em)` : "translateY(0em)",
          transition: animate ? "transform 1800ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          transitionDelay: reveal && animate ? `${delay}s` : "0s",
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
  const reducedMotion = usePrefersReducedMotion();
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
        // 1em reserves the line before the stats load, so nothing shifts when they arrive.
        minHeight: "1em",
        display: "flex",
        alignItems: "flex-end",
        lineHeight: 1,
        fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
        // Sized to fit the Apply card's side panel, and a 360px phone.
        fontSize: "clamp(30px, 3.4vw, 44px)",
        fontWeight: 700,
        letterSpacing: "-0.05em",
        color: GREEN,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {amount === undefined ? (
        <span aria-hidden="true" style={{ color: HCB.muted, fontSize: 24 }}>
          ...
        </span>
      ) : (
        <>
          {/* The wheels read as a jumble of digits, so screen readers get the formatted amount instead. */}
          <span style={visuallyHidden}>{moneyFormatter.format(amount / 100)}</span>
          <span aria-hidden="true" style={{ display: "flex", alignItems: "flex-end" }}>
            {getMoneyTokens(amount).map((token, index) =>
              token.type === "digit" ? (
                <MoneyWheel
                  key={token.key}
                  digit={token.value}
                  delay={token.delay}
                  turns={token.turns}
                  reveal={isVisible || reducedMotion}
                  animate={!reducedMotion}
                />
              ) : (
                <span key={index} style={{ whiteSpace: "pre" }}>
                  {token.value}
                </span>
              ),
            )}
          </span>
        </>
      )}
    </div>
  );
}

function QuoteCard({
  quote,
  name,
  role,
  photo,
}: {
  quote: ReactNode;
  name: string;
  role: string;
  photo: string;
}) {
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
          fontSize: "clamp(64px, 9vw, 96px)",
          lineHeight: 0.6,
          color: ACCENT_LIGHT,
          marginBottom: 4,
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
      <figcaption style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32 }}>
        {/* Decorative: the name is right beside it, so screen readers skip the photo. */}
        <Image
          src={photo}
          alt=""
          width={96}
          height={96}
          style={{
            width: "clamp(64px, 12vw, 96px)",
            height: "clamp(64px, 12vw, 96px)",
            borderRadius: 9999,
            flexShrink: 0,
            objectFit: "cover",
            boxShadow: `0 0 0 3px ${ACCENT_LIGHT}`,
          }}
        />
        <span style={{ fontFamily: FISCAL_TYPOGRAPHY.bodyFont }}>
          <span style={{ display: "block", fontWeight: 700, fontSize: 20, color: "#ffffff" }}>
            {name}
          </span>
          <span style={{ display: "block", fontSize: 17, color: HCB.muted }}>{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      style={{
        maxWidth: 760,
        margin: align === "center" ? "0 auto 40px" : "0 0 32px",
        textAlign: align,
      }}
    >
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
          textWrap: "balance",
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
            textWrap: "balance",
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

// Links in running text carry an underline, not just a color (WCAG 1.4.1).
const inlineLink = {
  color: HCB.smoke,
  textDecoration: "none",
  borderBottom: `1px solid ${RED}`,
} as const;

// DI's brand guide keeps half the logo's height clear on every side; at its 1:4 aspect ratio that is width / 8.
const LOGO_WIDTH = "clamp(180px, min(32vw, 30vh), 320px)";

const sectionPadding = {
  paddingTop: "clamp(56px, 7vw, 96px)",
  paddingBottom: "clamp(56px, 7vw, 96px)",
  paddingLeft: "clamp(16px, 4vw, 64px)",
  paddingRight: "clamp(16px, 4vw, 64px)",
} as const;

export function DIPageClient() {
  const t = useTranslations("HcbDI");
  const tHcb = useTranslations("Hcb");
  // FIRST's trademark policy: the word mark is always italic; ® goes on its first heading and first body use.
  const italicFirst = (chunks: ReactNode) => <i>{chunks}</i>;
  // Where ® follows, a hair of space keeps it off the italic T.
  const italicFirstReg = (chunks: ReactNode) => <i style={{ paddingRight: "0.08em" }}>{chunks}</i>;
  // In a headline a full-size ® crowds the word, so it sits as a small superscript.
  const registered = (chunks: ReactNode) => (
    <span style={{ fontSize: "0.4em", verticalAlign: "1.1em", lineHeight: 0, marginLeft: "0.4em" }}>
      {chunks}
    </span>
  );
  const [volume, setVolume] = useState<number | undefined>();
  const [statsFailed, setStatsFailed] = useState(false);
  const features = FEATURE_KEYS.map((feature) => ({
    key: feature.key,
    icon: feature.icon,
    name: t(`feature${feature.key}Name`),
    lead: t(`feature${feature.key}Lead`),
    points: t.raw(`feature${feature.key}Points`) as string[],
    image: {
      src: `${SHOT_DIR}/${feature.shot.file}`,
      alt: t(`feature${feature.key}ShotAlt`),
      width: feature.shot.width,
      height: feature.shot.height,
    },
  }));
  const globalFinalsSteps = t.raw("globalFinalsSteps") as GlobalFinalsStep[];
  const costPoints = t.raw("costPoints") as CostPoint[];

  useEffect(() => {
    fetch("https://hcb.hackclub.com/stats", { signal: AbortSignal.timeout(10_000) })
      .then((res) => {
        if (!res.ok) throw new Error(`HCB stats returned ${res.status}`);
        return res.json() as Promise<HCBStats>;
      })
      .then((data) => {
        if (typeof data?.transactions_volume !== "number") {
          throw new Error("HCB stats missing transactions_volume");
        }
        setVolume(data.transactions_volume);
      })
      // The amount is decoration; if HCB is unreachable, drop the line rather than spin forever.
      .catch(() => setStatsFailed(true));
  }, []);

  const ledgerIncoming = t.raw("ledgerIncoming") as string[];
  const ledgerOutgoing = t.raw("ledgerOutgoing") as string[];

  return (
    <>
      <ThemeLock />
      <Navbar invertColors />
      <main
        id="main"
        tabIndex={-1}
        className={pageStyles.page}
        style={{ backgroundColor: HCB.dark }}
      >
        <section
          style={{
            position: "relative",
            minHeight: "min(92vh, 860px)",
            display: "flex",
            alignItems: "center",
            // Shrinks on short laptop and phone screens so the CTA stays above the fold.
            paddingTop: "clamp(88px, 12vh, 104px)",
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
            {/* DI's full-color logo with white text, their official version for dark backgrounds.
                Sized for its ≤320px slot (2x for retina) so it doesn't download at 3000px. */}
            <div
              style={{
                position: "relative",
                width: LOGO_WIDTH,
                margin: `0 auto calc(${LOGO_WIDTH} / 8)`,
              }}
            >
              {/* A solid backdrop over the logo's clear space, so the moving ledger never passes behind it. */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-50% -12.5%",
                  borderRadius: 24,
                  backgroundColor: HCB.darker,
                  boxShadow: `0 0 32px 16px ${HCB.darker}`,
                }}
              />
              <Image
                src="/fiscal-sponsorship/destination-imagination/logo.png"
                alt={t("logoAlt")}
                width={640}
                height={160}
                sizes="320px"
                priority
                style={{ position: "relative", display: "block", width: "100%", height: "auto" }}
              />
            </div>
            <p
              style={{
                // Positioned so it paints above the logo backdrop's soft edge.
                position: "relative",
                margin: "0 0 18px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontSize: 13,
                fontWeight: 700,
                // A lighter HCB red, so 13px text clears 4.5:1 on the dark hero.
                color: "#f15a6c",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              }}
            >
              {t("heroEyebrow")}
            </p>
            <h1
              style={{
                fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                fontSize: "clamp(40px, min(7.4vw, 10vh), 88px)",
                lineHeight: 0.98,
                margin: 0,
                color: "#ffffff",
                textShadow: "0 0 40px rgba(18,18,23,0.9)",
              }}
            >
              {/* DI's name stays plain: their brand guide rules out stylized versions of it. */}
              {t.rich("heroTitle", { highlight: (chunks) => chunks })}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 28,
              }}
            >
              <a href="#apply" style={{ ...pillButton, backgroundColor: FISCAL_COLORS.primary }}>
                {t("openAccount")}
              </a>
            </div>
            {/* Who runs HCB, answered before a Team Manager has to wonder. */}
            <p
              style={{
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: 15,
                lineHeight: 1.5,
                color: HCB.muted,
                margin: "16px auto 0",
                maxWidth: 680,
                textShadow: "0 0 16px rgba(18,18,23,0.9)",
              }}
            >
              {t("heroTrust")}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "24px auto 0",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px 28px",
                maxWidth: 760,
              }}
            >
              {BADGE_KEYS.map((badge) => (
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
                  {t(badge)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mark's quote right after the hero: DI's CEO vouching for HCB is the strongest reason to keep reading. */}
        <section id="quote" style={{ ...sectionPadding, scrollMarginTop: 96 }}>
          {/* Mark's quote is verbatim from his email; the headshot is DI's official one from their staff page. */}
          <QuoteCard
            quote={t.rich("markQuote", { em: (chunks) => <em>{chunks}</em> })}
            name={t("markName")}
            role={t("markRole")}
            photo="/fiscal-sponsorship/destination-imagination/mark-giordono-headshot.webp"
          />
          <ul className={pageStyles.photos}>
            {PHOTOS.map((photo) => (
              <li key={photo.src} className={pageStyles.photo}>
                <Image
                  src={photo.src}
                  alt={t(photo.alt)}
                  fill
                  sizes="(max-width: 720px) 78vw, 370px"
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          id="features"
          style={{ ...sectionPadding, scrollMarginTop: 96, backgroundColor: HCB.darker }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div className={pageStyles.featuresHeading}>
              <SectionHeading title={t("featuresTitle")} body={t("featuresBody")} />
              <p className={`${pageStyles.note} ${caveat.className}`}>
                {t("featuresNote")}
                <svg
                  className={pageStyles.noteArrow}
                  viewBox="0 0 92 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M86 5c-8 15-24 27-48 30-10 1-20 0-29-4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17 22 7 31l12 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </div>
            <FeatureCards items={features} label={t("featuresEyebrow")} />
          </div>
        </section>

        <section id="global-finals" style={{ ...sectionPadding, scrollMarginTop: 96 }}>
          <div className={pageStyles.finals}>
            <div>
              <SectionHeading
                align="left"
                title={t("globalFinalsTitle")}
                body={t("globalFinalsBody")}
              />
              {/* The DI season, from opening the account to the trip to Kansas City. */}
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {globalFinalsSteps.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "32px minmax(0, 1fr)",
                      columnGap: 16,
                      rowGap: 4,
                      padding: "18px 20px",
                      borderRadius: 12,
                      backgroundColor: HCB.card,
                      boxShadow: HCB.outline,
                      fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        gridRow: "span 2",
                        width: 32,
                        height: 32,
                        borderRadius: 9999,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: ACCENT,
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontSize: 13,
                        fontWeight: 700,
                        color: HCB.muted,
                      }}
                    >
                      {step.when}
                    </p>
                    <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: HCB.smoke }}>
                      {step.what}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <figure className={pageStyles.finalsPhoto}>
              <Image
                src={`${PHOTO_DIR}/global-finals.webp`}
                alt={t("photoGlobalFinals")}
                fill
                sizes="(max-width: 860px) 100vw, 480px"
              />
            </figure>
          </div>
        </section>

        <section id="first" style={{ ...sectionPadding, backgroundColor: HCB.darker }}>
          <SectionHeading
            title={t.rich("allianceTitle", { first: italicFirstReg, reg: registered })}
            body={t.rich("allianceBody", {
              first: italicFirst,
              link: (chunks) => (
                <a href={PUBLIC_FINANCES_URL} target="_blank" rel="noreferrer" style={inlineLink}>
                  {chunks}
                </a>
              ),
            })}
          />
        </section>

        {/* Extra bottom padding: the footer's illustration rises into this section and would otherwise
            sit on the Apply card's corner. */}
        <section style={{ ...sectionPadding, paddingBottom: "clamp(120px, 18vw, 260px)" }}>
          {/* What HCB costs, answered before the Apply button rather than in the agreement. */}
          <div
            id="pricing"
            style={{ maxWidth: 1120, margin: "0 auto clamp(48px, 6vw, 72px)", scrollMarginTop: 96 }}
          >
            <SectionHeading title={t("costTitle")} body={t("costBody")} />
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {costPoints.map((point) => (
                <li
                  key={point.title}
                  style={{
                    padding: "24px 24px 28px",
                    borderRadius: 12,
                    backgroundColor: HCB.card,
                    boxShadow: HCB.outline,
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                      fontSize: 30,
                      lineHeight: 1.1,
                      color: "#ffffff",
                    }}
                  >
                    {point.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: HCB.smoke }}>
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
            <p
              style={{
                maxWidth: 760,
                margin: "24px auto 0",
                textAlign: "center",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: 17,
                lineHeight: 1.5,
                color: HCB.muted,
              }}
            >
              {t("costTeams")}
            </p>
          </div>
          <div id="apply" className={pageStyles.applyCard}>
            <div className={pageStyles.applyMain}>
              <div>
                <SectionHeading align="left" title={t("applyTitle")} body={t("applyBody")} />
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...pillButton, backgroundColor: FISCAL_COLORS.primary }}
                >
                  {t("applyNow")}
                </a>
                <p className={pageStyles.applyContact}>
                  {t.rich("contactQuestions", {
                    email: () => (
                      <a
                        href={`mailto:${FISCAL_CONTACT.email}`}
                        style={{ ...inlineLink, whiteSpace: "nowrap" }}
                      >
                        {FISCAL_CONTACT.email}
                      </a>
                    ),
                  })}
                </p>
              </div>
              {/* HCB's lifetime volume, plus Hack Club's own public ledger as proof it's real. */}
              <div className={pageStyles.statPanel}>
                {statsFailed ? null : (
                  <>
                    <p className={pageStyles.statLabel}>{t("soFarEnabled")}</p>
                    <AnimatedMoney amount={volume} />
                    <p className={pageStyles.statLabel} style={{ marginTop: 10 }}>
                      {t("inTransactions")}
                    </p>
                  </>
                )}
                <p className={pageStyles.statHq}>
                  {t("runHq")}{" "}
                  <a
                    href="https://hcb.hackclub.com/hq"
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...inlineLink, whiteSpace: "nowrap" }}
                  >
                    {t("seeOurFinances")}
                  </a>
                </p>
              </div>
            </div>
            {/* Who runs HCB, who issues the cards, and whose trademarks these are. Kept inside the card
                so the footer's illustration, which rises into the section above it, never covers it. */}
            <div className={pageStyles.legal}>
              <div>
                <p>{t("legalHcb")}</p>
                <p>{tHcb("contactNotice")}</p>
              </div>
              <div>
                <p>{t.rich("legalTrademarks", { first: italicFirstReg })}</p>
                <p>{t("legalPhotos")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
