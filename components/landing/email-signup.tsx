"use client";

import { useState } from "react";
import { sendToAuth } from "../../lib/send-auth";

interface EmailSignupInputProps {
  variant?: "hero" | "video" | "ready";
}

type Variant = NonNullable<EmailSignupInputProps["variant"]>;

const cfg = {
  hero: {
    bg: "#fff",
    w: "min(560px, calc(100vw - 48px))",
    btnW: "clamp(96px, 20vw, 110px)",
    btnH: "clamp(38px, 10vw, 42px)",
    inputId: "hero-email-input",
    hover: true,
  },
  video: {
    bg: "#e0e6ed",
    w: "100%",
    btnW: "clamp(90px, 27vw, 108px)",
    btnH: "clamp(38px, 10vw, 42px)",
    inputId: "video-email-input",
    hover: true, // Enabled hover color change for the video variant
  },
  ready: {
    bg: "#e0e6ed",
    w: "min(616px, calc(100vw - 48px))",
    btnW: 100,
    btnH: 40,
    inputId: "ready-email-input",
    hover: true,
  },
} as const satisfies Record<
  Variant,
  {
    bg: string;
    w: string;
    btnW: number | string;
    btnH: number | string;
    inputId: string;
    hover?: boolean;
  }
>;

export function EmailSignupInput({ variant = "hero" }: EmailSignupInputProps) {
  const [e, setE] = useState("");
  const [err, setErr] = useState(false);
  const [f, setF] = useState(false);
  const isVideo = variant === "video";
  const isReady = variant === "ready";

  const isValid = (v: string) => {
    const t = v.trim();
    return t.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
  };

  const submit = () => (isValid(e) ? (setErr(false), sendToAuth(e)) : setErr(true));

  const c = cfg[variant];
  const hasHover = "hover" in c && !!c.hover;
  const boxShadow = err
    ? "0 0 0 2px #ec3750"
    : isReady && f
      ? "0 0 0 3px rgba(236,55,80,0.25)"
      : "none";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: c.bg,
          borderRadius: 9999,
          width: c.w,
          height: "clamp(48px, 12vw, 52px)",
          boxShadow,
          transition: "box-shadow 0.2s ease",
        }}
      >
        <style>{`
          #${c.inputId}::placeholder { opacity: 0.5; }
        `}</style>
        <input
          id={c.inputId}
          type="email"
          placeholder="orpheus@email.com"
          value={e}
          onChange={(ev) => {
            setE(ev.target.value);
            if (err) setErr(false);
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") submit();
          }}
          onFocus={() => isReady && setF(true)}
          onBlur={() => isReady && setF(false)}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            paddingLeft: isVideo ? "clamp(16px, 4.5vw, 22px)" : 24,
            paddingRight: isVideo
              ? "clamp(98px, 30vw, 130px)"
              : isReady
                ? 160
                : "clamp(108px, 25vw, 140px)",
            fontFamily: "var(--font-phantom)",
            fontSize: isVideo ? "clamp(16px, 4.8vw, 20px)" : 20,
            color: "#17171d",
          }}
        />
        <button
          onClick={submit}
          style={{
            position: "absolute",
            top: "50%",
            right: 6,
            transform: "translateY(-50%)",
            background: "#17171d",
            color: "#ffffff",
            border: "none",
            borderRadius: 9999,
            width: c.btnW,
            height: c.btnH,
            fontFamily: "var(--font-phantom)",
            fontWeight: "normal",
            fontSize: isVideo ? "clamp(16px, 4.8vw, 20px)" : 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: hasHover ? "background 0.4s ease, color 0.4s ease" : "none",
          }}
          onMouseEnter={(ev) => {
            if (hasHover) {
              ev.currentTarget.style.background = "#ec3750";
              ev.currentTarget.style.color = "#ffffff";
            }
          }}
          onMouseLeave={(ev) => {
            if (hasHover) {
              ev.currentTarget.style.background = "#17171d";
              ev.currentTarget.style.color = "#ffffff";
            }
          }}
        >
          Join!
        </button>
      </div>

      {err && (
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ec3750",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: 6,
            fontFamily: "var(--font-phantom)",
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            animation: "fadeIn 0.2s ease",
            boxShadow: "0 4px 12px rgba(236,55,80,0.3)",
          }}
        >
          Enter Valid email
          <div
            style={{
              position: "absolute",
              bottom: -5,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #ec3750",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}