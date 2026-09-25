import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";

export const API_DOCUMENTATION_URL = `${SITE_URL}/openapi.json`;

export const API_ERROR_CODES = [
  "bad_request",
  "unauthorized",
  "forbidden",
  "not_found",
  "method_not_allowed",
  "not_acceptable",
  "unsupported_media_type",
  "payload_too_large",
  "server_misconfigured",
  "internal_error",
  "upstream_error",
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export type ApiErrorBody = {
  error: string;
  code: ApiErrorCode;
  message: string;
  hint?: string;
  status: number;
  documentation_url: string;
};

const DEFAULT_HINTS: Record<ApiErrorCode, string | undefined> = {
  bad_request: "Check the request body and parameters against this endpoint’s documentation.",
  unauthorized: "Sign in at /api/auth/login to get a session cookie, then retry.",
  forbidden: "This session may not act on that resource.",
  not_found:
    "The public endpoints are listed in the OpenAPI document; /llms.txt lists the site's pages.",
  method_not_allowed: "Check which methods this path accepts before retrying.",
  not_acceptable: "Request text/html or text/markdown.",
  unsupported_media_type: "Send the media type this endpoint documents.",
  payload_too_large: "Send a smaller payload.",
  server_misconfigured: "Nothing to retry — this is a server-side configuration problem.",
  internal_error: "Retry later; if it persists, open an issue at github.com/hackclub/site.",
  upstream_error: "An upstream service failed. Retry with backoff.",
};

const DEFAULT_CODE_BY_STATUS: Record<number, ApiErrorCode> = {
  400: "bad_request",
  401: "unauthorized",
  403: "forbidden",
  404: "not_found",
  405: "method_not_allowed",
  406: "not_acceptable",
  413: "payload_too_large",
  415: "unsupported_media_type",
  500: "internal_error",
  502: "upstream_error",
};

export function defaultErrorCode(status: number): ApiErrorCode {
  return DEFAULT_CODE_BY_STATUS[status] ?? (status >= 500 ? "internal_error" : "bad_request");
}

export function buildApiError({
  status,
  message,
  code = defaultErrorCode(status),
  hint = DEFAULT_HINTS[code],
}: {
  status: number;
  message: string;
  code?: ApiErrorCode;
  hint?: string;
}): ApiErrorBody {
  return {
    error: message,
    code,
    message,
    ...(hint ? { hint } : {}),
    status,
    documentation_url: API_DOCUMENTATION_URL,
  };
}

export function apiError(input: {
  status: number;
  message: string;
  code?: ApiErrorCode;
  hint?: string;
  headers?: Record<string, string>;
}): NextResponse {
  const body = buildApiError(input);
  return NextResponse.json(body, {
    status: body.status,
    headers: {
      "Cache-Control": "no-store",
      ...input.headers,
    },
  });
}
