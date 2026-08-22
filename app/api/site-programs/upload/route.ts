import { NextRequest, NextResponse } from "next/server";
import {
  SITE_BASE_ID,
  parseRecord,
  siteBaseUrl,
  siteAuthHeaders,
} from "../../../../lib/site-programs";
import { canEditProgram } from "../../../../lib/server-auth";
import { apiError } from "@/lib/api-error";

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
    return apiError({
      status: 500,
      code: "server_misconfigured",
      message: "HACK_CLUB_SITE_AIRTABLE_KEY is not set",
    });
  }

  const form = await req.formData();
  const programName = form.get("programName");
  const type = form.get("type");
  const file = form.get("file");

  if (typeof programName !== "string" || !programName.trim() || programName.length > 200) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid programName",
      hint: "Send the program's exact name in the `programName` form field (1-200 characters).",
    });
  }
  if (type !== "logo" && type !== "bg") {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid type (expected 'logo' or 'bg')",
    });
  }
  if (!(file instanceof File)) {
    return apiError({ status: 400, code: "bad_request", message: "Missing file" });
  }

  const ALLOWED_MIME: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
  };
  const MAX_BYTES = 8 * 1024 * 1024;

  const mime = file.type;
  const ext = ALLOWED_MIME[mime];
  if (!ext) {
    return apiError({
      status: 415,
      code: "unsupported_media_type",
      message: "Unsupported file type. Allowed: PNG, JPEG, GIF, WebP.",
    });
  }
  if (file.size > MAX_BYTES) {
    return apiError({
      status: 413,
      code: "payload_too_large",
      message: "File too large (max 8 MB)",
    });
  }

  // Authorization — must own this program (or be admin)
  if (!(await canEditProgram(req, programName))) {
    return apiError({
      status: 403,
      code: "forbidden",
      message: "Forbidden",
      hint: "Sign in at /api/auth/login as an owner of this program, or as an admin.",
    });
  }

  const filename = `${type}.${ext}`;
  const fieldName = type === "logo" ? "Logo" : "BG Image";

  const recordId = await findOrCreate(programName, key);
  if (!/^rec[A-Za-z0-9]{14}$/.test(recordId)) {
    console.error("[upload] unexpected Airtable record id", recordId);
    return apiError({
      status: 502,
      code: "upstream_error",
      message: "Invalid record id from upstream",
    });
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const uploadRes = await fetch(
    `https://content.airtable.com/v0/${SITE_BASE_ID}/${encodeURIComponent(recordId)}/${encodeURIComponent(fieldName)}/uploadAttachment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentType: mime,
        filename,
        file: base64,
      }),
    },
  );

  if (!uploadRes.ok) {
    console.error("[upload] Airtable content API error", uploadRes.status, await uploadRes.text());
    return apiError({
      status: uploadRes.status,
      code: "upstream_error",
      message: `Upload failed (${uploadRes.status})`,
    });
  }

  // Fetch the updated record to return fresh data
  const fetchRes = await fetch(`${siteBaseUrl()}/${encodeURIComponent(recordId)}`, {
    headers: siteAuthHeaders(key),
    cache: "no-store",
  });
  if (!fetchRes.ok) {
    return apiError({
      status: 500,
      code: "upstream_error",
      message: "Upload succeeded but failed to fetch updated record",
    });
  }

  return NextResponse.json(parseRecord(await fetchRes.json()));
}
