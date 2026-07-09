"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/email";
import { sendToAuth } from "../../lib/send-auth";

interface EmailSignupInputProps {
  variant?: "hero" | "video" | "ready";
}

type Variant = NonNullable<EmailSignupInputProps["variant"]>;

const BG = "var(--surface-hover)";
const BTN_BG = "var(--foreground)";
const BTN_TXT = "var(--background)";

const cfg = {
  hero: {
    w: "min(560px, calc(100vw - 48px))",
    btnW: "clamp(96px, 20vw, 110px)",
    btnH: "clamp(38px, 10vw, 42px)",
    inputId: "hero-email-input",
    hover: true,
  },
  video: {
    w: "100%",
    btnW: "clamp(90px, 27vw, 108px)",
    btnH: "clamp(38px, 10vw, 42px)",
    inputId: "video-email-input",
    hover: true, // Enabled hover color change for the video variant
  },
  ready: {
    w: "min(616px, calc(100vw - 48px))",
    btnW: 100,
    btnH: 40,
    inputId: "ready-email-input",
    hover: true,
  },
} as const satisfies Record<
  Variant,
  {
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

  const submit = () => {
    if (!isValidEmail(e)) {
      setErr(true);
      return;
    }
    setErr(false);
    sendToAuth(e);
  };

  const c = cfg[variant];
  const hasHover = "hover" in c && !!c.hover;
  const boxShadow = err
    ? "0 0 0 2px var(--red)"
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
          background: BG,
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
          aria-label="Email address"
          placeholder="orpheus@example.com"
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
            color: "var(--foreground)",
          }}
        />
        <button
          onClick={submit}
          style={{
            position: "absolute",
            top: "50%",
            right: 6,
            transform: "translateY(-50%)",
            background: BTN_BG,
            color: BTN_TXT,
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
              ev.currentTarget.style.background = "var(--red)";
              ev.currentTarget.style.color = "var(--paper)";
            }
          }}
          onMouseLeave={(ev) => {
            if (hasHover) {
              ev.currentTarget.style.background = BTN_BG;
              ev.currentTarget.style.color = BTN_TXT;
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
            background: "var(--red)",
            color: "var(--paper)",
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
          Enter a valid email address
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
              borderTop: "6px solid var(--red)",
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
