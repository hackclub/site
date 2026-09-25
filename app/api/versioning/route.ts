import { NextResponse } from "next/server";
import { API_VERSIONING_POLICY } from "@/lib/api-versioning-policy";

export const dynamic = "force-static";

export function GET() {
  return new NextResponse(API_VERSIONING_POLICY, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
