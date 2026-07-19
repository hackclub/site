import createMiddleware from "next-intl/middleware";
import type { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

/** Attach request headers so Server Components can read them via `headers()`. */
function withRequestHeaders(response: NextResponse, headers: Record<string, string>) {
  const override = new Set(
    (response.headers.get("x-middleware-override-headers") ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean),
  );

  for (const [key, value] of Object.entries(headers)) {
    override.add(key);
    response.headers.set(`x-middleware-request-${key}`, value);
  }

  response.headers.set("x-middleware-override-headers", Array.from(override).join(","));
  return response;
}

export default function proxy(request: NextRequest) {
  const response = handleI18n(request);

  return withRequestHeaders(response, {
    "x-pathname": request.nextUrl.pathname,
    "x-search": request.nextUrl.search,
  });
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
