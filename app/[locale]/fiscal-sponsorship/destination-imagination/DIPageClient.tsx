"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeLock } from "@/components/ThemeToggle";
import { Icon } from "@/components/Icon";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "@/components/fiscal-sponsorship/constants";
import { FeatureCards } from "./FeatureCards";
import { LedgerBackground } from "./LedgerBackground";

type HCBStats = {
  transactions_volume?: number;
};

type GlobalFinalsStep = { when: string; what: string };

const FEATURE_KEYS = [
  { icon: "bank-account", key: "Nonprofit" },
  { icon: "support", key: "Donations" },
  { icon: "docs", key: "Records" },
  { icon: "card", key: "Cards" },
  { icon: "payment-transfer", key: "Reimburse" },
  { icon: "controls", key: "Balance" },
] as const;
const BADGE_KEYS = ["badgeNonprofit", "badgeDonations", "badgeCards"] as const;
// HCB's dark theme tokens, taken from hcb.hackclub.com's stylesheet.
const HCB = {
  dark: "#17171d",
  darker: "#121217",
  card: "#252429",
  smoke: "#e0e6ed",
  muted: "#8492a6",
  outline: "inset 0 0 0 0.5px hsla(0, 0%, 100%, 0.25)",
} as const;
// DI's purple, from the logo cube and the buttons on destinationimagination.org.
const ACCENT = "#813dd6";
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
        {/* Decorative: the name is right beside it, so screen readers skip the photo. */}
        <Image
          src={photo}
          alt=""
          width={56}
          height={56}
          style={{
            width: 56,
            height: 56,
            borderRadius: 9999,
            flexShrink: 0,
            objectFit: "cover",
            boxShadow: `0 0 0 2px ${ACCENT}`,
          }}
        />
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
  eyebrow?: ReactNode;
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

const sectionPadding = {
  paddingTop: "clamp(56px, 7vw, 96px)",
  paddingBottom: "clamp(56px, 7vw, 96px)",
  paddingLeft: "clamp(16px, 4vw, 64px)",
  paddingRight: "clamp(16px, 4vw, 64px)",
} as const;

export function DIPageClient() {
  const t = useTranslations("HcbDI");
  // FIRST's trademark policy: the word mark is always italic; ® goes on its first heading and first body use.
  const italicFirst = (chunks: ReactNode) => <i>{chunks}</i>;
  const [volume, setVolume] = useState<number | undefined>();
  const [statsFailed, setStatsFailed] = useState(false);
  const features = FEATURE_KEYS.map((feature) => ({
    key: feature.key,
    icon: feature.icon,
    name: t(`feature${feature.key}Name`),
    lead: t(`feature${feature.key}Lead`),
    points: t.raw(`feature${feature.key}Points`) as string[],
  }));
  const globalFinalsSteps = t.raw("globalFinalsSteps") as GlobalFinalsStep[];

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
            {/* DI's full-color logo with white text, their official version for dark backgrounds.
                Sized for its ≤320px slot (2x for retina) so it doesn't download at 3000px. */}
            <Image
              src="/fiscal-sponsorship/destination-imagination/logo.png"
              alt={t("logoAlt")}
              width={640}
              height={160}
              sizes="320px"
              priority
              style={{
                display: "block",
                width: "clamp(220px, 32vw, 320px)",
                height: "auto",
                margin: "0 auto 20px",
              }}
            />
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
                      textShadow: "0 0 18px rgba(129, 61, 214, 0.75)",
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

        <section
          id="global-finals"
          style={{ ...sectionPadding, scrollMarginTop: 96, backgroundColor: HCB.darker }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <SectionHeading
              eyebrow={t("globalFinalsEyebrow")}
              title={t("globalFinalsTitle")}
              body={t("globalFinalsBody")}
            />
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {globalFinalsSteps.map((step, i) => (
                <li
                  key={i}
                  style={{
                    padding: "24px 24px 28px",
                    borderRadius: 12,
                    backgroundColor: HCB.card,
                    boxShadow: HCB.outline,
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9999,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: ACCENT,
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: 16,
                    }}
                  >
                    {i + 1}
                  </span>
                  <p
                    style={{
                      margin: "0 0 6px",
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
        </section>

        <section style={sectionPadding}>
          {/* Mark's quote is verbatim from his email; the headshot is DI's official one from their staff page. */}
          <QuoteCard
            quote={t.rich("markQuote", { em: (chunks) => <em>{chunks}</em> })}
            name={t("markName")}
            role={t("markRole")}
            photo="/fiscal-sponsorship/destination-imagination/mark-giordono.webp"
          />
          <div style={{ marginTop: "clamp(56px, 7vw, 88px)" }}>
            <SectionHeading
              eyebrow={t.rich("allianceEyebrow", { first: italicFirst })}
              title={t.rich("allianceTitle", { first: italicFirst })}
              body={t.rich("allianceBody", { first: italicFirst })}
            />
          </div>
          <p
            style={{
              maxWidth: 760,
              margin: "-12px auto 0",
              textAlign: "center",
              fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              fontSize: 13,
              color: HCB.muted,
            }}
          >
            {t.rich("firstTrademark", { first: italicFirst })}
          </p>
        </section>

        <section
          id="apply"
          style={{ ...sectionPadding, scrollMarginTop: 96, backgroundColor: HCB.darker }}
        >
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
            {statsFailed ? null : (
              <>
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
                <AnimatedMoney amount={volume} />
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
              </>
            )}
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
                  color: HCB.smoke,
                  textDecoration: "none",
                  borderBottom: `1px solid ${RED}`,
                }}
              >
                {t("seeOurFinances")}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
