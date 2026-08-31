import type { NextRequest } from "next/server";
import { findEvent } from "@/lib/events";
import { fetchEvents, MissingCredentialsError } from "@/lib/events-data";
import { itemEnvelope, v1Error, v1Json, v1Options } from "@/lib/api-v1";

export const dynamic = "force-dynamic";
export const fetchCache = "default-cache";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ idOrSlug: string }> },
) {
  const { idOrSlug } = await params;

  try {
    const event = findEvent(await fetchEvents(), idOrSlug);
    if (!event) {
      return v1Error({
        status: 404,
        code: "not_found",
        message: `No event with id or slug "${idOrSlug}"`,
        hint: "List every event at /api/v1/events. Prefer the `id`, a slug moves if the event is renamed.",
      });
    }
    return v1Json(itemEnvelope(event));
  } catch (error) {
    if (error instanceof MissingCredentialsError) {
      return v1Error({
        status: 500,
        code: "server_misconfigured",
        message: error.message,
        hint: "Nothing to retry, this deployment is missing an Airtable credential.",
      });
    }
    console.error("[v1/events/:idOrSlug] upstream failed", error);
    return v1Error({
      status: 502,
      code: "upstream_error",
      message: "Could not read events from Airtable",
    });
  }
}

export const OPTIONS = v1Options;
