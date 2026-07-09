import { NextRequest, NextResponse } from "next/server";
import { blockBotRequest } from "@/lib/botid";
import { isValidEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const BASE_ID = "applbij4WGNtixmE4";
const TABLE_NAME = "signup";

function apiKey() {
  return process.env.PARENTS_AIRTABLE_KEY;
}

function clientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

export async function POST(req: NextRequest) {
  const blocked = await blockBotRequest();
  if (blocked) return blocked;

  const key = apiKey();
  if (!key) {
    return NextResponse.json({ error: "PARENTS_AIRTABLE_KEY is not set" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body as { email?: unknown })?.email;
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const ip = clientIp(req);

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: { email: email.trim(), ...(ip ? { ip } : {}) } }],
      }),
    },
  );

  if (!res.ok) {
    console.error("[parents-signup] Airtable error", res.status, await res.text());
    return NextResponse.json({ error: "Failed to save signup" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
