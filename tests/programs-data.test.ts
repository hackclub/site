import { afterEach, describe, expect, test } from "bun:test";
import { fetchAllPages, yswsListUrl, siteListUrl } from "@/lib/programs-data";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

type Call = { url: URL; init: RequestInit };

/**
 * Stand in for Airtable's cursor pagination. Hands out a fresh iterator handle
 * per page and, like the real thing, rejects one it has already spent.
 */
function stubAirtable(pages: number): Call[] {
  const calls: Call[] = [];
  const spent = new Set<string>();
  let issued = 0;

  globalThis.fetch = (async (input: URL | string, init: RequestInit = {}) => {
    const url = new URL(String(input));
    calls.push({ url, init });

    const offset = url.searchParams.get("offset");
    if (offset) {
      if (spent.has(offset)) {
        return new Response(
          JSON.stringify({ error: { type: "LIST_RECORDS_ITERATOR_NOT_AVAILABLE" } }),
          {
            status: 422,
          },
        );
      }
      spent.add(offset);
    }

    const index = offset ? Number(offset.split("/")[1]) : 0;
    const last = index >= pages - 1;
    return Response.json({
      records: [{ id: `rec${index}`, fields: { Name: `Program ${index}` } }],
      ...(last ? {} : { offset: `itr${++issued}/${index + 1}` }),
    });
  }) as unknown as typeof fetch;

  return calls;
}

describe("fetchAllPages", () => {
  test("walks every page and concatenates the records", async () => {
    stubAirtable(3);
    const records = (await fetchAllPages("https://api.airtable.com/v0/base/table", {})) as {
      id: string;
    }[];
    expect(records.map((record) => record.id)).toEqual(["rec0", "rec1", "rec2"]);
  });

  test("never caches a page, because pages carry an expiring iterator", async () => {
    // The regression this guards: Airtable's `offset` is an iterator handle with
    // a short server-side life, so a cached page hands a later request a handle
    // Airtable has already dropped — 422 LIST_RECORDS_ITERATOR_NOT_AVAILABLE.
    // Caching belongs around the completed walk, never around a single page.
    const calls = stubAirtable(3);
    await fetchAllPages("https://api.airtable.com/v0/base/table", {});

    expect(calls).toHaveLength(3);
    for (const { init } of calls) {
      expect(init.cache).toBe("no-store");
      expect((init as { next?: unknown }).next).toBeUndefined();
    }
  });

  test("spends each iterator once, so repeated walks stay independent", async () => {
    stubAirtable(3);
    const first = await fetchAllPages("https://api.airtable.com/v0/base/table", {});
    // A second walk must issue its own handles rather than replay the first's.
    const second = await fetchAllPages("https://api.airtable.com/v0/base/table", {});
    expect(second).toEqual(first);
  });

  test("surfaces an Airtable error instead of returning a short list", async () => {
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ error: { type: "LIST_RECORDS_ITERATOR_NOT_AVAILABLE" } }), {
        status: 422,
      })) as unknown as typeof fetch;

    await expect(fetchAllPages("https://api.airtable.com/v0/base/table", {})).rejects.toThrow(
      /Airtable error 422/,
    );
  });

  test("passes the caller's auth headers through, and keeps them out of the URL", async () => {
    const calls = stubAirtable(1);
    await fetchAllPages("https://api.airtable.com/v0/base/table", {
      Authorization: "Bearer secret",
    });
    expect((calls[0].init.headers as Record<string, string>).Authorization).toBe("Bearer secret");
    expect(calls[0].url.search).not.toContain("secret");
  });
});

describe("list URLs", () => {
  test("the YSWS URL requests only the fields the mapper reads", () => {
    const url = new URL(yswsListUrl());
    expect(url.searchParams.getAll("fields[]")).toEqual([
      "Name",
      "Start Date",
      "End Date",
      "Website URL",
    ]);
    expect(url.searchParams.get("filterByFormula")).toBe("NOT({Start Date}='')");
  });

  test("both URLs are offset-free, so a walk always starts at the first page", () => {
    expect(new URL(yswsListUrl()).searchParams.has("offset")).toBe(false);
    expect(new URL(siteListUrl()).searchParams.has("offset")).toBe(false);
  });
});
