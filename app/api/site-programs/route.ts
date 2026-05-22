import { NextRequest, NextResponse } from "next/server";
import {
  parseRecord,
  siteBaseUrl,
  siteAuthHeaders,
  SITE_FIELDS,
  type SiteProgram,
} from "../../../lib/site-programs";
import { canEditProgram } from "../../../lib/server-auth";

export const dynamic = "force-dynamic";

function apiKey() {
  return process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
}

function isValid(value: string): boolean {
  return /^rec[A-Za-z0-9]{10,32}$/.test(value);
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
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST — create or update a program record (never duplicates)
export async function POST(req: NextRequest) {
  const key = apiKey();
  if (!key) {
    return NextResponse.json({ error: "HACK_CLUB_SITE_AIRTABLE_KEY is not set" }, { status: 500 });
  }

  const body = (await req.json()) as {
    programName: string;
    recordId?: string;
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
    projectTypes?: string[];
    format?: string | null;
    inPersonStart?: string | null;
    inPersonEnd?: string | null;
    inPersonLocation?: string;
    additionalRequirements?: string | null;
  };

  if (body.recordId !== undefined && !isValid(body.recordId)) {
    return NextResponse.json({ status: 400 });
  }

  // Authorization — must own this program (or be admin)
  if (!(await canEditProgram(req, body.programName))) {
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

  let recordId = body.recordId;

  // If no recordId supplied, find by name from the full record list
  if (!recordId) {
    try {
      const all = await getAllRecords(key);
      const match = all.find((r) => (r.fields["Name"] as string | undefined) === body.programName);
      if (match) recordId = match.id;
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  let res: Response;
  if (recordId) {
    if (!isValid(recordId)) {
      return NextResponse.json({ status: 400 });
    }

    const x = encodeURIComponent(recordId);
    // Update existing record
    res = await fetch(`${siteBaseUrl()}/${x}`, {
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
      return NextResponse.json(parseRecord(record) as SiteProgram);
    }
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: `Airtable error ${res.status}`, detail: await res.text() },
      { status: res.status },
    );
  }

  return NextResponse.json(parseRecord(await res.json()) as SiteProgram);
}
