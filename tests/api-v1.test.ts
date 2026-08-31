import { describe, expect, test } from "bun:test";
import {
  API_SUNSET_AT,
  deprecationHeaders,
  itemEnvelope,
  listEnvelope,
  V1_CACHE_CONTROL,
  V1_CORS_HEADERS,
  v1Headers,
} from "@/lib/api-v1";
import { PROGRAMS_REVALIDATE_SECONDS } from "@/lib/programs-data";
import { SCALAR_DOCS_HTML, SCALAR_SRC } from "@/lib/scalar";

describe("caching", () => {
  test("is public, revalidated at the edge, and never stored by the browser", () => {
    expect(V1_CACHE_CONTROL).toBe("public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  });

  test("cannot outlive the Airtable image URLs it embeds", () => {
    // revalidateTag busts the data cache but not the CDN, so the total window
    // is what an image URL has to survive. Airtable guarantees two hours.
    const seconds = (name: string) =>
      Number(V1_CACHE_CONTROL.match(new RegExp(`${name}=(\\d+)`))?.[1]);
    const worstCase =
      PROGRAMS_REVALIDATE_SECONDS + seconds("s-maxage") + seconds("stale-while-revalidate");
    expect(worstCase).toBeLessThan(3600);
  });
});

describe("CORS", () => {
  test("is open, and does not vary on the caller", () => {
    expect(V1_CORS_HEADERS["Access-Control-Allow-Origin"]).toBe("*");
    // Varying on Origin would split the edge cache per caller for a constant.
    expect(v1Headers().Vary).toBe("Accept-Encoding");
    expect(v1Headers().Vary).not.toContain("Origin");
  });

  test("answers the methods a read-only API has", () => {
    expect(V1_CORS_HEADERS["Access-Control-Allow-Methods"]).toBe("GET, HEAD, OPTIONS");
  });

  test("lets a caller override a header without losing the rest", () => {
    const headers = v1Headers({ "Content-Type": "application/rss+xml" });
    expect(headers["Content-Type"]).toBe("application/rss+xml");
    expect(headers["Access-Control-Allow-Origin"]).toBe("*");
  });
});

describe("envelopes", () => {
  test("count the rows actually returned", () => {
    const envelope = listEnvelope([1, 2, 3]);
    expect(envelope.data).toEqual([1, 2, 3]);
    expect(envelope.meta.count).toBe(3);
    expect(Number.isNaN(Date.parse(envelope.meta.generatedAt))).toBe(false);
  });

  test("a single item carries no count", () => {
    expect(itemEnvelope({ id: "x" }).meta.count).toBeUndefined();
  });
});

describe("deprecationHeaders", () => {
  const headers = deprecationHeaders("/api/v1/events");

  test("uses RFC 9745's structured date, not the old draft's `true`", () => {
    expect(headers.Deprecation).toMatch(/^@\d{10}$/);
    expect(headers.Deprecation).not.toBe("true");
  });

  test("points at the replacement and at the docs", () => {
    expect(headers.Link).toContain('<https://hackclub.com/api/v1/events>; rel="successor-version"');
    expect(headers.Link).toContain('<https://hackclub.com/api/v1/docs>; rel="deprecation"');
  });

  test("claims no successor when there is not one yet", () => {
    const orphan = deprecationHeaders(null);
    expect(orphan.Link).not.toContain("successor-version");
    expect(orphan.Link).toContain('rel="deprecation"');
  });

  test("sends no Sunset, because no removal date has been agreed", () => {
    expect(API_SUNSET_AT).toBeNull();
    expect(headers).not.toHaveProperty("Sunset");
  });
});

describe("the Scalar docs page", () => {
  test("pins the bundle version and checks its integrity", () => {
    expect(SCALAR_SRC).toMatch(
      /@scalar\/api-reference@\d+\.\d+\.\d+\/dist\/browser\/standalone\.min\.js$/,
    );
    expect(SCALAR_DOCS_HTML).toContain('integrity="sha384-');
    expect(SCALAR_DOCS_HTML).toContain('crossorigin="anonymous"');
  });

  test("interpolates nothing, so it is byte-identical on every domain", () => {
    expect(SCALAR_DOCS_HTML).not.toContain("${");
  });

  test("does not route test requests through Scalar's proxy", () => {
    expect(SCALAR_DOCS_HTML).not.toContain("proxyUrl");
    expect(SCALAR_DOCS_HTML).not.toContain("proxy.scalar.com");
  });

  test("renders the v1 spec", () => {
    expect(SCALAR_DOCS_HTML).toContain("url: '/api/v1/openapi.json'");
  });

  test("degrades to plain links when the CDN is unreachable", () => {
    expect(SCALAR_DOCS_HTML).toContain('id="scalar-fallback"');
    expect(SCALAR_DOCS_HTML).toContain("<noscript>");
    for (const href of ["/api/v1/events", "/api/v1/events/rss", "/api/v1/openapi.json"]) {
      expect(SCALAR_DOCS_HTML).toContain(`href="${href}"`);
    }
  });
});
