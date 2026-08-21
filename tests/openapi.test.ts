import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import path from "node:path";
import { buildOpenApiDocument } from "@/lib/openapi";
import { API_ERROR_CODES } from "@/lib/api-error";
import { toYaml, yamlScalar } from "@/lib/yaml";

type AnyRecord = Record<string, any>;

const doc = buildOpenApiDocument("https://hackclub.com") as AnyRecord;

describe("OpenAPI document", () => {
  test("is a valid-looking OpenAPI 3.1 document", () => {
    expect(doc.openapi).toBe("3.1.0");
    expect(doc.info.title).toBe("Hack Club site API");
    expect(doc.info.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(doc.servers[0].url).toBe("https://hackclub.com");
  });

  test("uses the origin it is given", () => {
    const local = buildOpenApiDocument("https://fr.hackclub.com") as AnyRecord;
    expect(local.servers).toHaveLength(1);
    expect(local.servers[0].url).toBe("https://fr.hackclub.com");
  });

  test("declares that endpoints are public unless an operation says otherwise", () => {
    expect(doc.security).toEqual([{}]);
  });

  test("documents exactly the public read-only endpoints", () => {
    expect(Object.keys(doc.paths).sort()).toEqual([
      "/api/acknowledged",
      "/api/programs",
      "/api/projects",
      "/api/site-programs",
      "/api/team",
    ]);
  });

  test("every documented path is a route that really exists", () => {
    for (const route of Object.keys(doc.paths)) {
      const file = path.join(process.cwd(), "app", ...route.split("/").filter(Boolean), "route.ts");
      expect(existsSync(file)).toBe(true);
    }
  });

  test("leaves the program editor's own endpoints out", () => {
    // These exist, but they are internal plumbing for /programs/edit and the
    // OAuth flow behind it — not a public API for agents to call.
    for (const internal of [
      "/api/programs/editable",
      "/api/site-programs/upload",
      "/api/parents-signup",
      "/api/auth/login",
      "/api/auth/callback",
      "/api/auth/logout",
    ]) {
      expect(doc.paths[internal]).toBeUndefined();
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
    expect(JSON.parse(json).openapi).toBe("3.1.0");
  });
});

describe("YAML serialisation", () => {
  test("quotes scalars that would otherwise change meaning", () => {
    expect(yamlScalar("plain-value")).toBe("plain-value");
    expect(yamlScalar("yes")).toBe('"yes"');
    expect(yamlScalar("3.1.0")).toBe('"3.1.0"');
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
