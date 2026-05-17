import { parseRecord, siteBaseUrl, siteAuthHeaders, SITE_FIELDS } from "./site-programs";
import type { AirtableProgram } from "./programs";

const BASE_ID = "app3A5kJwYqxMLOgh";
const TABLE_NAME = "YSWS Programs";
const PROGRAMS_REVALIDATE_SECONDS = 300;

type FetchProgramsOptions = {
  fresh?: boolean;
};

export function hasKey(): boolean {
  return Boolean(process.env.AIRTABLE_API_KEY?.trim());
}

function createFetchOptions(fresh: boolean): RequestInit {
  return fresh ? { cache: "no-store" } : { next: { revalidate: PROGRAMS_REVALIDATE_SECONDS } };
}

async function readPrograms({ fresh = false }: FetchProgramsOptions = {}): Promise<
  AirtableProgram[]
> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    return [];
  }

  const params = new URLSearchParams();
  params.set("filterByFormula", "AND(NOT({Start Date}=''), NOT({End Date}=''))");
  params.append("fields[]", "Name");
  params.append("fields[]", "Start Date");
  params.append("fields[]", "End Date");
  params.append("fields[]", "Website URL");
  params.append("sort[0][field]", "End Date");
  params.append("sort[0][direction]", "asc");

  const siteKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  const fetchOptions = createFetchOptions(fresh);

  const [ywswRes, siteData] = await Promise.all([
    fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?${params}`, {
      ...fetchOptions,
      headers: { Authorization: `Bearer ${apiKey}` },
    }),
    siteKey
      ? fetch(
          `${siteBaseUrl()}?${SITE_FIELDS.map((field) => `fields[]=${encodeURIComponent(field)}`).join("&")}`,
          {
            ...fetchOptions,
            headers: siteAuthHeaders(siteKey),
          },
        )
          .then((response) => (response.ok ? response.json() : { records: [] }))
          .catch(() => ({ records: [] }))
      : Promise.resolve({ records: [] }),
  ]);

  if (!ywswRes.ok) {
    throw new Error(`Airtable error ${ywswRes.status}: ${await ywswRes.text()}`);
  }

  const ywswData = await ywswRes.json();
  const siteMap = new Map(
    ((siteData as { records: unknown[] }).records ?? []).map((record) => {
      const parsed = parseRecord(record as Parameters<typeof parseRecord>[0]);
      return [parsed.programName, parsed] as const;
    }),
  );

  return (ywswData.records ?? []).map((record: { id: string; fields: Record<string, string> }) => {
    const name = record.fields["Name"] ?? "Unnamed";
    return {
      id: record.id,
      name,
      startDate: record.fields["Start Date"],
      endDate: record.fields["End Date"],
      websiteUrl: record.fields["Website URL"] ?? null,
      site: siteMap.get(name) ?? null,
    };
  });
}

export async function fetchPrograms(): Promise<AirtableProgram[]> {
  return readPrograms();
}

export async function fetchProgramsFresh(): Promise<AirtableProgram[]> {
  return readPrograms({ fresh: true });
}
