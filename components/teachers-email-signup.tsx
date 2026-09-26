"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { isValidEmail } from "@/lib/email";

const F = "var(--font-phantom)";

type Status = "idle" | "loading" | "success" | "error";

const inputStyle = {
  width: "100%",
  background: "var(--surface-hover)",
  border: "none",
  outline: "none",
  borderRadius: 9999,
  height: 52,
  padding: "0 24px",
  fontFamily: F,
  fontSize: 16,
  color: "var(--foreground)",
};

export function TeachersEmailSignup() {
  const t = useTranslations("Teachers");
  const idPrefix = useId().replace(/:/g, "");
  const firstNameId = `${idPrefix}-first-name`;
  const lastNameId = `${idPrefix}-last-name`;
  const emailId = `${idPrefix}-email`;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setStatus("error");
      setErrorMsg(t("invalidName"));
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg(t("invalidEmail"));
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/teachers-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(t("genericError"));
        return;
      }
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("networkError"));
    }
  };

  const disabled = status === "loading" || status === "success";

  return (
    <div style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}>
      <style>{`
        #${firstNameId}::placeholder,
        #${lastNameId}::placeholder,
        #${emailId}::placeholder {
          opacity: 0.5;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 10,
          boxShadow: status === "error" ? "0 0 0 2px var(--red)" : "none",
          borderRadius: 9999,
          transition: "box-shadow 0.2s ease",
        }}
      >
        <input
          id={firstNameId}
          type="text"
          placeholder={t("firstNamePlaceholder")}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={disabled}
          style={inputStyle}
        />
        <input
          id={lastNameId}
          type="text"
          placeholder={t("lastNamePlaceholder")}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={disabled}
          style={inputStyle}
        />
      </div>
      <input
        id={emailId}
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
        style={{ ...inputStyle, marginBottom: 14 }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        className="dark-btn"
        style={{
          width: "100%",
          background: "var(--foreground)",
          color: "var(--background)",
          border: "none",
          borderRadius: 9999,
          height: 52,
          fontFamily: F,
          fontWeight: "normal",
          fontSize: 16,
          cursor: disabled ? "default" : "pointer",
        }}
      >
        {status === "success" ? t("success") : status === "loading" ? "…" : t("submit")}
      </button>
      {status === "error" && (
        <p
          style={{
            fontFamily: F,
            fontSize: 14,
            color: "var(--red)",
            margin: "12px 0 0",
            textAlign: "center",
          }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}
