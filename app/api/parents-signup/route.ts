import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_ID = "applbij4WGNtixmE4";
const TABLE_NAME = "signup";

function apiKey() {
  return process.env.PARENTS_AIRTABLE_KEY;
}

const isValidEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function clientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (rateLimitHits.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  rateLimitHits.set(key, recent);

  if (rateLimitHits.size > 5000) {
    for (const [k, hits] of rateLimitHits) {
      if (now - hits[hits.length - 1] > RATE_LIMIT_WINDOW_MS) rateLimitHits.delete(k);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
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

  if (isRateLimited(ip ?? "unknown")) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

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
