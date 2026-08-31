import { NextResponse } from "next/server";
import { apiError, type ApiErrorCode } from "@/lib/api-error";
import { SITE_URL } from "@/lib/seo";

export const V1_BASE_PATH = "/api/v1";
export const V1_SPEC_PATH = "/api/v1/openapi.json";
export const V1_DOCS_PATH = "/api/v1/docs";

/**
 * `revalidateTag` busts Next's data cache but has no reach into the CDN, so
 * `s-maxage` is the ceiling on how long an editor sees their own save missing
 * from the public API. Sixty seconds is short enough to read as instant while
 * still absorbing the overwhelming majority of traffic; the Airtable request
 * rate is already bounded by the data cache's 300s regardless of this number,
 * so raising it would buy no upstream relief.
 *
 * Keep `PROGRAMS_REVALIDATE_SECONDS + s-maxage + stale-while-revalidate` under
 * an hour. Responses embed Airtable attachment URLs that are only guaranteed
 * live for two hours, and this is the margin that keeps a cached response from
 * outliving the image URLs inside it.
 */
export const V1_CACHE_CONTROL = "public, max-age=0, s-maxage=60, stale-while-revalidate=300";

/**
 * No `Vary: Origin` — the allowed origin is the constant `*`, so varying on it
 * would fragment the edge cache per caller for no benefit.
 */
export const V1_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Accept, Content-Type",
  "Access-Control-Max-Age": "86400",
};

export function v1Headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "Cache-Control": V1_CACHE_CONTROL,
    Vary: "Accept-Encoding",
    ...V1_CORS_HEADERS,
    ...extra,
  };
}

export type Envelope<T> = { data: T; meta: { count?: number; generatedAt: string } };

export function listEnvelope<T>(data: T[]): Envelope<T[]> {
  return { data, meta: { count: data.length, generatedAt: new Date().toISOString() } };
}

export function itemEnvelope<T>(data: T): Envelope<T> {
  return { data, meta: { generatedAt: new Date().toISOString() } };
}

export function v1Json(body: unknown, extra: Record<string, string> = {}): NextResponse {
  return NextResponse.json(body, { headers: v1Headers(extra) });
}

export function v1Error(input: {
  status: number;
  code: ApiErrorCode;
  message: string;
  hint?: string;
}): NextResponse {
  return apiError({ ...input, headers: V1_CORS_HEADERS });
}

/**
 * Next synthesises an OPTIONS response for a route exporting GET, but it
 * carries no CORS headers, so any preflight fails. A plain cross-origin GET
 * never preflights, but one custom header from an SDK is enough to trigger it.
 */
export function v1Options(): NextResponse {
  return new NextResponse(null, { status: 204, headers: V1_CORS_HEADERS });
}

export const API_DEPRECATED_AT = "2026-09-01T00:00:00Z";
export const API_SUNSET_AT: string | null = null;

//RFC 9745 deprecation
export function deprecationHeaders(
  successorPath: string | null,
  origin: string = SITE_URL,
): Record<string, string> {
  const links = [
    ...(successorPath ? [`<${origin}${successorPath}>; rel="successor-version"`] : []),
    `<${origin}${V1_DOCS_PATH}>; rel="deprecation"; type="text/html"`,
  ];

  return {
    Deprecation: `@${Math.floor(new Date(API_DEPRECATED_AT).getTime() / 1000)}`,
    Link: links.join(", "),
  };
}
