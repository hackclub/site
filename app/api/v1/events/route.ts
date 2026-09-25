import type { NextRequest } from "next/server";
import { applyEventQuery, parseEventQuery } from "@/lib/events";
import { fetchEvents, MissingCredentialsError } from "@/lib/events-data";
import { EVENTS_FEED_PATH } from "@/lib/rss";
import { listEnvelope, v1Error, v1Json, v1Options } from "@/lib/api-v1";
import { requestOrigin } from "@/lib/request-context";

export const dynamic = "force-dynamic";
export const fetchCache = "default-cache";

export async function GET(request: NextRequest) {
  const parsed = parseEventQuery(request.nextUrl.searchParams);
  if (!parsed.ok) {
    return v1Error({
      status: 400,
      code: "bad_request",
      message: parsed.message,
      hint: parsed.hint,
    });
  }

  try {
    const events = applyEventQuery(await fetchEvents(), parsed.query);
    const origin = requestOrigin(request);
    return v1Json(listEnvelope(events), {
      Link: `<${origin}${EVENTS_FEED_PATH}>; rel="alternate"; type="application/rss+xml"`,
    });
  } catch (error) {
    if (error instanceof MissingCredentialsError) {
      return v1Error({
        status: 500,
        code: "server_misconfigured",
        message: error.message,
        hint: "Nothing to retry, this deployment is missing an Airtable credential.",
      });
    }
    console.error("[v1/events] upstream failed", error);
    return v1Error({
      status: 502,
      code: "upstream_error",
      message: "Could not read events from Airtable",
    });
  }
}

export const OPTIONS = v1Options;
