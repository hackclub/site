import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("hc_access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!meRes.ok) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const me = await meRes.json();
  const slack_id = me.identity?.slack_id ?? null;
  return NextResponse.json({
    name: slack_id ?? me.identity?.id ?? "Unknown",
    slack_id,
  });
}
