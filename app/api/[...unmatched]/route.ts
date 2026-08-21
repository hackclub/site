import type { NextRequest } from "next/server";
import { apiError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

function notFound(request: NextRequest) {
  return apiError({
    status: 404,
    code: "not_found",
    message: `No API endpoint at ${request.nextUrl.pathname}`,
    hint: "The public read-only endpoints are listed in /openapi.json (or /api/openapi.yaml).",
  });
}

export const GET = notFound;
export const POST = notFound;
export const PUT = notFound;
export const PATCH = notFound;
export const DELETE = notFound;
export const OPTIONS = notFound;
export const HEAD = notFound;
