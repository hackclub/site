import type { NextRequest } from "next/server";
import { getLocaleFromHost, getRequestOrigin, type AppLocale } from "@/i18n/routing";

function publicHost(request: NextRequest): string | null {
  return request.headers.get("x-forwarded-host") ?? request.headers.get("host");
}

export function requestLocale(request: NextRequest): AppLocale {
  return getLocaleFromHost(publicHost(request));
}

export function requestOrigin(request: NextRequest): string {
  return getRequestOrigin(
    publicHost(request),
    request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol,
  );
}
