import {
  fetchAirtableRecords,
  PROGRAMS_CACHE_TAG,
  PROGRAMS_REVALIDATE_SECONDS,
} from "@/lib/programs-data";
import { parseRecord, type SiteProgram } from "@/lib/site-programs";
import { buildEvents, type Event, type RawEventRecord } from "@/lib/events";

export { PROGRAMS_CACHE_TAG, PROGRAMS_REVALIDATE_SECONDS };

function isDynamicBailout(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { digest?: unknown }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

export class MissingCredentialsError extends Error {
  constructor(variable: string) {
    super(`${variable} is not set`);
    this.name = "MissingCredentialsError";
  }
}

export async function fetchEvents(now = new Date()): Promise<Event[]> {
  if (!process.env.AIRTABLE_API_KEY?.trim()) {
    throw new MissingCredentialsError("AIRTABLE_API_KEY");
  }

  const [rawRecords, siteRecords] = await Promise.all([
    fetchAirtableRecords("ysws"),
    process.env.HACK_CLUB_SITE_AIRTABLE_KEY?.trim()
      ? fetchAirtableRecords("site").catch((error) => {
          if (isDynamicBailout(error)) throw error;
          console.error("[events] site customisation fetch failed", error);
          return [] as unknown[];
        })
      : Promise.resolve([] as unknown[]),
  ]);

  const siteByName = new Map<string, SiteProgram>(
    siteRecords.map((record) => {
      const parsed = parseRecord(record as Parameters<typeof parseRecord>[0]);
      return [parsed.programName, parsed] as const;
    }),
  );

  return buildEvents(rawRecords as RawEventRecord[], siteByName, now);
}

export async function fetchEventsSafe(now = new Date()): Promise<Event[]> {
  try {
    return await fetchEvents(now);
  } catch (error) {
    if (isDynamicBailout(error)) throw error;
    console.error("[events] fetch failed", error);
    return [];
  }
}
