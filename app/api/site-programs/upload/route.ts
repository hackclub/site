import { NextRequest, NextResponse } from "next/server";
import {
  SITE_BASE_ID,
  parseRecord,
  siteBaseUrl,
  siteAuthHeaders,
} from "../../../../lib/site-programs";
import { canEditProgram } from "../../../../lib/server-auth";

export const dynamic = "force-dynamic";

function apiKey() {
  return process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
}

// Find or create a record by program name
async function findOrCreate(programName: string, key: string): Promise<string> {
  const listRes = await fetch(`${siteBaseUrl()}?fields[]=Name`, {
    headers: siteAuthHeaders(key),
    cache: "no-store",
  });
  const listData = await listRes.json();
  const records = (listData.records ?? []) as { id: string; fields: { Name?: string } }[];
  const existing = records.find((r) => r.fields.Name === programName);
  if (existing) return existing.id;

  const createRes = await fetch(siteBaseUrl(), {
    method: "POST",
    headers: siteAuthHeaders(key),
    body: JSON.stringify({ records: [{ fields: { Name: programName } }] }),
  });
  const createData = await createRes.json();
  const created = createData.records?.[0] as { id: string } | undefined;
  if (!created) throw new Error("Failed to create record");
  return created.id;
}

// POST — upload logo or background image for a program
// FormData fields: programName (string), type ("logo" | "bg"), file (File)
export async function POST(req: NextRequest) {
  const key = apiKey();
  if (!key) {
    return NextResponse.json({ error: "HACK_CLUB_SITE_AIRTABLE_KEY is not set" }, { status: 500 });
  }

  const form = await req.formData();
  const programName = form.get("programName") as string;
  const type = form.get("type") as "logo" | "bg";
  const file = form.get("file") as File | null;

  if (!programName || !type || !file) {
    return NextResponse.json({ error: "Missing programName, type, or file" }, { status: 400 });
  }

  // Authorization — must own this program (or be admin)
  if (!(await canEditProgram(req, programName))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ext = file.name.split(".").pop() ?? "png";
  const filename = `${type}.${ext}`;
  const fieldName = type === "logo" ? "Logo" : "BG Image";

  const recordId = await findOrCreate(programName, key);

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  console.error("[upload] POSTing to content API", {
    baseId: SITE_BASE_ID,
    recordId,
    fieldName,
    filename,
    size: bytes.byteLength,
  });

  const uploadRes = await fetch(
    `https://content.airtable.com/v0/${SITE_BASE_ID}/${recordId}/${encodeURIComponent(fieldName)}/uploadAttachment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentType: file.type || "image/png",
        filename,
        file: base64,
      }),
    },
  );

  if (!uploadRes.ok) {
    const detail = await uploadRes.text();
    console.error("[upload] Airtable content API error", uploadRes.status, detail);
    return NextResponse.json(
      { error: `Airtable upload error ${uploadRes.status}`, detail },
      { status: uploadRes.status },
    );
  }

  // Fetch the updated record to return fresh data
  const fetchRes = await fetch(`${siteBaseUrl()}/${recordId}`, {
    headers: siteAuthHeaders(key),
    cache: "no-store",
  });
  if (!fetchRes.ok) {
    return NextResponse.json(
      { error: "Upload succeeded but failed to fetch updated record" },
      { status: 500 },
    );
  }

  return NextResponse.json(parseRecord(await fetchRes.json()));
}
