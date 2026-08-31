import { NextResponse } from "next/server";
import { pull } from "../../../lib/projects";
import { apiError } from "@/lib/api-error";
import { deprecationHeaders } from "@/lib/api-v1";

export const dynamic = "force-dynamic";

const DEPRECATION = deprecationHeaders(null);

export async function GET() {
  try {
    return NextResponse.json(await pull(15), { headers: DEPRECATION });
  } catch (error) {
    const missingKey =
      error instanceof Error && error.message === "HACK_CLUB_SITE_AIRTABLE_KEY not set";
    return missingKey
      ? apiError({
          status: 500,
          code: "server_misconfigured",
          message: "HACK_CLUB_SITE_AIRTABLE_KEY not set",
          headers: DEPRECATION,
        })
      : apiError({
          status: 502,
          code: "upstream_error",
          message: "Airtable fetch failed",
          headers: DEPRECATION,
        });
  }
}
