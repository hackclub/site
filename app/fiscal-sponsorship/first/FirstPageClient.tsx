"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeLock } from "@/components/ThemeToggle";
import { Icon } from "@/components/Icon";
import { FISCAL_COLORS, FISCAL_TYPOGRAPHY } from "@/components/fiscal-sponsorship/constants";

type HCBStats = {
  transactions_volume?: number;
};

const HERO_BADGES = ["Nonprofit status", "Receive grants", "Debit cards"];

const FEATURES = [
  {
    icon: "bank-account",
    name: "Nonprofit status",
    body: "Become part of Hack Club's legal entity, getting the benefits of our 501(c)(3) tax status.",
  },
  {
    icon: "analytics",
    name: "Balance & history",
    body: "Keep everyone on your team and beyond up to date with real-time balance and transaction history.",
  },
  {
    icon: "card",
    name: "Debit cards",
    body: "Issue physical debit cards to all your teammates.",
  },
  {
    icon: "payment-transfer",
    name: "Grants & donations",
    body: "Easily receive and deposit money from grants and donations into your account. You'll also get a customizable online donation form to share with friends and family.",
  },
  {
    icon: "payment-transfer",
    name: "Reimbursement flow",
    body: "Reimburse teammates for expenses with flexible money transfer options including ACH, mailed checks, and more.",
  },
  {
    icon: "support",
    name: "Support anytime",
    body: "With 24-hour response time on weekdays, we'll never leave you hanging.",
  },
] as const;

const TESTIMONIALS = [
  {
    name: "Poseidon Robotics",
    teamNum: "FTC Team #16898",
    teamLocation: "San Jose, CA",
    website: "evposeidon.wixsite.com",
    url: "https://evposeidon.wixsite.com/robo/home",
    imgSrc: "https://cloud-qtng6088u-hack-club-bot.vercel.app/0image.png",
    logo: "https://cloud-ab81zjlm9-hack-club-bot.vercel.app/0image.png",
    quote:
      "Overall, [HCB] has opened more opportunities for Poseidon, allowing us to undertake larger projects, both on the playing field and in our community.",
    hackerName: "Ian Marwong",
    hackerRole: "Team Lead",
    hackerAvatarUrl: "https://cdn.hackclub.com/019db183-cff2-7c82-9d56-166bddc84d94/1.webp",
    transparency: "poseidon-robotics",
  },
  {
    name: "Killabytez",
    teamNum: "FTC Team #14663",
    teamLocation: "Fremont, CA",
    website: "killabytez.club",
    url: "http://www.killabytez.club/",
    imgSrc:
      "https://cloud-oelh6sp7b-hack-club-bot.vercel.app/0screen_shot_2022-11-06_at_8.45.37_pm.png",
    logo: "https://cloud-ga0lm1r8d-hack-club-bot.vercel.app/0image.png",
    quote:
      "[HCB] has been essential to keeping track of our finances as well as giving us the opportunity to establish ourselves as a nonprofit.",
    hackerName: "Brian Cisto",
    hackerRole: "Team Captain & Software Lead",
    hackerAvatarUrl: "https://cdn.hackclub.com/019db183-91dc-74de-a29c-6e1bdc5d2a50/2.webp",
    transparency: undefined,
  },
] as const;

type MoneyToken =
  | { type: "static"; value: string; kind?: "currency" | "decimal" }
  | {
      type: "digit";
      value: number;
      key: string;
      delay: number;
      turns: number;
      kind: "integer" | "fraction";
    };

function getMoneyTokens(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const parts = formatter.formatToParts(amount / 100);
  const tokens: MoneyToken[] = [];
  let digitIndex = 0;

  for (const part of parts) {
    if (part.type === "integer" || part.type === "fraction") {
      for (const char of part.value) {
        const digit = Number(char);
        tokens.push({
          type: "digit",
          value: digit,
          key: `${part.type}-${digitIndex}`,
          delay: digitIndex * 0.085,
          turns: 4 + ((digitIndex + digit) % 3),
          kind: part.type,
        });
        digitIndex += 1;
      }
      continue;
    }

    tokens.push({
      type: "static",
      value: part.value,
      kind: part.type === "currency" ? "currency" : "decimal",
    });
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
  const digitHeight = "1em";
  const digitWidth = "0.64em";
  const digitList = Array.from({ length: (turns + 1) * 10 }, (_, index) => index % 10);

  return (
    <span
      style={{
        display: "inline-block",
        height: digitHeight,
        width: digitWidth,
        overflow: "hidden",
        position: "relative",
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
          transitionProperty: "transform",
          transitionDuration: "1800ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: reveal ? `${delay}s` : "0s",
          willChange: "transform",
        }}
      >
        {digitList.map((value, index) => (
          <span
            key={`${value}-${index}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: digitHeight,
              width: digitWidth,
              fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
              fontSize: "1em",
              fontWeight: 700,
            }}
          >
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

  if (amount === undefined) {
    return (
      <div
        ref={ref}
        style={{
          minHeight: 96,
          display: "grid",
          placeItems: "center",
          width: "100%",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.6)" }}>...</span>
      </div>
    );
  }

  const tokens = getMoneyTokens(amount);

  return (
    <div ref={ref} style={{ minHeight: 96, width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 0,
          lineHeight: 1,
          fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
          fontSize: "clamp(42px, 8vw, 78px)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          color: "#33d6A6",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {tokens.map((token, index) =>
          token.type === "digit" ? (
            <MoneyWheel
              key={token.key}
              digit={token.value}
              delay={token.delay}
              turns={token.turns}
              reveal={isVisible}
            />
          ) : (
            <span
              key={`${index}-${token.value}`}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: "1em",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {token.value}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        maxWidth: 780,
        margin: "0 auto 32px",
        textAlign: "center",
      }}
    >
      {eyebrow ? (
        <p
          style={{
            margin: 0,
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: 12,
            fontWeight: 700,
            color: dark ? "rgba(255,255,255,0.72)" : FISCAL_COLORS.primary,
          }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        style={{
          fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
          fontSize: "clamp(34px, 4.8vw, 58px)",
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          color: dark ? "#ffffff" : FISCAL_COLORS.text,
          margin: 0,
          marginBottom: body ? 16 : 0,
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          style={{
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.55,
            color: dark ? "rgba(255,255,255,0.84)" : FISCAL_COLORS.text,
            margin: 0,
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function FeatureCard({ icon, name, body }: { icon: string; name: string; body: string }) {
  return (
    <article
      style={{
        padding: 26,
        borderRadius: 18,
        display: "flex",
        gap: 16,
        minHeight: 172,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "fit-content",
          flexShrink: 0,
          borderRadius: 14,
          lineHeight: 0,
          padding: 8,
          display: "inline-block",
          background: "#ec3750",
          transform: "scale(0.75)",
          transformOrigin: "bottom left",
          boxShadow:
            "inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)",
          color: "#ffffff",
        }}
      >
        <Icon glyph={icon} size={36} style={{ color: "#ffffff" }} />
      </div>
      <div>
        <h3
          style={{
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontSize: 20,
            lineHeight: 1.2,
            color: "#ffffff",
            margin: 0,
            marginBottom: 8,
          }}
        >
          <strong>{name}</strong>
        </h3>
        <p
          style={{
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontSize: 17,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.74)",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </article>
  );
}

function TestimonialCard({
  logo,
  name,
  teamNum,
  teamLocation,
  website,
  url,
  imgSrc,
  quote,
  hackerName,
  hackerAvatarUrl,
  hackerRole,
  transparency,
}: {
  logo: string;
  name: string;
  teamNum: string;
  teamLocation: string;
  website: string;
  url: string;
  imgSrc: string;
  quote: string;
  hackerName: string;
  hackerAvatarUrl: string;
  hackerRole: string;
  transparency?: string;
}) {
  return (
    <article
      style={{
        backgroundColor: "#17171d",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(23,23,29,0.26)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={imgSrc}
        alt={`${name} team`}
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div style={{ padding: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={logo}
              alt={`${name} logo`}
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                  fontSize: "clamp(30px, 2.8vw, 40px)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {name}
              </h3>
              <p
                style={{
                  margin: "10px 0 0",
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  fontSize: 16,
                  lineHeight: 1.4,
                }}
              >
                <a
                  href={url || `https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {teamNum}
                </a>{" "}
                • {teamLocation}
              </p>
            </div>
          </div>
        </div>

        <p
          style={{
            margin: "18px 0 0",
            color: "#ffffff",
            fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
            fontSize: 18,
            lineHeight: 1.65,
            textIndent: "-0.375em",
          }}
        >
          &quot;{quote}&quot;
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 18,
            marginTop: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image
              src={hackerAvatarUrl}
              alt={`Photo of ${hackerName}`}
              width={48}
              height={48}
              style={{
                width: 48,
                height: 48,
                borderRadius: 9999,
                objectFit: "cover",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
            <div style={{ color: "#ffffff", fontFamily: FISCAL_TYPOGRAPHY.bodyFont }}>
              <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}>{hackerName}</div>
              <div style={{ fontSize: 16, lineHeight: 1.3, color: "rgba(255,255,255,0.72)" }}>
                {hackerRole}
              </div>
            </div>
          </div>

          {transparency ? (
            <a
              href={`https://hcb.hackclub.com/${transparency}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 18px",
                borderRadius: 9999,
                backgroundColor: FISCAL_COLORS.primary,
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontWeight: 700,
              }}
            >
              See Finances
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function FirstPageClient() {
  const [stats, setStats] = useState<HCBStats>({});

  useEffect(() => {
    fetch("https://hcb.hackclub.com/stats")
      .then((res) => res.json())
      .then((data: HCBStats) => setStats(data || {}))
      .catch(() => {});
  }, []);

  const transactionsVolume = stats.transactions_volume;

  return (
    <>
      <ThemeLock />
      <Navbar invertColors />
      <main id="main" tabIndex={-1} style={{ backgroundColor: "#0f1118" }}>
        <section
          style={{
            position: "relative",
            minHeight: "min(100vh, 980px)",
            display: "flex",
            alignItems: "center",
            paddingTop: 104,
            paddingBottom: 80,
            overflow: "hidden",
            backgroundColor: "#0d0f18",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 100%), url('https://cdn.hackclub.com/019db178-b881-79eb-820e-670c24eb6637/first.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: "scale(1.02)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 1280,
              margin: "0 auto",
              paddingLeft: "clamp(16px, 4vw, 48px)",
              paddingRight: "clamp(16px, 4vw, 48px)",
            }}
          >
            <div
              style={{
                maxWidth: 1080,
                margin: "0 auto",
                padding: "clamp(28px, 4vw, 48px)",
                borderRadius: 20,
                boxShadow: "0 24px 120px rgba(0,0,0,0.3)",
                backdropFilter: "blur(1.5px)",
                WebkitBackdropFilter: "blur(1.5px)",
              }}
            >
              <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
                <h1
                  style={{
                    fontFamily: FISCAL_TYPOGRAPHY.headlineFont,
                    fontSize: "clamp(52px, 8vw, 96px)",
                    lineHeight: 0.92,
                    margin: 0,
                    color: "#ffffff",
                    textShadow: "0 0 22px rgba(0,0,0,0.75)",
                  }}
                >
                  The ultimate booster club for{" "}
                  <span
                    style={{
                      WebkitTextStroke: "1px rgba(67, 173, 255, 0.95)",
                      WebkitTextFillColor: "#ffffff",
                      textShadow: "0 0 18px rgba(67, 173, 255, 0.75)",
                    }}
                  >
                    FRC, FTC, and FLL teams
                  </span>
                  .
                </h1>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                    marginTop: 24,
                    maxWidth: 760,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {HERO_BADGES.map((badge) => (
                    <div
                      key={badge}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        minHeight: 32,
                        color: "#ffffff",
                        fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                        fontSize: 18,
                      }}
                    >
                      <Icon glyph="checkmark" size={28} style={{ color: "#33d6A6" }} />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                    color: "rgba(255,255,255,0.88)",
                    fontSize: "clamp(18px, 2.1vw, 24px)",
                    lineHeight: 1.5,
                    margin: 0,
                    marginTop: 28,
                    maxWidth: 860,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Built by <i>FIRST</i> alumni for <i>FIRST</i> teams, HCB is a comprehensive
                  financial platform used by hundreds of clubs, teams and hackathons.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 16,
                    marginTop: 34,
                  }}
                >
                  <a
                    href="#apply"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 60,
                      padding: "0 28px",
                      borderRadius: 9999,
                      backgroundColor: FISCAL_COLORS.primary,
                      color: "#ffffff",
                      textDecoration: "none",
                      fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    Open an account
                  </a>
                  <a
                    href="https://cdn.hackclub.com/019db175-6a20-7153-87bb-6f1e5de96a83/Hack_Club_Bank_for_FIRST_Teams.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="download-page-button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 60,
                      padding: "0 28px",
                      borderRadius: 9999,
                      backgroundImage:
                        "linear-gradient(90deg, rgba(34,211,238,1), rgba(59,130,246,1))",
                      color: "#ffffff",
                      textDecoration: "none",
                      fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    Download this page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            paddingTop: "clamp(56px, 7vw, 100px)",
            paddingBottom: "clamp(56px, 7vw, 100px)",
            paddingLeft: "clamp(16px, 4vw, 64px)",
            paddingRight: "clamp(16px, 4vw, 64px)",
            background: "#0f1118",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 0,
                top: -56,
                width: 240,
                maxWidth: "36vw",
                pointerEvents: "none",
                opacity: 0.7,
              }}
              className="meet-teams-art"
            >
              <a
                href="#testimonials"
                aria-label="Jump to testimonials"
                style={{
                  display: "block",
                  pointerEvents: "auto",
                  cursor: "pointer",
                }}
              >
                <Image
                  src="/fiscal-sponsorship/meet-teams-using-hcb.svg"
                  alt=""
                  width={240}
                  height={120}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>

            <SectionHeading
              dark
              eyebrow="Features"
              title="Everything you'll need."
              body={
                <>
                  Organize your team&apos;s finances in real time, receive grants, gain nonprofit
                  status, &amp; more.
                  <br />
                  Use features engineered by <i>FIRST</i> alumni to help you run a successful team.
                </>
              }
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                gap: 20,
                alignItems: "stretch",
              }}
              className="feature-layout"
            >
              <div style={{ gridColumn: "span 4" }} className="feature-span-4">
                <FeatureCard {...FEATURES[0]} />
              </div>
              <div
                style={{
                  gridColumn: "span 8",
                  overflow: "hidden",
                  minHeight: 320,
                }}
                className="feature-span-8"
              >
                <Image
                  src="/fiscal-sponsorship/poseidon-dashboard.webp"
                  alt="HCB dashboard shown on a device"
                  width={1200}
                  height={720}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ gridColumn: "span 4" }} className="feature-span-4">
                <FeatureCard {...FEATURES[1]} />
              </div>
              <div style={{ gridColumn: "span 4" }} className="feature-span-4">
                <FeatureCard {...FEATURES[2]} />
              </div>
              <div style={{ gridColumn: "span 4" }} className="feature-span-4">
                <FeatureCard {...FEATURES[3]} />
              </div>
              <div style={{ gridColumn: "span 4" }} className="feature-span-4">
                <FeatureCard {...FEATURES[4]} />
              </div>
              <div style={{ gridColumn: "span 4" }} className="feature-span-4">
                <FeatureCard {...FEATURES[5]} />
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          style={{
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
            paddingLeft: "clamp(16px, 4vw, 64px)",
            paddingRight: "clamp(16px, 4vw, 64px)",
            backgroundColor: "#12131a",
            scrollMarginTop: 96,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionHeading
              dark
              title={
                <>
                  <i>FIRST</i> teams all over the country run on HCB.
                </>
              }
              body={
                "Everywhere from San Jose to Boston to New York, HCB powers teams of all sizes."
              }
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24,
              }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="apply"
          style={{
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
            paddingLeft: "clamp(16px, 4vw, 64px)",
            paddingRight: "clamp(16px, 4vw, 64px)",
            background: "#0f1118",
          }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "clamp(28px, 5vw, 48px)",
              borderRadius: 20,
              backgroundColor: "#17171d",
              color: "#ffffff",
              boxShadow: "0 24px 90px rgba(23,23,29,0.18)",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <SectionHeading
              dark
              title="Sign up for HCB."
              body="Open to Hack Clubs, hackathons, and charitable organizations in the US and Canada."
            />

            <div
              style={{
                marginTop: 28,
                marginBottom: 28,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  fontSize: "clamp(18px, 2.1vw, 24px)",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                So far we have enabled
              </p>
              <AnimatedMoney amount={transactionsVolume} />
              <p
                style={{
                  margin: "12px 0 0",
                  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  fontSize: "clamp(18px, 2.1vw, 24px)",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                in transactions
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <a
                href="https://hcb.hackclub.com/applications/new"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 28px",
                  minHeight: 60,
                  borderRadius: 9999,
                  backgroundColor: FISCAL_COLORS.primary,
                  color: "#ffffff",
                  textDecoration: "none",
                  fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Apply now
              </a>
            </div>

            <p
              style={{
                margin: "24px 0 0",
                fontFamily: FISCAL_TYPOGRAPHY.bodyFont,
                fontSize: 18,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
              }}
            >
              We run Hack Club HQ on HCB!{" "}
              <a
                href="https://hcb.hackclub.com/hq"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: FISCAL_COLORS.primary,
                  textDecoration: "none",
                  borderBottom: "1px solid #ec3750",
                }}
              >
                See our finances.
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 960px) {
          .meet-teams-art {
            display: none;
          }

          .download-page-button {
            display: none !important;
          }
        }

        @media (max-width: 900px) {
          .feature-span-8 {
            grid-column: span 12 !important;
          }

          .feature-span-4 {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </>
  );
}
