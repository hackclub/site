import Link from "next/link";
import { EmailSignupInput } from "./email-signup";

export function ReadySection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#f9fafc",
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
            color: "#17171d",
            margin: "0 0 24px",
          }}
        >
          Ready?
        </h2>

        {/* Email pill */}
        <EmailSignupInput variant="ready" />

        {/* "Get started" body copy */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontWeight: 400,
            fontSize: 20,
            color: "#17171d",
            margin: "48px 0 0",
            lineHeight: 1.2,
          }}
        >
          Get started with building something real.
        </p>

        {/* "Explore current programs" button */}
        <Link
          href="/programs"
          className="cta-btn dark-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#17171d",
            color: "#ffffff",
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
          Explore current programs <span className="btn-arrow"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}><path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        </Link>

        {/* Italic subtitle */}
        <p
          style={{
            fontFamily: "var(--font-phantom)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: 16,
            color: "#17171d",
            margin: "20px 0 0",
            lineHeight: 1.2,
            pointerEvents: "auto",
          }}
        >
          For all teens aged 13–18. By continuing, you agree to our{" "}
          <Link
            href="/privacy-and-terms"
            className="ready-terms-link"
            style={{
              color: "#ec3750",
              textDecoration: "underline",
              textUnderlineOffset: 2,
              pointerEvents: "auto",
            }}
          >
            terms.
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
