import { NextRequest, NextResponse } from "next/server";
import { siteAuthHeaders } from "../../../../lib/site-programs";
import { isValidSlackId, isValidAirtableRecordId } from "../../../../lib/server-auth";

export const dynamic = "force-dynamic";

const YSWS_BASE = "app3A5kJwYqxMLOgh";
const AUTHORS_TABLE = "YSWS Authors";
const PROGRAMS_TABLE = "YSWS Programs";
const SITE_BASE_ID = "appsbFEoTS7vN2zeB";
const ADMINS_TABLE = "Admins";

export async function GET(req: NextRequest) {
  // 1. Get HC access token from cookie
  const token = req.cookies.get("hc_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // 2. Resolve user's Slack ID
  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  const me = await meRes.json();

  const rawSlackId: string | null = me.identity?.slack_id ?? null;
  const slackId = isValidSlackId(rawSlackId) ? rawSlackId : null;
  if (!slackId) {
    return NextResponse.json({
      name: me.identity?.id ?? "Unknown",
      slack_id: null,
      isAdmin: false,
      editablePrograms: [],
    });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const siteKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  if (!apiKey) return NextResponse.json({ error: "AIRTABLE_API_KEY not set" }, { status: 500 });

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

  // Check admin
  const isAdmin = adminsRes?.ok ? ((await adminsRes.json()).records ?? []).length > 0 : false;

  // Get author name
  const authorsData = authorsRes.ok ? await authorsRes.json() : { records: [] };
  const authorRecord = (authorsData.records ?? [])[0];
  const authorName: string = authorRecord?.fields?.["Name"] ?? slackId;

  // Admins can edit everything — skip the program ownership lookup
  if (isAdmin) {
    return NextResponse.json({
      name: authorName,
      slack_id: slackId,
      isAdmin: true,
      editablePrograms: [],
    });
  }

  // 4. Find which programs this person owns
  const ids = authorRecord?.fields?.["Current YSWS Programs"];
  const programRecordIds: string[] = Array.isArray(ids) ? ids.filter(isValidAirtableRecordId) : [];
  if (programRecordIds.length === 0) {
    return NextResponse.json({
      name: authorName,
      slack_id: slackId,
      isAdmin: false,
      editablePrograms: [],
    });
  }

  const formula = `OR(${programRecordIds.map((id) => `RECORD_ID()="${id}"`).join(",")})`;
  const programsUrl = new URL(
    `https://api.airtable.com/v0/${YSWS_BASE}/${encodeURIComponent(PROGRAMS_TABLE)}`,
  );
  programsUrl.searchParams.set("filterByFormula", formula);
  programsUrl.searchParams.append("fields[]", "Name");

  const programsRes = await fetch(programsUrl.toString(), { headers: ywswHeaders });
  if (!programsRes.ok) {
    return NextResponse.json({
      name: authorName,
      slack_id: slackId,
      isAdmin: false,
      editablePrograms: [],
    });
  }
  const programsData = await programsRes.json();

  const editablePrograms: string[] = (programsData.records ?? [])
    .map((r: { fields: { Name?: string } }) => r.fields.Name ?? "")
    .filter(Boolean);

  return NextResponse.json({
    name: authorName,
    slack_id: slackId,
    isAdmin: false,
    editablePrograms,
  });
}
