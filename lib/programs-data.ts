import { unstable_cache } from "next/cache";
import { parseRecord, siteBaseUrl, siteAuthHeaders, SITE_FIELDS } from "./site-programs";
import type { AirtableProgram } from "./programs";

export const YSWS_BASE_ID = "app3A5kJwYqxMLOgh";
export const YSWS_TABLE_NAME = "YSWS Programs";
export const YSWS_FIELDS = ["Name", "Start Date", "End Date", "Website URL"];
export const PROGRAMS_REVALIDATE_SECONDS = 300;
export const PROGRAMS_CACHE_TAG = "programs";

type FetchProgramsOptions = {
  fresh?: boolean;
};

export function hasKey(): boolean {
  return Boolean(process.env.AIRTABLE_API_KEY?.trim());
}

export function yswsListUrl(): string {
  const params = new URLSearchParams();
  params.set("filterByFormula", "NOT({Start Date}='')");
  for (const field of YSWS_FIELDS) params.append("fields[]", field);
  params.append("sort[0][field]", "End Date");
  params.append("sort[0][direction]", "asc");
  return `https://api.airtable.com/v0/${YSWS_BASE_ID}/${encodeURIComponent(YSWS_TABLE_NAME)}?${params}`;
}

export function siteListUrl(): string {
  const fields = SITE_FIELDS.map((field) => `fields[]=${encodeURIComponent(field)}`).join("&");
  return `${siteBaseUrl()}?${fields}`;
}

type AirtableListResponse = {
  records?: unknown[];
  offset?: string;
};

/**
 * Walk every page of an Airtable list response.
 *
 * Deliberately uncached, and it must stay that way. Airtable paginates with an
 * `offset` that is an *iterator handle* (`itr…/rec…`), not a stable cursor: the
 * server holds it for a short while and answers a spent one with
 * `422 LIST_RECORDS_ITERATOR_NOT_AVAILABLE`. Caching a page therefore caches
 * the handle embedded in it, and any later request that hits that entry while
 * needing the next page replays a handle Airtable has already dropped.
 *
 * Both tables are past 100 records, so pagination is the normal path here, not
 * an edge case. Caching happens one level up instead — see `readTable` — where
 * the unit of storage is the finished record list and no handle outlives the
 * call that issued it.
 */
export async function fetchAllPages(
  url: string,
  headers: Record<string, string>,
): Promise<unknown[]> {
  const records: unknown[] = [];
  let offset: string | undefined;

  do {
    const pageUrl = new URL(url);
    if (offset) pageUrl.searchParams.set("offset", offset);

    const response = await fetch(pageUrl, { cache: "no-store", headers });
    if (!response.ok) {
      throw new Error(`Airtable error ${response.status}: ${await response.text()}`);
    }

    const page = (await response.json()) as AirtableListResponse;
    records.push(...(page.records ?? []));
    offset = page.offset;
  } while (offset);

  return records;
}

export type AirtableTable = "ysws" | "site";

async function readTable(table: AirtableTable): Promise<unknown[]> {
  if (table === "ysws") {
    const apiKey = process.env.AIRTABLE_API_KEY;
    if (!apiKey) throw new Error("AIRTABLE_API_KEY is not set");
    return fetchAllPages(yswsListUrl(), { Authorization: `Bearer ${apiKey}` });
  }

  const siteKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  if (!siteKey) throw new Error("HACK_CLUB_SITE_AIRTABLE_KEY is not set");
  return fetchAllPages(siteListUrl(), siteAuthHeaders(siteKey));
}

const cachedTable = unstable_cache(readTable, ["airtable-programs"], {
  revalidate: PROGRAMS_REVALIDATE_SECONDS,
  tags: [PROGRAMS_CACHE_TAG],
});

export function fetchAirtableRecords(table: AirtableTable, fresh = false): Promise<unknown[]> {
  return fresh ? readTable(table) : cachedTable(table);
}

async function readPrograms({ fresh = false }: FetchProgramsOptions = {}): Promise<
  AirtableProgram[]
> {
  if (!hasKey()) {
    return [];
  }

  const [ywswRecords, siteRecords] = await Promise.all([
    fetchAirtableRecords("ysws", fresh),
    process.env.HACK_CLUB_SITE_AIRTABLE_KEY
      ? fetchAirtableRecords("site", fresh).catch(() => [] as unknown[])
      : Promise.resolve([] as unknown[]),
  ]);
  const siteMap = new Map(
    siteRecords.map((record) => {
      const parsed = parseRecord(record as Parameters<typeof parseRecord>[0]);
      return [parsed.programName, parsed] as const;
    }),
  );

  return ywswRecords.map((rawRecord) => {
    const record = rawRecord as { id: string; fields: Record<string, string> };
    const name = record.fields["Name"] ?? "Unnamed";
    const websiteUrl = record.fields["Website URL"]?.trim();
    return {
      id: record.id,
      name,
      startDate: record.fields["Start Date"],
      endDate: record.fields["End Date"] || null,
      websiteUrl: websiteUrl
        ? /^https?:\/\//i.test(websiteUrl)
          ? websiteUrl
          : `https://${websiteUrl}`
        : null,
      site: siteMap.get(name) ?? null,
    };
  });
}

export async function fetchPrograms(): Promise<AirtableProgram[]> {
  try {
    return await readPrograms();
  } catch (error) {
    console.error("[programs] fetch failed", error);
    return [];
  }
}

export async function fetchProgramsFresh(): Promise<AirtableProgram[]> {
  return readPrograms({ fresh: true });
}
