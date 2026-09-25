import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  deprecationHeaders,
  itemEnvelope,
  listEnvelope,
  V1_ALLOWED_METHODS,
  V1_CACHE_CONTROL,
  V1_CORS_HEADERS,
  v1Headers,
  v1Options,
} from "@/lib/api-v1";
import { API_VERSIONING_POLICY } from "@/lib/api-versioning-policy";
import { PROGRAMS_REVALIDATE_SECONDS } from "@/lib/programs-data";
import { SCALAR_CUSTOM_CSS, SCALAR_DOCS_HTML, SCALAR_SRC } from "@/lib/scalar";

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
    expect(V1_ALLOWED_METHODS).toBe("GET, HEAD, OPTIONS");
  });

  test("exposes the headers a caller cannot otherwise read", () => {
    expect(V1_CORS_HEADERS["Access-Control-Expose-Headers"]).toBe("Link");
  });

  test("preflights are answerable, and say which methods they allow", () => {
    const response = v1Options();
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(V1_ALLOWED_METHODS);
    expect(response.headers.get("Allow")).toBe(V1_ALLOWED_METHODS);
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
  const headers = deprecationHeaders({
    deprecatedAt: "2027-01-15T00:00:00Z",
    successorPath: "/api/v2/events",
  });

  test("uses RFC 9745's structured date, not the old draft's `true`", () => {
    expect(headers.Deprecation).toMatch(/^@\d{10}$/);
    expect(headers.Deprecation).not.toBe("true");
  });

  test("points at the replacement and the published policy", () => {
    expect(headers.Link).toContain('<https://hackclub.com/api/v2/events>; rel="successor-version"');
    expect(headers.Link).toContain(
      '<https://hackclub.com/api/versioning>; rel="deprecation"; type="text/markdown"',
    );
  });

  test("claims no successor when there is not one", () => {
    const orphan = deprecationHeaders({ deprecatedAt: "2027-01-15T00:00:00Z" });
    expect(orphan.Link).not.toContain("successor-version");
    expect(orphan.Link).toContain('rel="deprecation"');
  });

  test("only sends Sunset after a removal date has been agreed", () => {
    expect(headers).not.toHaveProperty("Sunset");
    expect(
      deprecationHeaders({
        deprecatedAt: "2027-01-15T00:00:00Z",
        sunsetAt: "2027-05-01T00:00:00Z",
      }).Sunset,
    ).toBe("Sat, 01 May 2027 00:00:00 GMT");
  });
});

describe("the published versioning policy", () => {
  test("defines compatibility, notice, and the live deprecation state", () => {
    expect(API_VERSIONING_POLICY).toContain("requires a new major version");
    expect(API_VERSIONING_POLICY).toContain("at least 90 days' notice");
    expect(API_VERSIONING_POLICY).toContain("RFC 9745");
    expect(API_VERSIONING_POLICY).toContain("RFC 8594");
    expect(API_VERSIONING_POLICY).toContain("No documented v1 endpoint is currently deprecated");
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

  test("uses the Hack Club brand theme", () => {
    expect(SCALAR_DOCS_HTML).toContain("theme: 'none'");
    expect(SCALAR_DOCS_HTML).toContain("withDefaultFonts: false");
    expect(SCALAR_CUSTOM_CSS).toContain("font-family: 'Phantom Sans'");
    expect(SCALAR_CUSTOM_CSS).toContain("--scalar-color-accent: #ec3750");
    expect(SCALAR_CUSTOM_CSS).toContain("--scalar-color-accent: #ff8c37");
    expect(SCALAR_CUSTOM_CSS).toContain("--scalar-background-3: #fff6eb");
    expect(SCALAR_CUSTOM_CSS).toContain("--scalar-background-1: #17171d");
  });

  test("degrades to plain links when the CDN is unreachable", () => {
    expect(SCALAR_DOCS_HTML).toContain('id="scalar-fallback"');
    expect(SCALAR_DOCS_HTML).toContain("<noscript>");
    for (const href of ["/api/v1/events", "/api/v1/events/rss", "/api/v1/openapi.json"]) {
      expect(SCALAR_DOCS_HTML).toContain(`href="${href}"`);
    }
  });
});

describe("every v1 route", () => {
  function routeFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return routeFiles(full);
      return entry.name === "route.ts" ? [full] : [];
    });
  }

  const routes = routeFiles(path.join(process.cwd(), "app", "api", "v1"));

  test("there are some to check", () => {
    expect(routes.length).toBeGreaterThan(4);
  });

  // Next synthesises an OPTIONS reply for any route exporting GET, and it
  // carries no CORS headers at all — so a missing export is invisible until a
  // browser somewhere refuses the preflight.
  test.each(routes)("%s answers OPTIONS itself", (file) => {
    expect(readFileSync(file, "utf8")).toMatch(/export (const|function|async function) OPTIONS/);
  });
});
