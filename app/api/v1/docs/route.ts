import { NextResponse } from "next/server";
import { SCALAR_DOCS_HTML } from "@/lib/scalar";
import { apiError } from "@/lib/api-error";
import { V1_ALLOWED_METHODS, V1_CORS_HEADERS, v1Options } from "@/lib/api-v1";

export const dynamic = "force-static";

export function GET() {
  return new NextResponse(SCALAR_DOCS_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
      ...V1_CORS_HEADERS,
    },
  });
}

function methodNotAllowed() {
  return apiError({
    status: 405,
    code: "method_not_allowed",
    message: "The API reference only answers GET",
    headers: { ...V1_CORS_HEADERS, Allow: V1_ALLOWED_METHODS },
  });
}

export const OPTIONS = v1Options;
export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
