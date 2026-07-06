"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "../../../components/Navbar";
import type { AirtableProgram } from "../../../lib/programs";
import type { SiteProgram, ProjectType, ProgramFormat } from "../../../lib/site-programs";
import { PROJECT_TYPE_OPTIONS, formatInPersonDate } from "../../../lib/site-programs";
import { BtnArrowSvg } from "../../../components/landing/btn-arrow";

interface EditorProgram {
  ysws: AirtableProgram;
  site: SiteProgram | null;
  draft: {
    description: string;
    bgType: "color" | "image";
    bgColor: string;
    textColor: string;
    accentColor: string;
    logoSize: number;
    buttonColor: string;
    buttonTextColor: string;
    buttonBorderRadius: number;
    buttonBorderWidth: number;
    buttonBorderColor: string;
    slackChannel: string;
    projectTypes: ProjectType[];
    format: ProgramFormat | "";
    inPersonStart: string;
    inPersonEnd: string;
    inPersonLocation: string;
    additionalRequirements: string;
  };
}

// ── Card preview — exactly matches /programs ProgramCard ─────────────────────
function CardPreview({ prog }: { prog: EditorProgram }) {
  const { draft, site, ysws } = prog;
  const logoUrl = site?.logoUrl ?? null;
  const bgImageUrl = draft.bgType === "image" ? (site?.bgImageUrl ?? null) : null;
  const now = new Date();
  function parseLocalDate(iso: string) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  const isEnded = parseLocalDate(ysws.endDate) < now;
  const isDraft = parseLocalDate(ysws.startDate) > now;
  const badgeLabel = isDraft
    ? "Coming soon"
    : isEnded
      ? "Ended"
      : `Ends ${parseLocalDate(ysws.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
  const badgeEnded = isEnded || isDraft;
  const buttonText = isEnded ? "See the site" : "Start now";
  const buttonColor = draft.buttonColor || "#ec3750";

  const inPersonStr = formatInPersonDate(
    draft.inPersonStart || null,
    draft.inPersonEnd || null,
    draft.inPersonLocation || null,
  );
  const metaLines: string[] = [];
  if ((draft.format === "In-Person Only" || draft.format === "Both") && inPersonStr)
    metaLines.push(`In-person: ${inPersonStr}`);
  if (draft.format === "Online Only") metaLines.push("Online-only");
  if (draft.format === "Both" && !inPersonStr) metaLines.push("In-person & online");
  if (draft.projectTypes.length > 0)
    metaLines.push(
      draft.projectTypes.length === PROJECT_TYPE_OPTIONS.length
        ? "Project type: Any"
        : `Project types: ${draft.projectTypes.join(", ")}`,
    );
  if (draft.additionalRequirements) metaLines.push(draft.additionalRequirements);

  return (
    <div
      style={{
        position: "relative",
        background: bgImageUrl ? "transparent" : draft.bgColor,
        borderRadius: 16,
        boxShadow: "2px 4px 6px rgba(0,0,0,0.25)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "28px 32px 16px",
        minHeight: 260,
        boxSizing: "border-box",
      }}
    >
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
          alt={ysws.name}
          style={{
            height: draft.logoSize,
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
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: "normal",
            color: draft.textColor,
            margin: "0 0 8px",
            lineHeight: 1,
            textAlign: "center",
            width: "100%",
          }}
        >
          {ysws.name}
        </h2>
      )}

      {draft.description && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-phantom)",
            fontSize: "clamp(15px, 1.6vw, 20px)",
            color: draft.textColor,
            opacity: 0.9,
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {draft.description}
        </p>
      )}

      {metaLines.length > 0 && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-phantom)",
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.6vw, 20px)",
            color: draft.textColor,
            opacity: 0.55,
            margin: "0 0 4px",
            lineHeight: 1.2,
          }}
        >
          {metaLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < metaLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      )}

      <div style={{ flex: "1 0 12px" }} />

      {ysws.websiteUrl && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 20,
            paddingRight: 20,
            background: buttonColor,
            borderRadius: draft.buttonBorderRadius,
            border: `${draft.buttonBorderWidth}px solid ${draft.buttonBorderColor || "#17171d"}`,
            fontFamily: "var(--font-phantom)",
            fontWeight: "bold",
            fontSize: "clamp(15px, 1.6vw, 20px)",
            color: draft.buttonTextColor || "#ffffff",
            marginBottom: draft.slackChannel ? 6 : 0,
          }}
        >
          {buttonText}
          <BtnArrowSvg />
        </div>
      )}

      {draft.slackChannel && (
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-phantom)",
            fontStyle: "italic",
            fontSize: "clamp(13px, 1.2vw, 16px)",
            color: draft.textColor,
            margin: 0,
            lineHeight: 1.2,
            paddingRight: 110,
          }}
        >
          Join the discussion in{" "}
          <span style={{ color: draft.accentColor, display: "inline-block", whiteSpace: "nowrap" }}>
            #{draft.slackChannel.replace(/^#/, "")}
          </span>
        </p>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: 36,
          width: 130,
          background: badgeEnded ? "var(--surface-hover)" : "var(--red)",
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
            fontSize: "clamp(13px, 1.2vw, 16px)",
            color: badgeEnded ? "var(--foreground)" : "var(--paper)",
            whiteSpace: "nowrap",
          }}
        >
          {badgeLabel}
        </span>
      </div>
    </div>
  );
}

// ── Upload / URL image field ───────────────────────────────────────────────────
function UploadButton({
  label,
  type,
  programName,
  currentUrl,
  onUploaded,
  onRemoved,
}: {
  label: string;
  type: "logo" | "bg";
  programName: string;
  currentUrl: string | null;
  onUploaded: (s: SiteProgram) => void;
  onRemoved: (s: SiteProgram) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = uploading || removing;

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("programName", programName);
    form.append("type", type);
    form.append("file", file);
    try {
      const res = await fetch("/api/site-programs/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Upload failed");
      else onUploaded(data as SiteProgram);
    } catch {
      setError("Network error");
    } finally {
      setUploading(false);
    }
  }

  async function handleSetUrl() {
    if (!urlInput.trim()) return;
    setUploading(true);
    setError(null);
    try {
      const body =
        type === "logo"
          ? { programName, setLogoUrl: urlInput.trim() }
          : { programName, setBgImageUrl: urlInput.trim() };
      const res = await fetch("/api/site-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Failed to set URL");
      else {
        onUploaded(data as SiteProgram);
        setUrlInput("");
      }
    } catch {
      setError("Network error");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    setRemoving(true);
    setError(null);
    try {
      const res = await fetch("/api/site-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programName,
          clearLogo: type === "logo",
          clearBg: type === "bg",
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Remove failed");
      else onRemoved(data as SiteProgram);
    } catch {
      setError("Network error");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div>
      {/* Label + mode tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        {label && (
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "var(--foreground)",
              fontFamily: "var(--font-phantom)",
            }}
          >
            {label}
          </div>
        )}
        <div
          style={{
            display: "flex",
            borderRadius: 9999,
            border: "1.5px solid var(--border)",
            overflow: "hidden",
            marginLeft: "auto",
          }}
        >
          {(["upload", "url"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "2px 10px",
                border: "none",
                background: mode === m ? "var(--red)" : "transparent",
                color: mode === m ? "var(--paper)" : "var(--foreground)",
                fontFamily: "var(--font-phantom)",
                fontSize: 11,
                cursor: "pointer",
                fontWeight: mode === m ? "bold" : "normal",
              }}
            >
              {m === "upload" ? "Upload" : "URL"}
            </button>
          ))}
        </div>
      </div>

      {mode === "upload" ? (
        <button
          type="button"
          aria-label="Upload image"
          onClick={() => !busy && inputRef.current?.click()}
          style={{
            appearance: "none",
            font: "inherit",
            color: "inherit",
            textAlign: "left",
            width: "100%",
            border: "2px dashed var(--border)",
            borderRadius: 10,
            padding: "10px 14px",
            cursor: busy ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--surface)",
            minHeight: 52,
          }}
        >
          {currentUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentUrl}
              alt=""
              style={{
                height: 32,
                width: "auto",
                maxWidth: 80,
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          ) : (
            <span style={{ color: "var(--muted)", fontSize: 20 }}>+</span>
          )}
          <span
            style={{
              fontFamily: "var(--font-phantom)",
              fontSize: 13,
              color: busy ? "var(--muted)" : "var(--foreground)",
            }}
          >
            {uploading
              ? "Uploading…"
              : removing
                ? "Removing…"
                : currentUrl
                  ? "Replace"
                  : "Upload file"}
          </span>
        </button>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="url"
            aria-label={`${label} image URL`}
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSetUrl();
            }}
            placeholder="https://example.com/image.png"
            disabled={busy}
            style={{
              flex: 1,
              border: "2px solid var(--border)",
              borderRadius: 8,
              padding: "8px 10px",
              fontFamily: "var(--font-phantom)",
              fontSize: 12,
              outline: "none",
              opacity: busy ? 0.5 : 1,
            }}
          />
          <button
            onClick={handleSetUrl}
            disabled={busy || !urlInput.trim()}
            style={{
              height: 38,
              paddingLeft: 14,
              paddingRight: 14,
              borderRadius: 8,
              border: "none",
              background: "var(--red)",
              color: "var(--paper)",
              fontFamily: "var(--font-phantom)",
              fontSize: 12,
              fontWeight: "bold",
              cursor: busy || !urlInput.trim() ? "default" : "pointer",
              opacity: busy || !urlInput.trim() ? 0.5 : 1,
            }}
          >
            {uploading ? "Setting…" : "Set"}
          </button>
        </div>
      )}

      {currentUrl && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!busy) handleRemove();
          }}
          disabled={busy}
          style={{
            marginTop: 6,
            background: "none",
            border: "none",
            color: "var(--red)",
            fontFamily: "var(--font-phantom)",
            fontSize: 12,
            cursor: busy ? "default" : "pointer",
            padding: 0,
            opacity: busy ? 0.5 : 1,
          }}
        >
          Remove {type === "logo" ? "logo" : "image"}
        </button>
      )}
      {error && (
        <div
          style={{
            color: "var(--red)",
            fontSize: 12,
            marginTop: 4,
            fontFamily: "var(--font-phantom)",
          }}
        >
          {error}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        aria-label={`${label} file`}
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ── Color field ───────────────────────────────────────────────────────────────
function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "var(--foreground)",
          marginBottom: 6,
          fontFamily: "var(--font-phantom)",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="color"
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: 36,
            height: 36,
            border: "2px solid var(--border)",
            borderRadius: 8,
            cursor: "pointer",
            padding: 2,
          }}
        />
        <input
          type="text"
          aria-label={`${label} hex value`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            border: "2px solid var(--border)",
            borderRadius: 8,
            padding: "6px 10px",
            width: 90,
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

// ── Slider field ──────────────────────────────────────────────────────────────
function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "var(--foreground)",
          marginBottom: 6,
          fontFamily: "var(--font-phantom)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{label}</span>
        <span style={{ opacity: 0.5 }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--red)" }}
      />
    </div>
  );
}

// ── Text field ────────────────────────────────────────────────────────────────
function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "var(--foreground)",
          marginBottom: 6,
          fontFamily: "var(--font-phantom)",
        }}
      >
        {label}
      </div>
      <input
        type="text"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "2px solid var(--border)",
          borderRadius: 8,
          padding: "8px 12px",
          fontFamily: "var(--font-phantom)",
          fontSize: 13,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ── Pin toggle (admin only) ──────────────────────────────────────────────────
function PinToggle({
  programName,
  pinned,
  onUpdate,
}: {
  programName: string;
  pinned: boolean;
  onUpdate: (s: SiteProgram) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/site-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programName, pinned: !pinned }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate(data as SiteProgram);
      } else {
        setError(data?.error ?? `Failed to update (${res.status})`);
      }
    } catch {
      setError("Network issue, try again?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: pinned ? "rgba(236,55,80,0.08)" : "var(--surface)",
          borderRadius: 12,
          border: pinned ? "2px solid var(--red)" : "2px solid var(--border)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={pinned ? "#ec3750" : "var(--muted)"}>
          <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-phantom)",
            fontSize: 13,
            fontWeight: "bold",
            color: pinned ? "var(--red)" : "var(--foreground)",
            flex: 1,
          }}
        >
          {pinned ? "Pinned to homepage" : "Pin to homepage"}
        </span>
        <button
          onClick={toggle}
          disabled={busy}
          style={{
            height: 30,
            paddingLeft: 14,
            paddingRight: 14,
            borderRadius: 9999,
            border: "none",
            background: pinned ? "var(--red)" : "var(--foreground)",
            color: "var(--paper)",
            fontFamily: "var(--font-phantom)",
            fontSize: 12,
            fontWeight: "bold",
            cursor: busy ? "default" : "pointer",
            opacity: busy ? 0.5 : 1,
          }}
        >
          {busy ? "..." : pinned ? "Unpin" : "Pin"}
        </button>
      </div>
      {error && (
        <span
          style={{
            fontFamily: "var(--font-phantom)",
            fontSize: 12,
            color: "var(--red)",
            paddingLeft: 4,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

// ── Program editor panel ──────────────────────────────────────────────────────
function ProgramEditor({
  prog,
  onChange,
  onSiteUpdate,
  isAdmin,
}: {
  prog: EditorProgram;
  onChange: (d: EditorProgram["draft"]) => void;
  onSiteUpdate: (s: SiteProgram) => void;
  isAdmin: boolean;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/site-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programName: prog.ysws.name,
          description: prog.draft.description,
          bgType: prog.draft.bgType,
          bgColor: prog.draft.bgColor,
          textColor: prog.draft.textColor,
          accentColor: prog.draft.accentColor,
          logoSize: prog.draft.logoSize,
          buttonColor: prog.draft.buttonColor,
          buttonTextColor: prog.draft.buttonTextColor,
          buttonBorderRadius: prog.draft.buttonBorderRadius,
          buttonBorderWidth: prog.draft.buttonBorderWidth,
          buttonBorderColor: prog.draft.buttonBorderColor,
          slackChannel: prog.draft.slackChannel,
          projectTypes: prog.draft.projectTypes,
          format: prog.draft.format || null,
          inPersonStart: prog.draft.inPersonStart || null,
          inPersonEnd: prog.draft.inPersonEnd || null,
          inPersonLocation: prog.draft.inPersonLocation,
          additionalRequirements: prog.draft.additionalRequirements || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Save failed");
      else {
        onSiteUpdate(data as SiteProgram);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  const d = prog.draft;
  const set = (patch: Partial<typeof d>) => onChange({ ...d, ...patch });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* Left: controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* ── Images ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <UploadButton
              label="Logo"
              type="logo"
              programName={prog.ysws.name}
              currentUrl={prog.site?.logoUrl ?? null}
              onUploaded={onSiteUpdate}
              onRemoved={onSiteUpdate}
            />
            {prog.site?.logoUrl && (
              <div style={{ marginTop: 10 }}>
                <SliderField
                  label="Logo size"
                  value={d.logoSize}
                  min={24}
                  max={120}
                  unit="px"
                  onChange={(v) => set({ logoSize: v })}
                />
              </div>
            )}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-phantom)",
                }}
              >
                Background
              </span>
              <div
                style={{
                  display: "flex",
                  borderRadius: 9999,
                  border: "2px solid var(--border)",
                  overflow: "hidden",
                }}
              >
                {(["color", "image"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => set({ bgType: t })}
                    style={{
                      padding: "2px 10px",
                      border: "none",
                      background: d.bgType === t ? "var(--red)" : "transparent",
                      color: d.bgType === t ? "var(--paper)" : "var(--foreground)",
                      fontFamily: "var(--font-phantom)",
                      fontSize: 11,
                      cursor: "pointer",
                      fontWeight: d.bgType === t ? "bold" : "normal",
                    }}
                  >
                    {t === "color" ? "Color" : "Image"}
                  </button>
                ))}
              </div>
            </div>
            {d.bgType === "image" ? (
              <UploadButton
                label=""
                type="bg"
                programName={prog.ysws.name}
                currentUrl={prog.site?.bgImageUrl ?? null}
                onUploaded={onSiteUpdate}
                onRemoved={onSiteUpdate}
              />
            ) : (
              <ColorField label="" value={d.bgColor} onChange={(v) => set({ bgColor: v })} />
            )}
          </div>
        </div>

        {/* ── Description ── */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "var(--foreground)",
              marginBottom: 6,
              fontFamily: "var(--font-phantom)",
            }}
          >
            Description
          </div>
          <textarea
            aria-label="Description"
            value={d.description}
            onChange={(e) => set({ description: e.target.value })}
            rows={3}
            style={{
              width: "100%",
              border: "2px solid var(--border)",
              borderRadius: 10,
              padding: "8px 12px",
              fontFamily: "var(--font-phantom)",
              fontSize: 13,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* ── Colors ── */}
        <ColorField
          label="Text color"
          value={d.textColor}
          onChange={(v) => set({ textColor: v })}
        />

        {/* ── Button ── */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: 12,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "var(--foreground)",
              fontFamily: "var(--font-phantom)",
              marginBottom: -4,
            }}
          >
            Button
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <ColorField
              label="Button color"
              value={d.buttonColor || "#ec3750"}
              onChange={(v) => set({ buttonColor: v })}
            />
            <ColorField
              label="Text color"
              value={d.buttonTextColor || "#ffffff"}
              onChange={(v) => set({ buttonTextColor: v })}
            />
            <SliderField
              label="Corner radius"
              value={d.buttonBorderRadius}
              min={0}
              max={44}
              unit="px"
              onChange={(v) => set({ buttonBorderRadius: v })}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <SliderField
              label="Border width"
              value={d.buttonBorderWidth}
              min={0}
              max={8}
              unit="px"
              onChange={(v) => set({ buttonBorderWidth: v })}
            />
            <ColorField
              label="Border color"
              value={d.buttonBorderColor || "#17171d"}
              onChange={(v) => set({ buttonBorderColor: v })}
            />
          </div>
        </div>

        {/* ── Slack ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}
        >
          <TextField
            label="Slack channel name"
            value={d.slackChannel}
            onChange={(v) => set({ slackChannel: v })}
            placeholder="stasis"
          />
          <ColorField
            label="Link color"
            value={d.accentColor}
            onChange={(v) => set({ accentColor: v })}
          />
        </div>

        {/* ── Format — single select ── */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "var(--foreground)",
              marginBottom: 4,
              fontFamily: "var(--font-phantom)",
            }}
          >
            Format
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "var(--font-phantom)",
              marginBottom: 8,
            }}
          >
            Choose one
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(["", "In-Person Only", "Online Only", "Both"] as const).map((f) => (
              <button
                key={f}
                onClick={() => set({ format: f })}
                style={{
                  height: 30,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 6,
                  border: d.format === f ? "2px solid var(--red)" : "2px solid var(--border)",
                  background: d.format === f ? "var(--red)" : "transparent",
                  color: d.format === f ? "var(--paper)" : "var(--foreground)",
                  fontFamily: "var(--font-phantom)",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: d.format === f ? "bold" : "normal",
                }}
              >
                {f || "Not set"}
              </button>
            ))}
          </div>
          {(d.format === "In-Person Only" || d.format === "Both") && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "var(--foreground)",
                      marginBottom: 6,
                      fontFamily: "var(--font-phantom)",
                    }}
                  >
                    Start date
                  </div>
                  <input
                    type="date"
                    aria-label="Start date"
                    value={d.inPersonStart}
                    onChange={(e) => set({ inPersonStart: e.target.value })}
                    style={{
                      width: "100%",
                      border: "2px solid var(--border)",
                      borderRadius: 8,
                      padding: "8px 10px",
                      fontFamily: "var(--font-phantom)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "var(--foreground)",
                      marginBottom: 6,
                      fontFamily: "var(--font-phantom)",
                    }}
                  >
                    End date
                  </div>
                  <input
                    type="date"
                    aria-label="End date"
                    value={d.inPersonEnd}
                    onChange={(e) => set({ inPersonEnd: e.target.value })}
                    style={{
                      width: "100%",
                      border: "2px solid var(--border)",
                      borderRadius: 8,
                      padding: "8px 10px",
                      fontFamily: "var(--font-phantom)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <TextField
                label="Location"
                value={d.inPersonLocation}
                onChange={(v) => set({ inPersonLocation: v })}
                placeholder="Austin, TX"
              />
            </div>
          )}
        </div>

        {/* ── Project types — multiselect ── */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "var(--foreground)",
              marginBottom: 4,
              fontFamily: "var(--font-phantom)",
            }}
          >
            Project types
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "var(--font-phantom)",
              marginBottom: 8,
            }}
          >
            Select all that apply
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {PROJECT_TYPE_OPTIONS.map((opt) => {
              const checked = d.projectTypes.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() =>
                    set({
                      projectTypes: checked
                        ? d.projectTypes.filter((t) => t !== opt)
                        : [...d.projectTypes, opt],
                    })
                  }
                  style={{
                    height: 30,
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderRadius: 9999,
                    border: checked ? "2px solid var(--red)" : "2px solid var(--border)",
                    background: checked ? "var(--red)" : "transparent",
                    color: checked ? "var(--paper)" : "var(--foreground)",
                    fontFamily: "var(--font-phantom)",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Additional requirements ── */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "var(--foreground)",
              marginBottom: 4,
              fontFamily: "var(--font-phantom)",
            }}
          >
            Additional requirements
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              fontFamily: "var(--font-phantom)",
              marginBottom: 8,
            }}
          >
            Most programs don&apos;t have anything to put here
          </div>
          <input
            type="text"
            aria-label="Additional requirements"
            value={d.additionalRequirements}
            onChange={(e) => set({ additionalRequirements: e.target.value })}
            placeholder="e.g. Girls only"
            style={{
              width: "100%",
              border: "2px solid var(--border)",
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: "var(--font-phantom)",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* ── Pin (admin only) ── */}
        {isAdmin && (
          <PinToggle
            programName={prog.ysws.name}
            pinned={prog.site?.pinned ?? false}
            onUpdate={onSiteUpdate}
          />
        )}

        {/* ── Save ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={save}
            disabled={saving}
            style={{
              height: 40,
              paddingLeft: 24,
              paddingRight: 24,
              borderRadius: 9999,
              border: "none",
              background: saved ? "#33d6a6" : "#ec3750",
              color: "#fff",
              fontFamily: "var(--font-phantom)",
              fontWeight: "bold",
              fontSize: 14,
              cursor: saving ? "default" : "pointer",
              opacity: saving ? 0.7 : 1,
              transition: "background 0.2s",
            }}
          >
            {saved ? "Saved ✓" : saving ? "Saving…" : "Save changes"}
          </button>
          {error && (
            <span style={{ color: "var(--red)", fontSize: 13, fontFamily: "var(--font-phantom)" }}>
              {error}
            </span>
          )}
        </div>
      </div>

      {/* Right: preview */}
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "var(--foreground)",
            marginBottom: 8,
            fontFamily: "var(--font-phantom)",
          }}
        >
          Preview
        </div>
        <CardPreview prog={prog} />
      </div>
    </div>
  );
}

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated"; error?: string }
  | {
      status: "authenticated";
      name: string;
      slack_id: string | null;
      isAdmin: boolean;
      editablePrograms: string[];
    };

// ── Page ──────────────────────────────────────────────────────────────────────
export default function EditPage() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [programs, setPrograms] = useState<EditorProgram[] | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Check auth and load editable programs
  useEffect(() => {
    const authError =
      new URLSearchParams(window.location.search).get("auth_error") === "1"
        ? "Sign-in failed. Please try again."
        : undefined;

    fetch("/api/programs/editable")
      .then((r) => {
        if (r.status === 401) {
          setAuth({ status: "unauthenticated", error: authError });
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setAuth({
          status: "authenticated",
          name: data.name,
          slack_id: data.slack_id,
          isAdmin: data.isAdmin ?? false,
          editablePrograms: data.editablePrograms ?? [],
        });
      })
      .catch(() => setAuth({ status: "unauthenticated", error: "Network error" }));
  }, []);

  // Load programs once authenticated
  useEffect(() => {
    if (auth.status !== "authenticated") return;
    Promise.all([
      fetch("/api/programs").then((r) => r.json()),
      fetch("/api/site-programs").then((r) => r.json()),
    ])
      .then(([ysws, site]) => {
        if (!Array.isArray(ysws)) {
          setLoadError(ysws.error ?? "Failed to load programs");
          return;
        }
        const siteMap = new Map<string, SiteProgram>(
          (Array.isArray(site) ? site : []).map((s: SiteProgram) => [s.programName, s]),
        );
        setPrograms(
          (ysws as AirtableProgram[]).map((p) => {
            const s = siteMap.get(p.name) ?? null;
            return {
              ysws: p,
              site: s,
              draft: {
                description: s?.description ?? "",
                bgType: s?.bgType ?? "color",
                bgColor: s?.bgColor ?? "var(--surface)",
                textColor: s?.textColor ?? "var(--foreground)",
                accentColor: s?.accentColor ?? "#ec3750",
                logoSize: s?.logoSize ?? 48,
                buttonColor: s?.buttonColor ?? "",
                buttonTextColor: s?.buttonTextColor ?? "",
                buttonBorderRadius: s?.buttonBorderRadius ?? 44,
                buttonBorderWidth: s?.buttonBorderWidth ?? 0,
                buttonBorderColor: s?.buttonBorderColor ?? "",
                slackChannel: s?.slackChannel ?? "",
                projectTypes: s?.projectTypes ?? [],
                format: s?.format ?? "",
                inPersonStart: s?.inPersonStart ?? "",
                inPersonEnd: s?.inPersonEnd ?? "",
                inPersonLocation: s?.inPersonLocation ?? "",
                additionalRequirements: s?.additionalRequirements ?? "",
              },
            };
          }),
        );
      })
      .catch(() => setLoadError("Network error"));
  }, [auth.status]);

  function updateDraft(name: string, draft: EditorProgram["draft"]) {
    setPrograms((prev) => prev?.map((p) => (p.ysws.name === name ? { ...p, draft } : p)) ?? null);
  }

  function updateSite(name: string, site: SiteProgram) {
    setPrograms(
      (prev) =>
        prev?.map((p) => {
          if (p.ysws.name === name) return { ...p, site };
          if (site.pinned && p.site?.pinned) return { ...p, site: { ...p.site, pinned: false } };
          return p;
        }) ?? null,
    );
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuth({ status: "unauthenticated" });
    setPrograms(null);
  }

  return (
    <main id="main" tabIndex={-1} style={{ background: "var(--background)", minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(80px, 10vh, 120px) 32px 80px" }}
      >
        {/* ── Auth: loading ── */}
        {auth.status === "loading" && (
          <p style={{ fontFamily: "var(--font-phantom)", opacity: 0.4 }}>Checking sign-in…</p>
        )}

        {/* ── Auth: not signed in ── */}
        {auth.status === "unauthenticated" && (
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}
          >
            <h1
              style={{
                fontFamily: "var(--font-zarathustra)",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: "normal",
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              Program Editor
            </h1>
            <p
              style={{
                fontFamily: "var(--font-phantom)",
                fontSize: 16,
                color: "var(--foreground)",
                opacity: 0.6,
                margin: 0,
              }}
            >
              Sign in with your Hack Club account to edit the programs you own.
            </p>
            {auth.error && (
              <p
                style={{
                  fontFamily: "var(--font-phantom)",
                  fontSize: 14,
                  color: "var(--red)",
                  margin: 0,
                }}
              >
                {auth.error}
              </p>
            )}
            {/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
            <a
              href="/api/auth/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                height: 48,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 9999,
                background: "var(--red)",
                color: "var(--paper)",
                fontFamily: "var(--font-phantom)",
                fontWeight: "bold",
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              Sign in with Hack Club
            </a>
          </div>
        )}

        {/* ── Auth: signed in ── */}
        {auth.status === "authenticated" && (
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
              <h1
                style={{
                  fontFamily: "var(--font-zarathustra)",
                  fontSize: "clamp(36px, 5vw, 60px)",
                  fontWeight: "normal",
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                Program Editor
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: auth.slack_id ? 8 : 40,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-phantom)",
                  fontSize: 15,
                  color: "var(--foreground)",
                  opacity: 0.5,
                  margin: 0,
                }}
              >
                {auth.slack_id ? (
                  <>
                    Signed in as <strong style={{ opacity: 1 }}>{auth.name}</strong> (
                    {auth.slack_id})
                    {auth.isAdmin && (
                      <>
                        {" "}
                        · <strong style={{ color: "var(--red)", opacity: 1 }}>Admin</strong>
                      </>
                    )}
                  </>
                ) : (
                  "No Slack ID found — cannot verify ownership"
                )}
              </p>
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--red)",
                  fontFamily: "var(--font-phantom)",
                  fontSize: 14,
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                Sign out
              </button>
            </div>

            {loadError && (
              <p style={{ color: "var(--red)", fontFamily: "var(--font-phantom)" }}>{loadError}</p>
            )}
            {programs === null && !loadError && (
              <p style={{ fontFamily: "var(--font-phantom)", opacity: 0.4 }}>Loading programs…</p>
            )}

            {programs !== null && !auth.isAdmin && auth.editablePrograms.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p
                  style={{
                    fontFamily: "var(--font-phantom)",
                    fontSize: 15,
                    color: "var(--foreground)",
                    opacity: 0.6,
                    margin: 0,
                  }}
                >
                  You don&apos;t have access to edit any programs.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-phantom)",
                    fontSize: 15,
                    color: "var(--foreground)",
                    opacity: 0.6,
                    margin: 0,
                  }}
                >
                  If you&apos;re from HQ and are running a program, add it to the Unified YSWS DB
                  with a start and end date for it to show up here.
                </p>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {programs
                ?.filter((prog) => auth.isAdmin || auth.editablePrograms.includes(prog.ysws.name))
                .map((prog) => (
                  <div
                    key={prog.ysws.id}
                    style={{
                      background: "var(--surface)",
                      borderRadius: 16,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() =>
                        setExpanded(expanded === prog.ysws.name ? null : prog.ysws.name)
                      }
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "18px 24px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      {prog.site?.logoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={prog.site.logoUrl}
                          alt=""
                          style={{
                            height: 28,
                            width: "auto",
                            objectFit: "contain",
                            borderRadius: 4,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontFamily: "var(--font-zarathustra)",
                          fontSize: 22,
                          color: "var(--foreground)",
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        {prog.ysws.name}
                        {prog.site?.pinned && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              background: "#ec3750",
                              fontFamily: "var(--font-phantom)",
                              fontSize: 11,
                              fontWeight: "bold",
                              color: "#fff",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                            </svg>
                            Pinned
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-phantom)",
                          fontSize: 13,
                          color: "var(--muted)",
                        }}
                      >
                        {new Date(prog.ysws.startDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        –{" "}
                        {new Date(prog.ysws.endDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span style={{ color: "var(--red)", fontSize: 14, marginLeft: 8 }}>
                        {expanded === prog.ysws.name ? "▲" : "▼"}
                      </span>
                    </button>
                    {expanded === prog.ysws.name && (
                      <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)" }}>
                        <div style={{ marginTop: 20 }}>
                          <ProgramEditor
                            prog={prog}
                            onChange={(draft) => updateDraft(prog.ysws.name, draft)}
                            onSiteUpdate={(site) => updateSite(prog.ysws.name, site)}
                            isAdmin={auth.isAdmin}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
