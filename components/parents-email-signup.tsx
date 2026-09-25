"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { isValidEmail } from "@/lib/email";

const F = "var(--font-phantom)";

type Status = "idle" | "loading" | "success" | "error";

export function ParentsEmailSignup() {
  const t = useTranslations("Parents");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    if (!firstName.trim()) {
      setStatus("error");
      setErrorMsg(t("invalidFirstName"));
      return;
    }
    if (!lastName.trim()) {
      setStatus("error");
      setErrorMsg(t("invalidLastName"));
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg(t("invalidEmail"));
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/parents-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });
      if (res.status === 403) {
        setStatus("error");
        setErrorMsg(t("verifyFailed"));
        return;
      }
      if (!res.ok) throw new Error();
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("genericError"));
    }
  };

  const disabled = status === "loading" || status === "success";
  const pillShadow = status === "error" ? "0 0 0 2px var(--red)" : "none";
  const inputStyle = {
    flex: 1,
    minWidth: 0,
    background: "transparent",
    border: "none",
    outline: "none",
    paddingLeft: 24,
    paddingRight: 8,
    fontFamily: F,
    fontSize: 16,
    color: "var(--foreground)",
  } as const;

  return (
    <>
      <style>{`
        #parents-first-name::placeholder, #parents-last-name::placeholder, #parents-email::placeholder { opacity: 0.5; }
      `}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "min(560px, calc(100vw - 48px))",
          margin: "0 auto 20px",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--surface-hover)",
              borderRadius: 9999,
              height: 52,
              flex: 1,
              minWidth: 0,
              boxShadow: pillShadow,
              transition: "box-shadow 0.2s ease",
            }}
          >
            <input
              id="parents-first-name"
              type="text"
              placeholder={t("firstNamePlaceholder")}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              disabled={disabled}
              style={inputStyle}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--surface-hover)",
              borderRadius: 9999,
              height: 52,
              flex: 1,
              minWidth: 0,
              boxShadow: pillShadow,
              transition: "box-shadow 0.2s ease",
            }}
          >
            <input
              id="parents-last-name"
              type="text"
              placeholder={t("lastNamePlaceholder")}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              disabled={disabled}
              style={inputStyle}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--surface-hover)",
            borderRadius: 9999,
            height: 52,
            boxShadow: pillShadow,
            transition: "box-shadow 0.2s ease",
          }}
        >
          <input
            id="parents-email"
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
            disabled={disabled}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={submit}
            disabled={disabled}
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
              border: "none",
              borderRadius: 9999,
              height: 40,
              paddingLeft: 20,
              paddingRight: 20,
              marginRight: 6,
              fontFamily: F,
              fontWeight: "normal",
              fontSize: 16,
              cursor: disabled ? "default" : "pointer",
              flexShrink: 0,
            }}
          >
            {status === "success" ? t("joined") : status === "loading" ? "…" : t("signUp")}
          </button>
        </div>
      </div>
      {status === "error" && (
        <p
          style={{
            fontFamily: F,
            fontSize: 14,
            color: "var(--red)",
            margin: "-8px auto 12px",
            textAlign: "center",
          }}
        >
          {errorMsg}
        </p>
      )}
    </>
  );
}
