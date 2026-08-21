import { type NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { renderNotFoundMarkdown, renderPageMarkdown } from "@/lib/agent-markdown";
import { AGENT_ROUTES, findAgentRoute, normalizeRoutePath } from "@/lib/agent-routes";
import { agentDiscoveryLinks, markdownAlternateLink, mergeVary } from "@/lib/content-negotiation";
import { loadMarkdownContent } from "@/lib/i18n-content";
import { requestLocale, requestOrigin } from "@/lib/request-context";

export const dynamic = "force-dynamic";

const VARY = mergeVary(null, "Accept", "Accept-Encoding");

function markdownUrl(origin: string, path: string): string {
  return path === "/" ? `${origin}/index.md` : `${origin}${path}.md`;
}

function markdownResponse(body: string, status: number, origin: string, path: string) {
  const canonical = path === "/" ? `${origin}/` : `${origin}${path}`;
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: VARY,
      Link: [
        markdownAlternateLink(markdownUrl(origin, path)),
        `<${canonical}>; rel="canonical"`,
        ...agentDiscoveryLinks(origin),
      ].join(", "),
      "Cache-Control":
        status === 200
          ? "public, max-age=0, s-maxage=600, stale-while-revalidate=86400"
          : "no-store",
    },
  });
}

function suggestionsFor(path: string, origin: string) {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return [];
  const prefix = `/${segments[0]}`;

  return AGENT_ROUTES.filter(
    (route) => route.path === prefix || route.path.startsWith(`${prefix}/`),
  )
    .slice(0, 5)
    .map((route) => ({ title: route.path, url: `${origin}${route.path}` }));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments } = await params;
  const requestedPath = normalizeRoutePath(`/${(segments ?? []).join("/")}`);
  const locale = requestLocale(request);
  const origin = requestOrigin(request);
  const route = findAgentRoute(requestedPath);

  if (!route) {
    return markdownResponse(
      renderNotFoundMarkdown({
        path: requestedPath,
        origin,
        suggestions: suggestionsFor(requestedPath, origin),
      }),
      404,
      origin,
      requestedPath,
    );
  }

  const t = await getTranslations({ locale, namespace: route.namespace });
  const body = route.contentSlug
    ? loadMarkdownContent(route.contentSlug, locale).content
    : undefined;

  return markdownResponse(
    renderPageMarkdown({
      title: t(route.titleKey),
      description: t(route.descriptionKey),
      url: requestedPath === "/" ? `${origin}/` : `${origin}${requestedPath}`,
      locale,
      body,
      origin,
    }),
    200,
    origin,
    requestedPath,
  );
}
