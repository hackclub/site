import { describe, expect, test } from "bun:test";
import {
  acceptsNothingWeServe,
  agentDiscoveryLinks,
  markdownAlternateLink,
  mergeVary,
  parseAccept,
  prefersMarkdown,
  qualityOf,
  selectRepresentation,
} from "@/lib/content-negotiation";

describe("parseAccept", () => {
  test("parses media ranges, parameters, and q-values", () => {
    const ranges = parseAccept("text/markdown;variant=GFM;q=0.9, text/html;q=0.8, */*;q=0.1");

    expect(ranges).toHaveLength(3);
    expect(ranges[0]).toMatchObject({
      type: "text",
      subtype: "markdown",
      quality: 0.9,
      specificity: 2,
      parameters: { variant: "GFM" },
    });
    expect(ranges[1].quality).toBe(0.8);
    expect(ranges[2]).toMatchObject({ type: "*", subtype: "*", specificity: 0 });
  });

  test("defaults q to 1 and clamps out-of-range values", () => {
    expect(parseAccept("text/html")[0].quality).toBe(1);
    expect(parseAccept("text/html;q=2")[0].quality).toBe(1);
    expect(parseAccept("text/html;q=-1")[0].quality).toBe(0);
    expect(parseAccept("text/html;q=notanumber")[0].quality).toBe(1);
  });

  test("ignores malformed entries", () => {
    expect(parseAccept("")).toEqual([]);
    expect(parseAccept(null)).toEqual([]);
    expect(parseAccept("garbage, text/html")).toHaveLength(1);
    expect(parseAccept("*/plain")).toEqual([]);
  });

  test("does not split on commas inside quoted parameters", () => {
    const ranges = parseAccept('text/markdown;variant="a,b", text/html');
    expect(ranges).toHaveLength(2);
    expect(ranges[0].parameters.variant).toBe("a,b");
  });
});

describe("qualityOf", () => {
  test("uses the most specific matching range", () => {
    const ranges = parseAccept("*/*;q=0.1, text/*;q=0.5, text/html;q=0.9");
    expect(qualityOf(ranges, "text/html")).toBe(0.9);
    expect(qualityOf(ranges, "text/markdown")).toBe(0.5);
    expect(qualityOf(ranges, "application/json")).toBe(0.1);
  });

  test("an absent Accept header accepts everything", () => {
    expect(qualityOf(parseAccept(null), "text/markdown")).toBe(1);
  });

  test("q=0 means unacceptable", () => {
    expect(qualityOf(parseAccept("*/*, text/html;q=0"), "text/html")).toBe(0);
  });
});

describe("selectRepresentation", () => {
  test("Accept: text/markdown selects Markdown", () => {
    expect(selectRepresentation("text/markdown")).toBe("text/markdown");
    expect(prefersMarkdown("text/markdown")).toBe(true);
  });

  test("browsers and */* clients keep getting HTML", () => {
    const browser =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
    expect(selectRepresentation(browser)).toBe("text/html");
    expect(selectRepresentation("*/*")).toBe("text/html");
    expect(selectRepresentation(null)).toBe("text/html");
    expect(prefersMarkdown(browser)).toBe(false);
  });

  test("q-values decide between the two representations", () => {
    expect(selectRepresentation("text/markdown;q=0.9, text/html;q=0.8")).toBe("text/markdown");
    expect(selectRepresentation("text/markdown;q=0.4, text/html;q=0.5")).toBe("text/html");
    expect(selectRepresentation("text/*")).toBe("text/html");
  });

  test("nothing acceptable returns null, so the caller can answer 406", () => {
    expect(selectRepresentation("application/json")).toBeNull();
    expect(selectRepresentation("text/html;q=0, text/markdown;q=0")).toBeNull();
    expect(acceptsNothingWeServe("application/json")).toBe(true);
    expect(acceptsNothingWeServe("*/*")).toBe(false);
  });

  test("RSC payload requests are not acceptable as page representations", () => {
    // proxy.ts must skip these before negotiating; this documents why.
    expect(selectRepresentation("text/x-component")).toBeNull();
  });
});

describe("mergeVary", () => {
  test("appends without duplicating, preserving what Next.js already set", () => {
    expect(mergeVary("rsc, next-router-state-tree", "Accept", "Accept-Encoding")).toBe(
      "rsc, next-router-state-tree, Accept, Accept-Encoding",
    );
    expect(mergeVary("Accept", "Accept")).toBe("Accept");
    expect(mergeVary("accept", "Accept")).toBe("accept");
    expect(mergeVary(null, "Accept", "Accept-Encoding")).toBe("Accept, Accept-Encoding");
  });

  test("Vary: * stays *", () => {
    expect(mergeVary("*", "Accept")).toBe("*");
  });
});

test("markdownAlternateLink follows RFC 8288", () => {
  expect(markdownAlternateLink("https://hackclub.com/philosophy.md")).toBe(
    '<https://hackclub.com/philosophy.md>; rel="alternate"; type="text/markdown"',
  );
});

test("agentDiscoveryLinks advertises the machine-readable surfaces", () => {
  expect(agentDiscoveryLinks("https://hackclub.com")).toEqual([
    '<https://hackclub.com/llms.txt>; rel="index"; type="text/plain"',
    '<https://hackclub.com/openapi.json>; rel="service-desc"; type="application/json"',
    '<https://hackclub.com/sitemap.xml>; rel="sitemap"; type="application/xml"',
  ]);
});
