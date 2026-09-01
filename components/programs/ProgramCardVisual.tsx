import type { CSSProperties } from "react";
import { BtnArrowSvg } from "@/components/landing/btn-arrow";

export type ProgramCardVisualProps = {
  name: string;
  logoUrl: string | null;
  logoSize: number;
  bgColor: string;
  bgImageUrl: string | null;
  textColor: string;
  accentColor: string;
  description: string | null;
  metaLines: string[];
  buttonLabel: string;
  buttonHref?: string | null;
  buttonColor: string;
  buttonTextColor: string;
  buttonRadius: number;
  buttonBorderWidth: number;
  buttonBorderColor: string;
  slackIntro: string;
  slackChannel: string | null;
  slackUrl?: string | null;
  badgeLabel: string;
  badgeMuted: boolean;
  pinned?: boolean;
  interactive?: boolean;
  fillHeight?: boolean;
};

export function ProgramCardVisual({
  name,
  logoUrl,
  logoSize,
  bgColor,
  bgImageUrl,
  textColor,
  accentColor,
  description,
  metaLines,
  buttonLabel,
  buttonHref,
  buttonColor,
  buttonTextColor,
  buttonRadius,
  buttonBorderWidth,
  buttonBorderColor,
  slackIntro,
  slackChannel,
  slackUrl,
  badgeLabel,
  badgeMuted,
  pinned = false,
  interactive = false,
  fillHeight = true,
}: ProgramCardVisualProps) {
  const buttonStyle = {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 20px",
    background: buttonColor,
    borderRadius: buttonRadius,
    border: `${buttonBorderWidth}px solid ${buttonBorderColor}`,
    fontFamily: "var(--font-phantom)",
    fontWeight: "bold",
    fontSize: 20,
    color: buttonTextColor,
    textDecoration: "none",
    whiteSpace: "nowrap",
    marginBottom: slackChannel ? 6 : 0,
  } as const;

  const buttonContent = (
    <>
      {buttonLabel}
      <span className="btn-arrow" aria-hidden="true">
        <BtnArrowSvg />
      </span>
    </>
  );

  return (
    <div
      style={
        {
          position: "relative",
          background: bgImageUrl ? "transparent" : bgColor,
          borderRadius: 16,
          boxShadow: "2px 4px 6px rgba(0,0,0,0.25)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "28px 32px 16px",
          minHeight: 260,
          height: fillHeight ? "100%" : "auto",
          boxSizing: "border-box",
          colorScheme: "light",
          "--foreground": "#17171d",
          "--surface": "#f9fafc",
          "--surface-hover": "#f1f2f5",
          "--paper": "#ffffff",
        } as CSSProperties
      }
    >
      {pinned && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 36,
            height: 36,
            background: "#ec3750",
            borderBottomRightRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
          </svg>
        </div>
      )}

      {bgImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bgImageUrl}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      )}

      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          style={{
            height: logoSize,
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            marginBottom: 12,
            position: "relative",
            zIndex: 1,
            alignSelf: "center",
          }}
        />
      ) : (
        <h2
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-zarathustra)",
            fontSize: 40,
            fontWeight: "normal",
            color: textColor,
            margin: "0 0 8px",
            lineHeight: 1,
            textAlign: "center",
            width: "100%",
          }}
        >
          {name}
        </h2>
      )}

      {description && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-phantom)",
            fontSize: 20,
            color: textColor,
            opacity: 0.9,
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {description}
        </p>
      )}

      {metaLines.length > 0 && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-phantom)",
            fontStyle: "italic",
            fontSize: 20,
            color: textColor,
            opacity: 0.55,
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {metaLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < metaLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      )}

      <div style={{ flex: "1 0 12px" }} />

      {buttonHref &&
        (interactive ? (
          <a
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
            style={buttonStyle}
            onMouseEnter={(event) => (event.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(event) => (event.currentTarget.style.opacity = "1")}
          >
            {buttonContent}
          </a>
        ) : (
          <div style={buttonStyle}>{buttonContent}</div>
        ))}

      {slackChannel && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-phantom)",
            fontStyle: "italic",
            fontSize: 16,
            color: textColor,
            margin: 0,
            lineHeight: 1.2,
            paddingRight: 110,
          }}
        >
          {slackIntro}{" "}
          {interactive && slackUrl ? (
            <a
              href={slackUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: accentColor,
                textDecoration: "none",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              #{slackChannel}
            </a>
          ) : (
            <span
              style={{
                color: accentColor,
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              #{slackChannel}
            </span>
          )}
        </p>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: 36,
          width: 130,
          background: badgeMuted ? "var(--surface-hover)" : "var(--red)",
          borderTopLeftRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-phantom)",
            fontWeight: "bold",
            fontSize: 16,
            color: badgeMuted ? "var(--foreground)" : "var(--paper)",
            whiteSpace: "nowrap",
          }}
        >
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}
