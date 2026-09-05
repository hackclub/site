import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { siteAuthHeaders } from "../../../../lib/site-programs";
import { PROGRAMS_CACHE_TAG } from "../../../../lib/programs-data";
import { getEditAuth, isValidSlackId, isValidAirtableRecordId } from "../../../../lib/server-auth";
import { apiError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

const YSWS_BASE = "app3A5kJwYqxMLOgh";
const AUTHORS_TABLE = "YSWS Authors";
const PROGRAMS_TABLE = "YSWS Programs";
const SITE_BASE_ID = "appsbFEoTS7vN2zeB";
const ADMINS_TABLE = "Admins";

type EditableProgram = {
  id: string;
  name: string;
  startDate: string | null;
  endDate: string | null;
  websiteUrl: string | null;
};

type AirtableErrorDetails = {
  type: string | null;
  message: string;
};

async function logAirtableFailure(
  response: Response,
  context: {
    requestId: string;
    operation: string;
    baseId: string;
    table: string;
    programId?: string;
    programName?: string;
  },
): Promise<AirtableErrorDetails> {
  const rawBody = await response.text();
  let type: string | null = null;
  let message = rawBody.slice(0, 1000) || response.statusText || "Unknown Airtable error";
  try {
    const parsed = JSON.parse(rawBody);
    type = typeof parsed?.error?.type === "string" ? parsed.error.type : null;
    if (typeof parsed?.error?.message === "string") message = parsed.error.message;
  } catch {
    // Airtable occasionally returns a non-JSON proxy response. The truncated body is still useful.
  }

  console.error(
    "[programs/editable] airtable_failure",
    JSON.stringify({
      ...context,
      upstreamStatus: response.status,
      upstreamStatusText: response.statusText,
      airtableErrorType: type,
      airtableErrorMessage: message,
    }),
  );
  return { type, message };
}

function normalizeWebsiteUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const url = value.trim();
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function parseEditableProgram(record: {
  id: string;
  fields: Record<string, unknown>;
}): EditableProgram {
  return {
    id: record.id,
    name: typeof record.fields.Name === "string" ? record.fields.Name : "Unnamed",
    startDate: typeof record.fields["Start Date"] === "string" ? record.fields["Start Date"] : null,
    endDate: typeof record.fields["End Date"] === "string" ? record.fields["End Date"] : null,
    websiteUrl: normalizeWebsiteUrl(record.fields["Website URL"]),
  };
}

async function fetchEditablePrograms(
  headers: Record<string, string>,
  requestId: string,
  recordIds?: string[],
): Promise<EditableProgram[]> {
  const programsUrl = new URL(
    `https://api.airtable.com/v0/${YSWS_BASE}/${encodeURIComponent(PROGRAMS_TABLE)}`,
  );
  if (recordIds) {
    if (recordIds.length === 0) return [];
    programsUrl.searchParams.set(
      "filterByFormula",
      `OR(${recordIds.map((id) => `RECORD_ID()="${id}"`).join(",")})`,
    );
  }
  for (const field of ["Name", "Start Date", "End Date", "Website URL"]) {
    programsUrl.searchParams.append("fields[]", field);
  }

  const programs: EditableProgram[] = [];
  let offset: string | undefined;
  do {
    if (offset) programsUrl.searchParams.set("offset", offset);
    const programsRes = await fetch(programsUrl.toString(), {
      headers,
      cache: "no-store",
    });
    if (!programsRes.ok) {
      await logAirtableFailure(programsRes, {
        requestId,
        operation: "list_programs",
        baseId: YSWS_BASE,
        table: PROGRAMS_TABLE,
      });
      throw new Error("Airtable program listing failed");
    }
    const programsData = await programsRes.json();
    programs.push(...(programsData.records ?? []).map(parseEditableProgram));
    offset = programsData.offset;
  } while (offset);
  return programs;
}

/**
 * Everything the GET returns is scoped to the caller's session cookie, so it
 * must never land in a shared cache.
 */
function sessionJson(body: unknown): NextResponse {
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}

export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();
  // 1. Get HC access token from cookie
  const token = req.cookies.get("hc_access_token")?.value;
  if (!token) return apiError({ status: 401, code: "unauthorized", message: "Not authenticated" });

  // 2. Resolve user's Slack ID
  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return apiError({ status: 401, code: "unauthorized", message: "Invalid token" });
  const me = await meRes.json();

  const rawSlackId: string | null = me.identity?.slack_id ?? null;
  const slackId = isValidSlackId(rawSlackId) ? rawSlackId : null;
  if (!slackId) {
    return sessionJson({
      name: me.identity?.id ?? "Unknown",
      slack_id: null,
      isAdmin: false,
      editablePrograms: [],
      programs: [],
    });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const siteKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  if (!apiKey)
    return apiError({
      status: 500,
      code: "server_misconfigured",
      message: "AIRTABLE_API_KEY not set",
    });

  const ywswHeaders = { Authorization: `Bearer ${apiKey}` };

  // 3. Check admin status + YSWS author record in parallel
  const adminsUrl = new URL(
    `https://api.airtable.com/v0/${SITE_BASE_ID}/${encodeURIComponent(ADMINS_TABLE)}`,
  );
  adminsUrl.searchParams.set("filterByFormula", `{slack_id}="${slackId}"`);
  adminsUrl.searchParams.append("fields[]", "slack_id");

  const authorsUrl = new URL(
    `https://api.airtable.com/v0/${YSWS_BASE}/${encodeURIComponent(AUTHORS_TABLE)}`,
  );
  authorsUrl.searchParams.set("filterByFormula", `{Slack ID}="${slackId}"`);
  authorsUrl.searchParams.append("fields[]", "Name");
  authorsUrl.searchParams.append("fields[]", "Current YSWS Programs");

  const [adminsRes, authorsRes] = await Promise.all([
    siteKey
      ? fetch(adminsUrl.toString(), { headers: siteAuthHeaders(siteKey) })
      : Promise.resolve(null),
    fetch(authorsUrl.toString(), { headers: ywswHeaders }),
  ]);

  if (adminsRes && !adminsRes.ok) {
    await logAirtableFailure(adminsRes, {
      requestId,
      operation: "check_site_admin",
      baseId: SITE_BASE_ID,
      table: ADMINS_TABLE,
    });
    return apiError({
      status: 502,
      code: "upstream_error",
      message: "Failed to verify program manager access",
      hint: `Check the site Airtable token and use request ID ${requestId} to find the server log.`,
      headers: { "X-Request-ID": requestId },
    });
  }
  if (!authorsRes.ok) {
    await logAirtableFailure(authorsRes, {
      requestId,
      operation: "find_program_owner",
      baseId: YSWS_BASE,
      table: AUTHORS_TABLE,
    });
    return apiError({
      status: 502,
      code: "upstream_error",
      message: "Failed to load program ownership",
      hint: `Check the Unified YSWS Airtable token and use request ID ${requestId} to find the server log.`,
      headers: { "X-Request-ID": requestId },
    });
  }

  // Check admin
  const isAdmin = adminsRes?.ok ? ((await adminsRes.json()).records ?? []).length > 0 : false;

  // Get author name
  const authorsData = authorsRes.ok ? await authorsRes.json() : { records: [] };
  const authorRecord = (authorsData.records ?? [])[0];
  const authorName: string = authorRecord?.fields?.["Name"] ?? slackId;

  // Admins can edit everything — skip the program ownership lookup
  if (isAdmin) {
    let programs: EditableProgram[];
    try {
      programs = await fetchEditablePrograms(ywswHeaders, requestId);
    } catch {
      return apiError({
        status: 502,
        code: "upstream_error",
        message: "Failed to load programs from Airtable",
        hint: `Use request ID ${requestId} to find the detailed Airtable error in the server log.`,
        headers: { "X-Request-ID": requestId },
      });
    }
    return sessionJson({
      name: authorName,
      slack_id: slackId,
      isAdmin: true,
      editablePrograms: programs.map((program) => program.name),
      programs,
    });
  }

  // 4. Find which programs this person owns
  const ids = authorRecord?.fields?.["Current YSWS Programs"];
  const programRecordIds: string[] = Array.isArray(ids) ? ids.filter(isValidAirtableRecordId) : [];
  if (programRecordIds.length === 0) {
    return sessionJson({
      name: authorName,
      slack_id: slackId,
      isAdmin: false,
      editablePrograms: [],
      programs: [],
    });
  }

  let programs: EditableProgram[];
  try {
    programs = await fetchEditablePrograms(ywswHeaders, requestId, programRecordIds);
  } catch {
    return apiError({
      status: 502,
      code: "upstream_error",
      message: "Failed to load your programs from Airtable",
      hint: `Use request ID ${requestId} to find the detailed Airtable error in the server log.`,
      headers: { "X-Request-ID": requestId },
    });
  }
  const editablePrograms = programs.map((program) => program.name).filter(Boolean);

  return sessionJson({
    name: authorName,
    slack_id: slackId,
    isAdmin: false,
    editablePrograms,
    programs,
  });
}

const isOptionalDate = (value: unknown) =>
  value === null || (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value));

function normalizeEditableUrl(value: unknown): string | null | undefined {
  if (value === null || value === "") return null;
  if (typeof value !== "string" || value.length > 2000) return undefined;
  const normalized = /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`;
  try {
    const url = new URL(normalized);
    return ["http:", "https:"].includes(url.protocol) ? normalized : undefined;
  } catch {
    return undefined;
  }
}

// PATCH — update the Unified YSWS fields that control where and when a program links.
export async function PATCH(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    return apiError({
      status: 500,
      code: "server_misconfigured",
      message: "AIRTABLE_API_KEY not set",
    });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return apiError({ status: 400, code: "bad_request", message: "Invalid JSON body" });
  }

  const { programId, programName, startDate, endDate, websiteUrl } = body as Record<
    string,
    unknown
  >;
  const normalizedWebsiteUrl = normalizeEditableUrl(websiteUrl);
  if (!isValidAirtableRecordId(programId)) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid program record ID",
    });
  }
  if (typeof programName !== "string" || !programName.trim()) {
    return apiError({ status: 400, code: "bad_request", message: "Program name is required" });
  }
  if (!isOptionalDate(startDate) || !isOptionalDate(endDate)) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Program dates must use YYYY-MM-DD format",
    });
  }
  if (typeof startDate === "string" && typeof endDate === "string" && endDate < startDate) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Program end date cannot be before its start date",
      hint: `The submitted start date is ${startDate}, but the end date is ${endDate}. Correct the start date or choose an end date on or after it.`,
    });
  }
  if (normalizedWebsiteUrl === undefined) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Website URL must be a valid HTTP or HTTPS URL",
    });
  }

  const { canEdit } = await getEditAuth(req, programName);
  if (!canEdit) {
    console.warn(
      "[programs/editable] authorization_denied",
      JSON.stringify({ requestId, operation: "update_program", programId, programName }),
    );
    return apiError({ status: 403, code: "forbidden", message: "Forbidden" });
  }

  const recordUrl = `https://api.airtable.com/v0/${YSWS_BASE}/${encodeURIComponent(PROGRAMS_TABLE)}/${encodeURIComponent(programId)}`;
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  // Confirm that the authorized name belongs to this record before accepting the client ID.
  const existingRes = await fetch(recordUrl, { headers, cache: "no-store" });
  if (!existingRes.ok) {
    await logAirtableFailure(existingRes, {
      requestId,
      operation: "read_program_before_update",
      baseId: YSWS_BASE,
      table: PROGRAMS_TABLE,
      programId,
      programName,
    });
    return apiError({
      status: 502,
      code: "upstream_error",
      message: "Failed to find the program in Airtable",
      hint: `Use request ID ${requestId} to find the detailed Airtable error in the server log.`,
      headers: { "X-Request-ID": requestId },
    });
  }
  const existing = await existingRes.json();
  if (existing.fields?.Name !== programName) {
    console.warn(
      "[programs/editable] record_mismatch",
      JSON.stringify({
        requestId,
        operation: "update_program",
        programId,
        requestedProgramName: programName,
        actualProgramName: existing.fields?.Name ?? null,
      }),
    );
    return apiError({ status: 403, code: "forbidden", message: "Program record mismatch" });
  }

  const updateRes = await fetch(recordUrl, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      fields: {
        "Start Date": startDate,
        "End Date": endDate,
        "Website URL": normalizedWebsiteUrl,
      },
    }),
  });
  if (!updateRes.ok) {
    const upstreamError = await logAirtableFailure(updateRes, {
      requestId,
      operation: "update_program",
      baseId: YSWS_BASE,
      table: PROGRAMS_TABLE,
      programId,
      programName,
    });
    const permissionFailure =
      updateRes.status === 403 || upstreamError.type === "INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND";
    return apiError({
      status: 502,
      code: "upstream_error",
      message: permissionFailure
        ? "Airtable refused permission to update the Unified YSWS program"
        : "Airtable failed to update the program details",
      hint: permissionFailure
        ? `AIRTABLE_API_KEY needs data.records:write access to base ${YSWS_BASE}. Confirm the token's scopes and base access, then retry. Request ID: ${requestId}.`
        : `Use request ID ${requestId} to find the detailed Airtable error in the server log.`,
      headers: { "X-Request-ID": requestId },
    });
  }

  const updatedProgram = parseEditableProgram(await updateRes.json());
  revalidateTag(PROGRAMS_CACHE_TAG, { expire: 0 });
  return NextResponse.json(updatedProgram);
}
