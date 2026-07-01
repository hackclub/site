/**
 * Server-side auth helpers.
 * All functions read from request cookies — never from client-supplied headers.
 */
import { NextRequest } from "next/server";
import { siteAuthHeaders } from "./site-programs";

const SITE_BASE_ID = "appsbFEoTS7vN2zeB";
const YSWS_BASE = "app3A5kJwYqxMLOgh";
const ADMINS_TABLE = "Admins";
const AUTHORS_TABLE = "YSWS Authors";
const PROGRAMS_TABLE = "YSWS Programs";

export function isValidSlackId(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[UW][A-Z0-9]{2,32}$/i.test(value);
}

export function isValidAirtableRecordId(value: unknown): value is string {
  return typeof value === "string" && /^rec[A-Za-z0-9]{14}$/.test(value);
}

/** Resolve the Hack Club Slack ID for the currently signed-in user, or null. */
async function getSlackId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("hc_access_token")?.value;
  if (!token) return null;

  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return null;

  const me = await meRes.json();
  const slackId = me.identity?.slack_id ?? null;
  return isValidSlackId(slackId) ? slackId : null;
}

/** Return true if the given Slack ID is in the Site Admins table. */
async function isAdmin(slackId: string): Promise<boolean> {
  const siteKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  if (!siteKey) return false;

  const url = new URL(
    `https://api.airtable.com/v0/${SITE_BASE_ID}/${encodeURIComponent(ADMINS_TABLE)}`,
  );
  url.searchParams.set("filterByFormula", `{slack_id}="${slackId}"`);
  url.searchParams.append("fields[]", "slack_id");

  const res = await fetch(url.toString(), { headers: siteAuthHeaders(siteKey) });
  if (!res.ok) return false;
  const data = await res.json();
  return (data.records ?? []).length > 0;
}

/**
 * Returns true if the signed-in user is allowed to edit the given program name.
 * Admins can edit anything. Others must be listed as a Current Owner in YSWS Authors.
 */
export async function canEditProgram(req: NextRequest, programName: string): Promise<boolean> {
  const slackId = await getSlackId(req);
  if (!slackId) return false;

  // Admins bypass all ownership checks
  if (await isAdmin(slackId)) return true;

  return ownsProgram(slackId, programName);
}

export async function getEditAuth(
  req: NextRequest,
  programName: string,
): Promise<{ canEdit: boolean; isAdmin: boolean }> {
  const slackId = await getSlackId(req);
  if (!slackId) return { canEdit: false, isAdmin: false };

  if (await isAdmin(slackId)) return { canEdit: true, isAdmin: true };

  return { canEdit: await ownsProgram(slackId, programName), isAdmin: false };
}

async function ownsProgram(slackId: string, programName: string): Promise<boolean> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) return false;

  const ywswHeaders = { Authorization: `Bearer ${apiKey}` };

  // Find the YSWS Authors record for this Slack ID
  const authorsUrl = new URL(
    `https://api.airtable.com/v0/${YSWS_BASE}/${encodeURIComponent(AUTHORS_TABLE)}`,
  );
  authorsUrl.searchParams.set("filterByFormula", `{Slack ID}="${slackId}"`);
  authorsUrl.searchParams.append("fields[]", "Current YSWS Programs");

  const authorsRes = await fetch(authorsUrl.toString(), { headers: ywswHeaders });
  if (!authorsRes.ok) return false;

  const authorsData = await authorsRes.json();
  const ids = authorsData.records?.[0]?.fields?.["Current YSWS Programs"];
  const programRecordIds = Array.isArray(ids) ? ids.filter(isValidAirtableRecordId) : [];
  if (programRecordIds.length === 0) return false;

  // Resolve those record IDs to program names
  const formula = `OR(${programRecordIds.map((id) => `RECORD_ID()="${id}"`).join(",")})`;
  const programsUrl = new URL(
    `https://api.airtable.com/v0/${YSWS_BASE}/${encodeURIComponent(PROGRAMS_TABLE)}`,
  );
  programsUrl.searchParams.set("filterByFormula", formula);
  programsUrl.searchParams.append("fields[]", "Name");

  const programsRes = await fetch(programsUrl.toString(), { headers: ywswHeaders });
  if (!programsRes.ok) return false;

  const programsData = await programsRes.json();
  const editableNames: string[] = (programsData.records ?? [])
    .map((r: { fields: { Name?: string } }) => r.fields.Name ?? "")
    .filter(Boolean);

  return editableNames.includes(programName);
}
