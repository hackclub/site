import type { NextRequest } from "next/server";
import { v1Error, V1_DOCS_PATH } from "@/lib/api-v1";

export const dynamic = "force-dynamic";

function notFound(request: NextRequest) {
  return v1Error({
    status: 404,
    code: "not_found",
    message: `No API endpoint at ${request.nextUrl.pathname}`,
    hint: `v1 serves /api/v1/events, /api/v1/events/{idOrSlug} and /api/v1/events/rss. The reference is at ${V1_DOCS_PATH}.`,
  });
}

export const GET = notFound;
export const POST = notFound;
export const PUT = notFound;
export const PATCH = notFound;
export const DELETE = notFound;
export const OPTIONS = notFound;
export const HEAD = notFound;
