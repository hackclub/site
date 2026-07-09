"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/email";

const F = "var(--font-phantom)";

type Status = "idle" | "loading" | "success" | "error";

export function ParentsEmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/parents-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.status === 403) {
        setStatus("error");
        setErrorMsg("Unable to verify request — try again");
        return;
      }
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong — try again");
    }
  };

  const disabled = status === "loading" || status === "success";

  return (
    <>
      <style>{`
        #parents-email::placeholder { opacity: 0.5; }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "var(--surface-hover)",
          borderRadius: 9999,
          width: "min(560px, calc(100vw - 48px))",
          height: 52,
          margin: "0 auto 20px",
          boxShadow: status === "error" ? "0 0 0 2px var(--red)" : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <input
          id="parents-email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          disabled={disabled}
          style={{
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
          }}
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
          {status === "success" ? "Joined!" : status === "loading" ? "…" : "Sign up!"}
        </button>
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
