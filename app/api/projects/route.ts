import { NextResponse } from "next/server";
import { pull } from "../../../lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await pull(15));
  } catch (error) {
    const missingKey =
      error instanceof Error && error.message === "HACK_CLUB_SITE_AIRTABLE_KEY not set";
    return NextResponse.json(
      { error: missingKey ? "HACK_CLUB_SITE_AIRTABLE_KEY not set" : "Airtable fetch failed" },
      { status: missingKey ? 500 : 502 },
    );
  }
}
