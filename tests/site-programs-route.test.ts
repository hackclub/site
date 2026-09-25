import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { NextRequest } from "next/server";

const realFetch = globalThis.fetch;
const realKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;

beforeEach(() => {
  process.env.HACK_CLUB_SITE_AIRTABLE_KEY = "test-key";
});

afterEach(() => {
  globalThis.fetch = realFetch;
  if (realKey === undefined) delete process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  else process.env.HACK_CLUB_SITE_AIRTABLE_KEY = realKey;
});

type Call = { method: string; url: URL; body: unknown };

/**
 * A table whose records span more than one Airtable page.
 *
 * `pages` is one page's worth of records each, handed out with an `offset` on
 * every page but the last — the shape the real list endpoint returns once a
 * table passes 100 records.
 */
function stubTable(pages: { id: string; fields: Record<string, unknown> }[][]): Call[] {
  const calls: Call[] = [];

  globalThis.fetch = (async (input: URL | string, init: RequestInit = {}) => {
    const url = new URL(String(input));
    const method = init.method ?? "GET";
    calls.push({
      method,
      url,
      body: typeof init.body === "string" ? JSON.parse(init.body) : undefined,
    });

    if (method !== "GET") return Response.json({ id: "recWRITTENxxxxxxx", fields: {} });

    const index = Number(url.searchParams.get("offset") ?? 0);
    const last = index >= pages.length - 1;
    return Response.json({
      records: pages[index],
      ...(last ? {} : { offset: String(index + 1) }),
    });
  }) as unknown as typeof fetch;

  return calls;
}

const onPageOne = [{ id: "recAAAAAAAAAAAAAA", fields: { Name: "Gadget Market" } }];
const pastTheCap = [
  {
    id: "recuklKiVnDAlUycR",
    fields: { Name: "Undercity", Description: "4-day Hardware Hackathon" },
  },
];

describe("GET /api/site-programs", () => {
  test("returns records from every page, not just the first", async () => {
    // The regression this guards: the editor reads this list and seeds its form
    // from it, so a record dropped past Airtable's 100-record page cap rendered
    // as a program with no logo, banner or description — while Airtable held all
    // three. Undercity was the case that surfaced it.
    stubTable([onPageOne, pastTheCap]);
    const { GET } = await import("@/app/api/site-programs/route");

    const names = ((await (await GET()).json()) as { programName: string }[]).map(
      (p) => p.programName,
    );
    expect(names).toEqual(["Gadget Market", "Undercity"]);
  });
});

describe("POST /api/site-programs", () => {
  test("updates a record that sits past the first page instead of duplicating it", async () => {
    // A truncated lookup misses the existing record and falls through to the
    // create branch, leaving two rows for one program — the complete original
    // and a blank twin holding whatever the editor's empty form posted.
    mock.module("@/lib/server-auth", () => ({
      getEditAuth: async () => ({ canEdit: true, isAdmin: false }),
      canEditProgram: async () => true,
    }));
    // revalidateTag needs a request-scoped Next store this harness has no way to
    // provide; cache invalidation is not what is under test here.
    mock.module("next/cache", () => ({ revalidateTag: () => {} }));

    const calls = stubTable([onPageOne, pastTheCap]);
    const { POST } = await import("@/app/api/site-programs/route");

    const response = await POST(
      new NextRequest("https://hackclub.com/api/site-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programName: "Undercity", slackChannel: "undercity" }),
      }),
    );
    expect(response.status).toBe(200);

    const patches = calls.filter((c) => c.method === "PATCH");
    expect(patches).toHaveLength(1);
    expect(patches[0].url.pathname).toEndWith("/recuklKiVnDAlUycR");

    // Nothing may take the create branch — that is what produced the blank twins.
    expect(calls.filter((c) => c.method === "POST")).toEqual([]);
  });
});
