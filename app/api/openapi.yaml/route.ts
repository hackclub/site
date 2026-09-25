/**
 * `/api/openapi.yaml` — the same OpenAPI document as YAML.
 */

import { type NextRequest, NextResponse } from "next/server";
import { buildOpenApiDocument } from "@/lib/openapi";
import { mergeVary } from "@/lib/content-negotiation";
import { toYaml } from "@/lib/yaml";
import { requestOrigin } from "@/lib/request-context";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = requestOrigin(request);

  return new NextResponse(toYaml(buildOpenApiDocument(origin)), {
    headers: {
      "Content-Type": "application/yaml; charset=utf-8",
      Vary: mergeVary(null, "Accept", "Accept-Encoding"),
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
