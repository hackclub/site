"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EmailSignupInput } from "./email-signup";
import { BtnArrow } from "./btn-arrow";

export function ReadySection() {
  const t = useTranslations("Home");
  const tc = useTranslations("Common");
  return (
    <section
      style={{
        position: "relative",
        background: "var(--surface)",
        paddingTop: "clamp(80px, 15vw, 192px)",
        paddingBottom: "clamp(60px, 10vw, 120px)",
        paddingLeft: 24,
        paddingRight: 24,
        textAlign: "center",
      }}
    >
      {/* Centred content — Figma order: headline → email → description → button → italic */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* "Ready?" headline */}
        <h2
          style={{
            fontFamily: "var(--font-zarathustra)",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1,
            color: "var(--foreground)",
            margin: "0 0 24px",
          }}
        >
          {t("readyTitle")}
        </h2>

        {/* Email pill */}
        <EmailSignupInput variant="ready" />

        {/* "Get started" body copy */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontWeight: 400,
            fontSize: 20,
            color: "var(--foreground)",
            margin: "48px 0 0",
            lineHeight: 1.2,
          }}
        >
          {t("readyBody")}
        </p>

        {/* "Explore current programs" button */}
        <Link
          href="/programs"
          className="cta-btn dark-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--foreground)",
            color: "var(--background)",
            borderRadius: 41,
            height: 52,
            paddingLeft: 36,
            paddingRight: 36,
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            fontWeight: "normal",
            textDecoration: "none",
            whiteSpace: "nowrap",
            cursor: "pointer",
            marginTop: 16,
          }}
        >
          {t("readyCta")} <BtnArrow />
        </Link>

        {/* Italic subtitle */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: 16,
            color: "var(--foreground)",
            margin: "20px 0 0",
            lineHeight: 1.2,
            pointerEvents: "auto",
          }}
        >
          {tc("termsAgree")}{" "}
          <Link
            href="/privacy-and-terms"
            className="ready-terms-link"
            style={{
              color: "var(--red)",
              textDecoration: "underline",
              textUnderlineOffset: 2,
              pointerEvents: "auto",
            }}
          >
            {tc("terms")}
          </Link>
        </p>
      </div>

      <style>{`
        .ready-terms-link:hover,
        .ready-terms-link:focus-visible {
          text-decoration-thickness: 2px;
        }
      `}</style>
    </section>
  );
}
