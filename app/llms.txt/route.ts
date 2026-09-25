import { type NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { LLMS_TXT_GROUP_ORDER, renderLlmsTxt, type LlmsTxtSection } from "@/lib/agent-markdown";
import { AGENT_ROUTES, AGENT_ROUTE_GROUP_LABELS } from "@/lib/agent-routes";
import { mergeVary } from "@/lib/content-negotiation";
import { requestLocale, requestOrigin } from "@/lib/request-context";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const locale = requestLocale(request);
  const origin = requestOrigin(request);

  const meta = await getTranslations({ locale, namespace: "Meta" });

  const sections: LlmsTxtSection[] = [];
  for (const group of LLMS_TXT_GROUP_ORDER) {
    const entries = [];
    for (const route of AGENT_ROUTES.filter((entry) => entry.group === group)) {
      const t = await getTranslations({ locale, namespace: route.namespace });
      entries.push({
        title: t(route.titleKey),
        url: route.path === "/" ? `${origin}/` : `${origin}${route.path}`,
        description: t(route.descriptionKey),
      });
    }
    sections.push({ heading: AGENT_ROUTE_GROUP_LABELS[group], entries });
  }

  const body = renderLlmsTxt({
    siteName: meta("siteName"),
    summary: meta("description"),
    origin,
    sections,
  });

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Vary: mergeVary(null, "Accept", "Accept-Encoding"),
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
