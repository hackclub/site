import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { isMarkdownEligiblePath } from "./lib/agent-routes";
import {
  agentDiscoveryLinks,
  markdownAlternateLink,
  mergeVary,
  selectRepresentation,
} from "./lib/content-negotiation";

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

function isRscRequest(request: NextRequest) {
  return (
    request.headers.has("rsc") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-state-tree")
  );
}

function markdownUrlFor(pathname: string) {
  return pathname === "/" ? "/index.md" : `${pathname.replace(/\/+$/, "")}.md`;
}

function withNegotiationHeaders(response: NextResponse, request: NextRequest) {
  response.headers.set(
    "Vary",
    mergeVary(response.headers.get("Vary"), "Accept", "Accept-Encoding"),
  );

  const origin = request.nextUrl.origin;
  const alternate = new URL(markdownUrlFor(request.nextUrl.pathname), origin);
  for (const link of [
    markdownAlternateLink(alternate.toString()),
    ...agentDiscoveryLinks(origin),
  ]) {
    response.headers.append("Link", link);
  }
  return response;
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const negotiable =
    (request.method === "GET" || request.method === "HEAD") &&
    !isRscRequest(request) &&
    isMarkdownEligiblePath(pathname);

  if (negotiable) {
    const accept = request.headers.get("accept");
    const representation = selectRepresentation(accept);

    if (representation === null) {
      return withNegotiationHeaders(
        new NextResponse(
          `406 Not Acceptable\n\nThis URL can be served as text/html or "text/markdown".\n`,
          { status: 406, headers: { "Content-Type": "text/plain; charset=utf-8" } },
        ),
        request,
      );
    }

    if (representation === "text/markdown") {
      const target = new URL(`/api/markdown${pathname === "/" ? "" : pathname}`, request.url);
      target.search = search;
      return withNegotiationHeaders(NextResponse.rewrite(target), request);
    }
  }

  const response = handleI18n(request);

  return withNegotiationHeaders(
    withRequestHeaders(response, {
      "x-pathname": pathname,
      "x-search": search,
    }),
    request,
  );
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
