import { NextResponse } from "next/server";
import { fetchProgramsFresh, hasKey } from "../../../lib/programs-data";
export type { AirtableProgram } from "../../../lib/programs";

export async function GET() {
  if (!hasKey()) {
    return NextResponse.json([]);
  }

  try {
    const programs = await fetchProgramsFresh();
    return NextResponse.json(programs);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
