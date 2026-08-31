import { NextResponse } from "next/server";
import teamMembers from "../../../public/team.json";
import { deprecationHeaders } from "@/lib/api-v1";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(teamMembers, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      ...deprecationHeaders(null),
    },
  });
}
