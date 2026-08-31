import { describe, expect, test } from "bun:test";
import {
  applyEventQuery,
  buildEvents,
  findEvent,
  hasEventArtwork,
  parseEventLimit,
  parseEventQuery,
  selectFeaturedEvents,
  slugify,
  type RawEventRecord,
} from "@/lib/events";
import { parseRecord, type SiteProgram } from "@/lib/site-programs";

const NOW = new Date("2026-06-15T12:00:00.000Z");

function ysws(
  overrides: Partial<RawEventRecord["fields"]> & { id?: string; createdTime?: string } = {},
): RawEventRecord {
  const { id, createdTime, ...fields } = overrides;
  return {
    id: id ?? "recAAAAAAAAAAAAAA",
    createdTime: createdTime ?? "2026-01-01T00:00:00.000Z",
    fields: { Name: "Forge", "Start Date": "2026-01-05", ...fields },
  };
}

function site(fields: Record<string, unknown> = {}): SiteProgram {
  return parseRecord({
    id: "rec0j72zRxLNR0OAd",
    fields: { Name: "Forge", ...fields },
  } as Parameters<typeof parseRecord>[0]);
}

function build(records: RawEventRecord[], sites: SiteProgram[] = []) {
  return buildEvents(records, new Map(sites.map((s) => [s.programName, s])), NOW);
}

describe("slugify", () => {
  test("lowercases and joins on hyphens", () => {
    expect(slugify("Hack Club: The Game")).toBe("hack-club-the-game");
    expect(slugify("Forge")).toBe("forge");
    expect(slugify("555")).toBe("555");
  });

  test("strips accents rather than turning them into separators", () => {
    expect(slugify("Café Night")).toBe("cafe-night");
  });

  test("is empty when a name has nothing to slug", () => {
    expect(slugify("🚩🚩")).toBe("");
  });
});

describe("buildEvents", () => {
  test("joins the two bases by name and flattens the result", () => {
    const [event] = build(
      [ysws({ "Website URL": "forge.hackclub.com", "End Date": "2026-12-01" })],
      [
        site({
          Description: "Build hardware.",
          "Slack Channel": "#forge",
          "Accent Color": "#CA5924",
          "Project Types": [{ name: "Electronics" }],
          Format: { name: "Both" },
          "In-Person Location": "Vermont",
          Pinned: true,
        }),
      ],
    );

    expect(event.id).toBe("recAAAAAAAAAAAAAA");
    expect(event.slug).toBe("forge");
    expect(event.description).toBe("Build hardware.");
    // A bare host gets a scheme, matching the legacy endpoint's behaviour.
    expect(event.url).toBe("https://forge.hackclub.com");
    expect(event.announcedAt).toBe("2026-01-01T00:00:00.000Z");
    expect(event.projectTypes).toEqual(["Electronics"]);
    expect(event.format).toBe("both");
    expect(event.slackChannel).toBe("forge");
    expect(event.slackUrl).toBe("https://hackclub.slack.com/channels/forge");
    expect(event.inPerson).toEqual({ start: null, end: null, location: "Vermont" });
    expect(event.pinned).toBe(true);
    expect(event.theme?.accent).toBe("#CA5924");
  });

  test("leaves theme and background null when nobody has styled the card", () => {
    const [event] = build([ysws()]);
    expect(event.theme).toBeNull();
    expect(event.background).toBeNull();
    expect(event.description).toBeNull();
    expect(event.projectTypes).toEqual([]);
    expect(hasEventArtwork(event)).toBe(false);
  });

  test("derives status, and never leaks the editor's word for it", () => {
    const [upcoming] = build([ysws({ "Start Date": "2026-09-01" })]);
    const [ongoing] = build([ysws({ "Start Date": "2026-01-05" })]);
    const [ended] = build([ysws({ "Start Date": "2026-01-05", "End Date": "2026-02-01" })]);

    expect(upcoming.status).toBe("upcoming");
    expect(ongoing.status).toBe("ongoing");
    expect(ended.status).toBe("ended");
  });

  test("treats a missing end date as running indefinitely", () => {
    const [event] = build([ysws({ "End Date": "" })]);
    expect(event.endDate).toBeNull();
    expect(event.status).toBe("ongoing");
  });

  test("falls back to the start date when Airtable sends no createdTime", () => {
    const record = ysws({ "Start Date": "2026-03-04" });
    delete record.createdTime;
    expect(build([record])[0].announcedAt).toBe("2026-03-04T00:00:00.000Z");
  });

  test("gives the event announced first the clean slug", () => {
    const records = [
      ysws({ id: "recBBBBBBBBBBBBBB", Name: "Minicraft", createdTime: "2026-05-01T00:00:00.000Z" }),
      ysws({ id: "recCCCCCCCCCCCCCC", Name: "Minicraft", createdTime: "2026-01-01T00:00:00.000Z" }),
    ];
    const bySlug = Object.fromEntries(build(records).map((e) => [e.id, e.slug]));

    expect(bySlug["recCCCCCCCCCCCCCC"]).toBe("minicraft");
    expect(bySlug["recBBBBBBBBBBBBBB"]).toBe("minicraft-2");

    // Airtable's ordering must not be able to swap the two.
    const reversed = Object.fromEntries(build([...records].reverse()).map((e) => [e.id, e.slug]));
    expect(reversed).toEqual(bySlug);
  });

  test("never hands out the slug the RSS route occupies", () => {
    const [event] = build([ysws({ Name: "RSS" })]);
    expect(event.slug).toBe("rss-2");
  });

  test("falls back to the record id for a name with nothing to slug", () => {
    const [event] = build([ysws({ Name: "🚩" })]);
    expect(event.slug).toBe("recaaaaaaaaaaaaaa");
  });
});

describe("findEvent", () => {
  const events = build([ysws({ Name: "Forge" })]);

  test("matches on record id and on slug, case-insensitively", () => {
    expect(findEvent(events, "recAAAAAAAAAAAAAA")?.name).toBe("Forge");
    expect(findEvent(events, "forge")?.name).toBe("Forge");
    expect(findEvent(events, "FORGE")?.name).toBe("Forge");
  });

  test("returns null for anything else", () => {
    expect(findEvent(events, "nope")).toBeNull();
  });
});

describe("hasEventArtwork", () => {
  test("needs a background and a logo", () => {
    const withLogo = { Logo: [{ url: "https://example.com/l.png", filename: "l" }] };
    const [none] = build([ysws()], [site()]);
    const [logoOnly] = build([ysws()], [site(withLogo)]);
    const [imageNoUrl] = build([ysws()], [site({ ...withLogo, "BG Type": "image" })]);

    expect(hasEventArtwork(none)).toBe(false);
    // A colour background counts, and parseRecord always supplies one.
    expect(hasEventArtwork(logoOnly)).toBe(true);
    expect(hasEventArtwork(imageNoUrl)).toBe(false);
  });
});

describe("parseEventLimit", () => {
  test("accepts whole numbers in range", () => {
    expect(parseEventLimit("1")).toEqual({ ok: true, limit: 1 });
    expect(parseEventLimit("100")).toEqual({ ok: true, limit: 100 });
    expect(parseEventLimit(null)).toEqual({ ok: true, limit: null });
    expect(parseEventLimit("  ")).toEqual({ ok: true, limit: null });
  });

  test("rejects anything else rather than coercing it", () => {
    for (const value of ["0", "101", "-3", "abc", "1.5", "1e2", "20abc", "0x14"]) {
      expect(parseEventLimit(value).ok).toBe(false);
    }
  });
});

describe("parseEventQuery", () => {
  const parse = (qs: string) => parseEventQuery(new URLSearchParams(qs));

  test("defaults to everything, newest start date first", () => {
    expect(parse("")).toEqual({
      ok: true,
      query: { status: null, sort: "startDate", order: "desc", limit: null },
    });
  });

  test("takes status repeated or comma-separated", () => {
    const repeated = parse("status=ongoing&status=upcoming");
    const commas = parse("status=ongoing,upcoming");
    expect(repeated).toEqual(commas);
    expect(repeated.ok && repeated.query.status).toEqual(["ongoing", "upcoming"]);
  });

  test("deduplicates repeated statuses", () => {
    const result = parse("status=ongoing&status=ongoing");
    expect(result.ok && result.query.status).toEqual(["ongoing"]);
  });

  test("rejects a value it half-recognises instead of ignoring it", () => {
    // "draft" is the editor's word; the API calls it "upcoming".
    const result = parse("status=draft");
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.hint).toContain("upcoming");
  });

  test("rejects an unknown sort or order", () => {
    expect(parse("sort=deadline").ok).toBe(false);
    expect(parse("order=sideways").ok).toBe(false);
  });

  test("ignores parameters it does not know", () => {
    expect(parse("utm_source=slack").ok).toBe(true);
  });
});

describe("applyEventQuery", () => {
  const events = build([
    ysws({ id: "recAAAAAAAAAAAAAA", Name: "Alpha", "Start Date": "2026-01-05" }),
    ysws({
      id: "recBBBBBBBBBBBBBB",
      Name: "Beta",
      "Start Date": "2026-09-01",
      createdTime: "2026-02-02T00:00:00.000Z",
    }),
    ysws({
      id: "recCCCCCCCCCCCCCC",
      Name: "Gamma",
      "Start Date": "2026-01-05",
      "End Date": "2026-02-01",
    }),
  ]);

  const run = (qs: string) => {
    const parsed = parseEventQuery(new URLSearchParams(qs));
    if (!parsed.ok) throw new Error(parsed.message);
    return applyEventQuery(events, parsed.query).map((e) => e.name);
  };

  test("filters by status", () => {
    expect(run("status=ended")).toEqual(["Gamma"]);
    expect(run("status=ongoing,upcoming").sort()).toEqual(["Alpha", "Beta"]);
  });

  test("sorts by each field, in both directions", () => {
    expect(run("sort=name&order=asc")).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(run("sort=name&order=desc")).toEqual(["Gamma", "Beta", "Alpha"]);
    expect(run("sort=announcedAt&order=desc")[0]).toBe("Beta");
  });

  test("applies limit after sorting, not before", () => {
    expect(run("sort=name&order=asc&limit=2")).toEqual(["Alpha", "Beta"]);
  });

  test("breaks ties on id so the order is stable across requests", () => {
    // Alpha and Gamma share a start date; the tiebreak must be deterministic.
    expect(run("sort=startDate&order=asc")).toEqual(run("sort=startDate&order=asc"));
  });

  test("does not mutate the list it is given", () => {
    const before = events.map((e) => e.id);
    run("sort=name&order=asc");
    expect(events.map((e) => e.id)).toEqual(before);
  });
});

describe("selectFeaturedEvents", () => {
  const artwork = {
    Logo: [{ url: "https://example.com/l.png", filename: "l" }],
    "BG Type": "image",
    "BG Image": [{ url: "https://example.com/bg.png", filename: "bg" }],
  };

  test("puts a pinned event first even when it has no artwork", () => {
    const events = build(
      [
        ysws({ id: "recAAAAAAAAAAAAAA", Name: "Plain" }),
        ysws({ id: "recBBBBBBBBBBBBBB", Name: "Pinned" }),
      ],
      [site({ Name: "Plain", ...artwork }), site({ Name: "Pinned", Pinned: true })],
    );

    expect(selectFeaturedEvents(events, 4, NOW)[0].name).toBe("Pinned");
  });

  test("only offers events that are running, and honours the limit", () => {
    const events = build([
      ysws({ id: "recAAAAAAAAAAAAAA", Name: "Running" }),
      ysws({ id: "recBBBBBBBBBBBBBB", Name: "Later", "Start Date": "2026-09-01" }),
      ysws({ id: "recCCCCCCCCCCCCCC", Name: "Over", "End Date": "2026-02-01" }),
    ]);

    expect(selectFeaturedEvents(events, 4, NOW).map((e) => e.name)).toEqual(["Running"]);
    expect(selectFeaturedEvents(events, 0, NOW)).toEqual([]);
  });
});
