import { NextRequest, NextResponse } from "next/server";
import {
  parseRecord,
  siteBaseUrl,
  siteAuthHeaders,
  SITE_FIELDS,
  PROJECT_TYPE_OPTIONS,
  type SiteProgram,
  type ProjectType,
} from "../../../lib/site-programs";
import { getEditAuth } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

function apiKey() {
  return process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
}

const optStr = (v: unknown, max = 5000) =>
  v === undefined || v === null || (typeof v === "string" && v.length <= max);

const optNum = (v: unknown, min: number, max: number) =>
  v === undefined || (typeof v === "number" && Number.isFinite(v) && v >= min && v <= max);

const optBool = (v: unknown) => v === undefined || typeof v === "boolean";

const optHttpUrl = (v: unknown) => {
  if (v === undefined) return true;
  if (typeof v !== "string" || v.length > 2000) return false;
  try {
    return ["http:", "https:"].includes(new URL(v).protocol);
  } catch {
    return false;
  }
};

const optIsoDate = (v: unknown) =>
  v === undefined || v === null || (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v));

const BG_TYPES = new Set(["color", "image"]);
const FORMATS = new Set(["In-Person Only", "Online Only", "Both"]);
const PROJECT_TYPES = new Set<string>(PROJECT_TYPE_OPTIONS);

type ValidatedBody = {
  programName: string;
  description?: string;
  bgType?: "color" | "image";
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  clearLogo?: boolean;
  clearBg?: boolean;
  setLogoUrl?: string;
  setBgImageUrl?: string;
  logoSize?: number;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonBorderRadius?: number;
  buttonBorderWidth?: number;
  buttonBorderColor?: string;
  slackChannel?: string;
  projectTypes?: ProjectType[];
  format?: string | null;
  inPersonStart?: string | null;
  inPersonEnd?: string | null;
  inPersonLocation?: string;
  additionalRequirements?: string | null;
  pinned?: boolean;
};

const STRING_FIELDS = [
  "description",
  "bgColor",
  "textColor",
  "accentColor",
  "buttonColor",
  "buttonTextColor",
  "buttonBorderColor",
  "slackChannel",
  "inPersonLocation",
  "additionalRequirements",
] as const;

function validateBody(
  raw: unknown,
): { ok: true; body: ValidatedBody } | { ok: false; error: string } {
  const bad = (error: string) => ({ ok: false, error }) as const;

  if (typeof raw !== "object" || raw === null || Array.isArray(raw))
    return bad("Body must be a JSON object");
  const r = raw as Record<string, unknown>;

  if (typeof r.programName !== "string" || !r.programName.trim() || r.programName.length > 200)
    return bad("Invalid programName");

  for (const k of STRING_FIELDS) if (!optStr(r[k])) return bad(`Invalid ${k}`);

  if (!optNum(r.logoSize, 8, 512)) return bad("Invalid logoSize");
  if (!optNum(r.buttonBorderRadius, 0, 9999)) return bad("Invalid buttonBorderRadius");
  if (!optNum(r.buttonBorderWidth, 0, 64)) return bad("Invalid buttonBorderWidth");

  for (const k of ["clearLogo", "clearBg", "pinned"] as const)
    if (!optBool(r[k])) return bad(`Invalid ${k}`);

  if (!optHttpUrl(r.setLogoUrl)) return bad("Invalid setLogoUrl");
  if (!optHttpUrl(r.setBgImageUrl)) return bad("Invalid setBgImageUrl");

  if (r.bgType !== undefined && !BG_TYPES.has(r.bgType as string)) return bad("Invalid bgType");
  if (r.format !== undefined && r.format !== null && !FORMATS.has(r.format as string))
    return bad("Invalid format");

  if (!optIsoDate(r.inPersonStart)) return bad("Invalid inPersonStart (expected YYYY-MM-DD)");
  if (!optIsoDate(r.inPersonEnd)) return bad("Invalid inPersonEnd (expected YYYY-MM-DD)");

  if (r.projectTypes !== undefined) {
    if (!Array.isArray(r.projectTypes)) return bad("Invalid projectTypes");
    for (const t of r.projectTypes)
      if (typeof t !== "string" || !PROJECT_TYPES.has(t))
        return bad(`Invalid project type: ${String(t)}`);
  }

  return { ok: true, body: r as ValidatedBody };
}

function fieldParams() {
  return SITE_FIELDS.map((f) => `fields[]=${encodeURIComponent(f)}`).join("&");
}

async function getAllRecords(key: string) {
  const res = await fetch(`${siteBaseUrl()}?${fieldParams()}`, {
    headers: siteAuthHeaders(key),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.records ?? []) as { id: string; fields: Record<string, unknown> }[];
}

// GET — list all site program customizations
export async function GET() {
  const key = apiKey();
  if (!key) {
    return NextResponse.json({ error: "HACK_CLUB_SITE_AIRTABLE_KEY is not set" }, { status: 500 });
  }
  try {
    const records = await getAllRecords(key);
    return NextResponse.json(records.map(parseRecord));
  } catch (e) {
    console.error("[site-programs] GET failed", e);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

// POST — create or update a program record (never duplicates)
export async function POST(req: NextRequest) {
  const key = apiKey();
  if (!key) {
    return NextResponse.json({ error: "HACK_CLUB_SITE_AIRTABLE_KEY is not set" }, { status: 500 });
  }

  const v = await req
    .json()
    .then((raw) => validateBody(raw))
    .catch(() => ({ ok: false as const, error: "Invalid JSON" }));
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });
  const body = v.body;

  // Authorization — must own this program (or be admin)
  const { canEdit, isAdmin } = await getEditAuth(req, body.programName);
  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const fields: Record<string, unknown> = { Name: body.programName };
  if (body.description !== undefined) fields["Description"] = body.description;
  if (body.bgColor !== undefined) fields["Card BG Color"] = body.bgColor;
  if (body.textColor !== undefined) fields["Text Color"] = body.textColor;
  if (body.accentColor !== undefined) fields["Accent Color"] = body.accentColor;
  if (body.bgType !== undefined) fields["BG Type"] = body.bgType;
  if (body.clearLogo) fields["Logo"] = [];
  if (body.clearBg) fields["BG Image"] = [];
  if (body.setLogoUrl)
    fields["Logo"] = [
      { url: body.setLogoUrl, filename: body.setLogoUrl.split("/").pop() || "logo" },
    ];
  if (body.setBgImageUrl)
    fields["BG Image"] = [
      { url: body.setBgImageUrl, filename: body.setBgImageUrl.split("/").pop() || "bg" },
    ];
  if (body.logoSize !== undefined) fields["Logo Size"] = body.logoSize;
  if (body.buttonColor !== undefined) fields["Button Color"] = body.buttonColor;
  if (body.buttonTextColor !== undefined) fields["Button Text Color"] = body.buttonTextColor;
  if (body.buttonBorderRadius !== undefined)
    fields["Button Border Radius"] = body.buttonBorderRadius;
  if (body.buttonBorderWidth !== undefined) fields["Button Border Width"] = body.buttonBorderWidth;
  if (body.buttonBorderColor !== undefined) fields["Button Border Color"] = body.buttonBorderColor;
  if (body.slackChannel !== undefined) fields["Slack Channel"] = body.slackChannel;
  if (body.projectTypes !== undefined) fields["Project Types"] = body.projectTypes;
  if (body.format !== undefined) fields["Format"] = body.format;
  if (body.inPersonStart !== undefined) fields["In-Person Start"] = body.inPersonStart;
  if (body.inPersonEnd !== undefined) fields["In-Person End"] = body.inPersonEnd;
  if (body.inPersonLocation !== undefined) fields["In-Person Location"] = body.inPersonLocation;
  if (body.additionalRequirements !== undefined)
    fields["Additional Requirements"] = body.additionalRequirements;

  if (body.pinned !== undefined) {
    if (!isAdmin) {
      return NextResponse.json({ error: "Only admins can pin events" }, { status: 403 });
    }
    fields["Pinned"] = body.pinned;
  }

  // Always resolve recordId server-side from the authorized programName.
  // Never trust a client-supplied recordId: the authorization check is keyed on
  // programName, so accepting an arbitrary recordId would let any program owner
  // edit any other program's record.
  let recordId: string | undefined;
  let allRecords: { id: string; fields: Record<string, unknown> }[];
  try {
    allRecords = await getAllRecords(key);
    const match = allRecords.find(
      (r) => (r.fields["Name"] as string | undefined) === body.programName,
    );
    if (match) recordId = match.id;
  } catch (e) {
    console.error("[site-programs] record lookup failed", e);
    return NextResponse.json({ error: "Failed to look up program" }, { status: 500 });
  }

  let res: Response;
  let savedRecordId: string | undefined = recordId;
  if (recordId) {
    if (!/^rec[A-Za-z0-9]{14}$/.test(recordId)) {
      return NextResponse.json({ error: "Invalid record id" }, { status: 400 });
    }

    // Update existing record
    res = await fetch(`${siteBaseUrl()}/${encodeURIComponent(recordId)}`, {
      method: "PATCH",
      headers: siteAuthHeaders(key),
      body: JSON.stringify({ fields }),
    });
  } else {
    // Create new record
    res = await fetch(siteBaseUrl(), {
      method: "POST",
      headers: siteAuthHeaders(key),
      body: JSON.stringify({ records: [{ fields }] }),
    });
    // POST returns { records: [...] }
    if (res.ok) {
      const data = await res.json();
      const record = data.records?.[0];
      if (!record) return NextResponse.json({ error: "No record returned" }, { status: 500 });
      savedRecordId = record.id;
      if (body.pinned === true) await unpinOthers(key, allRecords, savedRecordId);
      return NextResponse.json(parseRecord(record) as SiteProgram);
    }
  }

  if (!res.ok) {
    console.error("[site-programs] Airtable error", res.status, await res.text());
    return NextResponse.json({ error: `Upstream error ${res.status}` }, { status: res.status });
  }

  if (body.pinned === true) await unpinOthers(key, allRecords, savedRecordId);

  return NextResponse.json(parseRecord(await res.json()) as SiteProgram);
}

async function unpinOthers(
  key: string,
  allRecords: { id: string; fields: Record<string, unknown> }[],
  exceptId: string | undefined,
) {
  const others = allRecords.filter((r) => r.fields["Pinned"] === true && r.id !== exceptId);
  await Promise.all(
    others.map(async (r) => {
      const res = await fetch(`${siteBaseUrl()}/${encodeURIComponent(r.id)}`, {
        method: "PATCH",
        headers: siteAuthHeaders(key),
        body: JSON.stringify({ fields: { Pinned: false } }),
      });
      if (!res.ok) {
        console.error("[site-programs] failed to unpin", r.id, res.status, await res.text());
      }
    }),
  );
}
