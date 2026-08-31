import { NextResponse } from "next/server";
import { fetchProgramsFresh, hasKey } from "../../../lib/programs-data";
import { apiError } from "@/lib/api-error";
import { deprecationHeaders } from "@/lib/api-v1";
export type { AirtableProgram } from "../../../lib/programs";

const DEPRECATION = deprecationHeaders("/api/v1/events");

export async function GET() {
  if (!hasKey()) {
    return NextResponse.json([], { headers: DEPRECATION });
  }

  try {
    const programs = await fetchProgramsFresh();
    return NextResponse.json(programs, { headers: DEPRECATION });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return apiError({ status: 502, code: "upstream_error", message, headers: DEPRECATION });
  }
}
