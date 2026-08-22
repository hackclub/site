import { type NextRequest, NextResponse } from "next/server";
import { buildOpenApiDocument } from "@/lib/openapi";
import { mergeVary } from "@/lib/content-negotiation";
import { requestOrigin } from "@/lib/request-context";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = requestOrigin(request);

  return NextResponse.json(buildOpenApiDocument(origin), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Vary: mergeVary(null, "Accept", "Accept-Encoding"),
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
