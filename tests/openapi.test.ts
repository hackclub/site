import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import path from "node:path";
import { buildOpenApiDocument } from "@/lib/openapi";
import { API_ERROR_CODES } from "@/lib/api-error";
import { PROJECT_TYPE_OPTIONS } from "@/lib/site-programs";
import { EVENT_STATUSES } from "@/lib/events";
import { toYaml, yamlScalar } from "@/lib/yaml";

type AnyRecord = Record<string, any>;

const doc = buildOpenApiDocument("https://hackclub.com") as AnyRecord;

const EVENT_PATHS = ["/api/v1/events", "/api/v1/events/rss", "/api/v1/events/{idOrSlug}"];

const UNDOCUMENTED = [
  "/api/team",
  "/api/acknowledged",
  "/api/programs",
  "/api/projects",
  "/api/site-programs",
  "/api/programs/editable",
  "/api/site-programs/upload",
  "/api/parents-signup",
  "/api/auth/login",
  "/api/auth/callback",
  "/api/auth/logout",
];

function routeFile(route: string): string {
  const segments = route
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/^\{(.+)\}$/, "[$1]"));
  return path.join(process.cwd(), "app", ...segments, "route.ts");
}

describe("OpenAPI document", () => {
  test("is a valid-looking OpenAPI 3.2.0 document", () => {
    expect(doc.openapi).toBe("3.2.0");
    expect(doc.info.title).toBe("Hack Club Events API");
    expect(doc.info.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(doc.servers[0].url).toBe("https://hackclub.com");
    expect(doc.externalDocs.url).toBe("https://hackclub.com/api/v1/docs");
  });

  test("uses the origin it is given", () => {
    const local = buildOpenApiDocument("https://fr.hackclub.com") as AnyRecord;
    expect(local.servers).toHaveLength(1);
    expect(local.servers[0].url).toBe("https://fr.hackclub.com");
  });

  test("declares that endpoints are public unless an operation says otherwise", () => {
    expect(doc.security).toEqual([{}]);
  });

  test("documents the events API and only the events API", () => {
    expect(Object.keys(doc.paths).sort()).toEqual(EVENT_PATHS);
    for (const route of Object.keys(doc.paths)) {
      expect(route.startsWith("/api/v1/events")).toBe(true);
    }
  });

  test("every documented path is a route that really exists", () => {
    for (const route of Object.keys(doc.paths)) {
      expect(existsSync(routeFile(route))).toBe(true);
    }
  });

  test("nothing documented is deprecated", () => {
    // Deprecated endpoints are undocumented rather than flagged: there is no
    // reason to show a reader something they should not use.
    for (const route of Object.keys(doc.paths)) {
      expect(doc.paths[route].get.deprecated).toBeUndefined();
    }
  });

  test("serves the feed as RSS, not JSON", () => {
    const responses = doc.paths["/api/v1/events/rss"].get.responses;
    expect(Object.keys(responses["200"].content)).toEqual(["application/rss+xml"]);
    // Errors still come from apiError, so they stay JSON.
    expect(Object.keys(responses["400"].content)).toEqual(["application/json"]);
  });

  test("the Event schema stays in step with the code", () => {
    const event = doc.components.schemas.Event;
    expect(event.properties.projectTypes.items.enum).toEqual([...PROJECT_TYPE_OPTIONS]);
    expect(event.properties.status.enum).toEqual([...EVENT_STATUSES]);
    for (const key of ["id", "slug", "name", "status", "startDate", "announcedAt"]) {
      expect(event.required).toContain(key);
    }
  });

  test("leaves every undocumented endpoint out, and mentions none of them", () => {
    const serialised = JSON.stringify(doc);
    for (const route of UNDOCUMENTED) {
      expect(doc.paths[route]).toBeUndefined();
      expect(serialised).not.toContain(`"${route}"`);
    }
  });

  test("carries no schemas left over from the endpoints it no longer documents", () => {
    for (const schema of ["Program", "SiteProgram", "Project", "TeamMember"]) {
      expect(doc.components.schemas[schema]).toBeUndefined();
    }
  });

  test("nothing documented writes, and nothing documented needs a session", () => {
    for (const item of Object.values(doc.paths as AnyRecord)) {
      expect(Object.keys(item as AnyRecord)).toEqual(["get"]);
    }
    expect(JSON.stringify(doc)).not.toContain("hc_access_token");
    expect(doc.components.securitySchemes).toBeUndefined();
  });

  test("every operation has an operationId, a summary, and a 200-level response", () => {
    for (const [route, item] of Object.entries(doc.paths as AnyRecord)) {
      for (const [method, operation] of Object.entries(item as AnyRecord)) {
        expect(typeof (operation as AnyRecord).operationId).toBe("string");
        expect(typeof (operation as AnyRecord).summary).toBe("string");
        const statuses = Object.keys((operation as AnyRecord).responses);
        expect(statuses.some((status) => status.startsWith("2") || status.startsWith("3"))).toBe(
          true,
        );
        expect(`${method} ${route}`).toBeTruthy();
      }
    }
  });

  test("operationIds are unique", () => {
    const ids = Object.values(doc.paths as AnyRecord).flatMap((item) =>
      Object.values(item as AnyRecord).map((operation) => (operation as AnyRecord).operationId),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every error response references the shared Error schema", () => {
    for (const item of Object.values(doc.paths as AnyRecord)) {
      for (const operation of Object.values(item as AnyRecord)) {
        for (const [status, response] of Object.entries((operation as AnyRecord).responses)) {
          if (Number(status) < 400) continue;
          expect((response as AnyRecord).content["application/json"].schema.$ref).toBe(
            "#/components/schemas/Error",
          );
        }
      }
    }
  });

  test("the Error schema matches what lib/api-error actually sends", () => {
    const schema = doc.components.schemas.Error;
    expect(schema.required).toEqual(["error", "code", "message", "status", "documentation_url"]);
    expect(schema.properties.code.enum).toEqual([...API_ERROR_CODES]);
  });

  test("every $ref resolves", () => {
    const refs: string[] = [];
    const walk = (node: unknown) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node && typeof node === "object") {
        for (const [key, value] of Object.entries(node as AnyRecord)) {
          if (key === "$ref" && typeof value === "string") refs.push(value);
          else walk(value);
        }
      }
    };
    walk(doc);

    expect(refs.length).toBeGreaterThan(0);
    for (const ref of refs) {
      const resolved = ref
        .replace(/^#\//, "")
        .split("/")
        .reduce<any>((node, key) => node?.[key], doc);
      expect(resolved).toBeTruthy();
    }
  });

  test("serialises to JSON without cycles or undefined", () => {
    const json = JSON.stringify(doc);
    expect(json).not.toContain("undefined");
    expect(JSON.parse(json).openapi).toBe("3.2.0");
  });
});

describe("YAML serialisation", () => {
  test("quotes scalars that would otherwise change meaning", () => {
    expect(yamlScalar("plain-value")).toBe("plain-value");
    expect(yamlScalar("yes")).toBe('"yes"');
    expect(yamlScalar("3.2.0")).toBe('"3.2.0"');
    expect(yamlScalar("a: b")).toBe('"a: b"');
    expect(yamlScalar("")).toBe('""');
    expect(yamlScalar(true)).toBe("true");
    expect(yamlScalar(null)).toBe("null");
    expect(yamlScalar(42)).toBe("42");
    expect(yamlScalar('say "hi"')).toBe('"say \\"hi\\""');
  });

  test("round-trips the OpenAPI document through Bun's YAML parser", () => {
    const yaml = toYaml(doc as any);
    const parsed = Bun.YAML.parse(yaml) as AnyRecord;
    expect(parsed).toEqual(JSON.parse(JSON.stringify(doc)));
  });

  test("renders nested arrays and objects", () => {
    const yaml = toYaml({ a: [{ b: 1 }, "x"], c: {}, d: [] });
    expect(yaml).toBe("a:\n  - b: 1\n  - x\nc: {}\nd: []\n");
  });
});
