import type { NextRequest } from "next/server";
import { parseEventLimit } from "@/lib/events";
import { fetchEvents, MissingCredentialsError } from "@/lib/events-data";
import { buildEventsFeed, EVENTS_FEED_CONTENT_TYPE, EVENTS_FEED_DEFAULT_LIMIT } from "@/lib/rss";
import { v1Error, v1Headers, v1Options } from "@/lib/api-v1";
import { requestOrigin } from "@/lib/request-context";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "default-cache";

export async function GET(request: NextRequest) {
  const limit = parseEventLimit(request.nextUrl.searchParams.get("limit"));
  if (!limit.ok) {
    return v1Error({
      status: 400,
      code: "bad_request",
      message: limit.message,
      hint: limit.hint,
    });
  }

  try {
    const events = await fetchEvents();
    const feed = buildEventsFeed(
      events,
      requestOrigin(request),
      limit.limit ?? EVENTS_FEED_DEFAULT_LIMIT,
    );

    return new NextResponse(feed, {
      headers: v1Headers({ "Content-Type": EVENTS_FEED_CONTENT_TYPE }),
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
    console.error("[v1/events/rss] upstream failed", error);
    return v1Error({
      status: 502,
      code: "upstream_error",
      message: "Could not read events from Airtable",
    });
  }
}

export const OPTIONS = v1Options;
