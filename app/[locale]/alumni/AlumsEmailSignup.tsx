"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { isValidEmail } from "@/lib/email";

const F = "var(--font-phantom)";

type Status = "idle" | "error";

export function AlumsEmailSignup() {
  const t = useTranslations("Alums");
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = () => {
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      return;
    }

    window.open(
      `https://forms.hackclub.com/alumni-newsletter?email=${encodeURIComponent(trimmed)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 9999,
        width: "min(460px, 100%)",
        height: 52,
        marginBottom: 12,
        boxShadow: status === "error" ? "0 0 0 2px var(--red)" : "none",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <input
        id={inputId}
        type="email"
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        style={{
          flex: 1,
          minWidth: 0,
          background: "transparent",
          border: "none",
          outline: "none",
          paddingLeft: 20,
          paddingRight: 8,
          fontFamily: F,
          fontSize: 15,
          color: "var(--foreground)",
        }}
      />
      <button
        type="button"
        onClick={submit}
        style={{
          background: "var(--red)",
          color: "#fff",
          border: "none",
          borderRadius: 9999,
          height: 40,
          paddingLeft: 18,
          paddingRight: 18,
          marginRight: 6,
          fontFamily: F,
          fontWeight: 600,
          fontSize: 15,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        {t("signUpCta")}
      </button>
    </div>
  );
}
