import { describe, expect, test } from "bun:test";
import { buildEventsFeed, eventGuid, renderRssFeed, toRfc822 } from "@/lib/rss";
import { buildEvents, type RawEventRecord } from "@/lib/events";
import { parseRecord, type SiteProgram } from "@/lib/site-programs";

const ORIGIN = "https://hackclub.com";
const NOW = new Date("2026-06-15T12:00:00.000Z");

function ysws(overrides: Record<string, string> = {}): RawEventRecord {
  const { id, createdTime, ...fields } = overrides;
  return {
    id: id ?? "recAAAAAAAAAAAAAA",
    createdTime: createdTime ?? "2026-01-05T12:34:56.000Z",
    fields: { Name: "Forge", "Start Date": "2026-01-05", ...fields },
  };
}

function build(records: RawEventRecord[], sites: SiteProgram[] = []) {
  return buildEvents(records, new Map(sites.map((s) => [s.programName, s])), NOW);
}

function site(fields: Record<string, unknown>): SiteProgram {
  return parseRecord({ id: "recSSSSSSSSSSSSSS", fields } as Parameters<typeof parseRecord>[0]);
}

/**
 * Bun ships no XML parser, so well-formedness is checked by walking the tags
 * and asserting every open element is closed in order.
 */
function isWellFormed(xml: string): boolean {
  const stack: string[] = [];
  for (const [tag] of xml.matchAll(/<[^>]+>/g)) {
    if (tag.startsWith("<?") || tag.endsWith("/>")) continue;
    if (tag.startsWith("</")) {
      if (stack.pop() !== tag.slice(2, -1)) return false;
    } else {
      stack.push(tag.slice(1).split(/[\s>]/)[0]);
    }
  }
  return stack.length === 0;
}

describe("toRfc822", () => {
  test("emits the exact form pubDate requires", () => {
    expect(toRfc822("2026-01-05T12:34:56.000Z")).toBe("Mon, 05 Jan 2026 12:34:56 GMT");
  });

  test("is null rather than 'Invalid Date' for junk", () => {
    expect(toRfc822("not a date")).toBeNull();
  });
});

describe("renderRssFeed", () => {
  const channel = {
    title: "Hack Club events",
    link: `${ORIGIN}/programs`,
    description: "Newly announced events.",
    feedUrl: `${ORIGIN}/api/v1/events/rss`,
    language: "en",
    lastBuildDate: "Mon, 05 Jan 2026 12:34:56 GMT",
    ttlMinutes: 60,
  };

  test("produces a well-formed document with no items", () => {
    const xml = renderRssFeed({ ...channel, lastBuildDate: null }, []);
    expect(xml.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toBe(true);
    expect(isWellFormed(xml)).toBe(true);
    expect(xml).not.toContain("<item>");
    expect(xml).not.toContain("<lastBuildDate>");
  });

  test("omits pubDate rather than emitting an empty one", () => {
    const xml = renderRssFeed(channel, [
      {
        title: "x",
        link: ORIGIN,
        description: "d",
        guid: "g",
        pubDate: null,
        categories: [],
      },
    ]);
    expect(xml).not.toContain("<pubDate>");
    expect(isWellFormed(xml)).toBe(true);
  });

  test("preserves the order it is given", () => {
    const item = (title: string) => ({
      title,
      link: ORIGIN,
      description: "d",
      guid: title,
      pubDate: null,
      categories: [],
    });
    const xml = renderRssFeed(channel, [item("one"), item("two")]);
    expect(xml.indexOf("one")).toBeLessThan(xml.indexOf("two"));
  });
});

describe("buildEventsFeed", () => {
  const events = build([
    ysws({ id: "recAAAAAAAAAAAAAA", Name: "Older", createdTime: "2026-01-01T00:00:00.000Z" }),
    ysws({ id: "recBBBBBBBBBBBBBB", Name: "Newer", createdTime: "2026-03-01T00:00:00.000Z" }),
  ]);

  test("is an announcement stream: newest first", () => {
    const xml = buildEventsFeed(events, ORIGIN);
    expect(xml.indexOf("Newer")).toBeLessThan(xml.indexOf("Older"));
    expect(isWellFormed(xml)).toBe(true);
  });

  test("includes ended events — the feed is an archive, not a listing", () => {
    const ended = build([ysws({ Name: "Over", "End Date": "2026-02-01" })]);
    expect(buildEventsFeed(ended, ORIGIN)).toContain("<title>Over</title>");
  });

  test("dates lastBuildDate from the newest item, never from the clock", () => {
    // A timestamp that moved on every request would make the body byte-unstable
    // and kill conditional requests.
    expect(buildEventsFeed(events, ORIGIN)).toContain(
      "<lastBuildDate>Sun, 01 Mar 2026 00:00:00 GMT</lastBuildDate>",
    );
    expect(buildEventsFeed(events, ORIGIN)).toBe(buildEventsFeed(events, ORIGIN));
  });

  test("uses a tag URI as guid so renames and moves do not re-notify", () => {
    expect(buildEventsFeed(events, ORIGIN)).toContain(
      '<guid isPermaLink="false">tag:hackclub.com,2026:event/recBBBBBBBBBBBBBB</guid>',
    );
    expect(eventGuid("recX")).toBe("tag:hackclub.com,2026:event/recX");
  });

  test("keeps the guid stable across hostnames", () => {
    const other = buildEventsFeed(events, "https://fr.hackclub.com");
    expect(other).toContain("tag:hackclub.com,2026:event/recBBBBBBBBBBBBBB");
  });

  test("falls back to /programs when an event has no website", () => {
    expect(buildEventsFeed(events, ORIGIN)).toContain(`<link>${ORIGIN}/programs</link>`);
  });

  test("carries no expiring Airtable URLs", () => {
    // Readers archive items forever, so a two-hour signed URL would be a
    // permanently broken image.
    const withLogo = build(
      [ysws()],
      [
        site({
          Name: "Forge",
          Logo: [{ url: "https://v5.airtableusercontent.com/x", filename: "l" }],
        }),
      ],
    );
    const xml = buildEventsFeed(withLogo, ORIGIN);
    expect(xml).not.toContain("<enclosure");
    expect(xml).not.toContain("airtableusercontent");
  });

  test("never uses CDATA, which a ]]> in a description could break out of", () => {
    const hostile = build([ysws({ Name: "Ship & Chill <script>alert(1)</script>" })]);
    const xml = buildEventsFeed(hostile, ORIGIN);
    expect(xml).not.toContain("<![CDATA[");
    expect(xml).not.toContain("<script");
    expect(xml).toContain("Ship &amp; Chill");
    expect(isWellFormed(xml)).toBe(true);
  });

  test("honours a limit", () => {
    expect(buildEventsFeed(events, ORIGIN, 1)).not.toContain("Older");
  });

  test("tags each item with its project types and status", () => {
    const tagged = build(
      [ysws()],
      [site({ Name: "Forge", "Project Types": [{ name: "Electronics" }] })],
    );
    const xml = buildEventsFeed(tagged, ORIGIN);
    expect(xml).toContain("<category>Electronics</category>");
    expect(xml).toContain("<category>ongoing</category>");
  });
});
