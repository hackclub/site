import { describe, expect, test } from "bun:test";
import {
  AGENT_ROUTES,
  AGENT_ROUTE_GROUP_LABELS,
  findAgentRoute,
  isMarkdownEligiblePath,
  normalizeRoutePath,
} from "@/lib/agent-routes";
import { readdirSync } from "node:fs";
import path from "node:path";

describe("normalizeRoutePath", () => {
  test("strips trailing slashes and keeps the root", () => {
    expect(normalizeRoutePath("/philosophy/")).toBe("/philosophy");
    expect(normalizeRoutePath("/")).toBe("/");
    expect(normalizeRoutePath("")).toBe("/");
    expect(normalizeRoutePath("philosophy")).toBe("/philosophy");
  });
});

describe("findAgentRoute", () => {
  test("resolves registered pages", () => {
    expect(findAgentRoute("/philosophy")?.namespace).toBe("Philosophy");
    expect(findAgentRoute("/")?.namespace).toBe("Meta");
    expect(findAgentRoute("/conduct")?.contentSlug).toBe("conduct");
  });

  test("resolves dynamic HCB directory paths to their section", () => {
    expect(findAgentRoute("/fiscal-sponsorship/directory/first")?.path).toBe(
      "/fiscal-sponsorship/directory",
    );
    expect(findAgentRoute("/fiscal-sponsorship/directory/first/north-america")?.path).toBe(
      "/fiscal-sponsorship/directory",
    );
    expect(findAgentRoute("/fiscal-sponsorship/climate/organizations-in-europe")?.path).toBe(
      "/fiscal-sponsorship/climate",
    );
  });

  test("returns null for paths that do not exist", () => {
    expect(findAgentRoute("/definitely-not-a-page")).toBeNull();
    // /arcade/* 404s in HTML, so it must 404 in Markdown too.
    expect(findAgentRoute("/arcade/anything")).toBeNull();
    expect(findAgentRoute("/fiscal-sponsorship/directory/not-a-category")).toBeNull();
    expect(findAgentRoute("/fiscal-sponsorship/climate/organizations-in-atlantis")).toBeNull();
  });
});

describe("isMarkdownEligiblePath", () => {
  test("pages and unknown page paths negotiate Markdown", () => {
    expect(isMarkdownEligiblePath("/philosophy")).toBe(true);
    expect(isMarkdownEligiblePath("/")).toBe(true);
    // Unknown paths stay eligible so agents get a Markdown 404.
    expect(isMarkdownEligiblePath("/no-such-page")).toBe(true);
  });

  test("assets and proxied routes are never rewritten", () => {
    for (const path of ["/api/programs", "/_next/static/chunk.js"]) {
      expect(isMarkdownEligiblePath(path)).toBe(false);
    }
  });
});

describe("registry integrity", () => {
  test("every entry has a unique path and a known group", () => {
    const paths = AGENT_ROUTES.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);

    for (const route of AGENT_ROUTES) {
      expect(route.path.startsWith("/")).toBe(true);
      expect(route.path === "/" || !route.path.endsWith("/")).toBe(true);
      expect(AGENT_ROUTE_GROUP_LABELS[route.group]).toBeTruthy();
    }
  });

  test("titles and descriptions resolve against the English messages", async () => {
    type MessageTree = Record<string, Record<string, unknown>>;
    const messages = (await import("../messages/namespaces/en/00-core.json"))
      .default as unknown as MessageTree;
    const base = (await import("../messages/en.json")).default as unknown as MessageTree;

    for (const route of AGENT_ROUTES) {
      const namespace = { ...base[route.namespace], ...messages[route.namespace] };
      expect(typeof namespace?.[route.titleKey]).toBe("string");
      expect(typeof namespace?.[route.descriptionKey]).toBe("string");
    }
  });

  test("every content-backed page points at a file that exists", async () => {
    const contentFiles = new Set(
      readdirSync(path.join(process.cwd(), "content")).map((name) => name.replace(/\.md$/, "")),
    );

    for (const route of AGENT_ROUTES) {
      if (!route.contentSlug) continue;
      expect(contentFiles.has(route.contentSlug)).toBe(true);
    }
  });

  test("public pages in the app router are listed, so /llms.txt stays complete", () => {
    const appDir = path.join(process.cwd(), "app", "[locale]");
    const registered = new Set(AGENT_ROUTES.map((route) => route.path));
    // The editor is authenticated-only; it is excluded from the sitemap too.
    const excluded = new Set(["/programs/edit"]);

    const walk = (dir: string, segments: string[]): string[] => {
      const routes: string[] = [];
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          if (entry.name.startsWith("[") || entry.name.startsWith("(")) continue;
          routes.push(...walk(path.join(dir, entry.name), [...segments, entry.name]));
          continue;
        }
        if (entry.name !== "page.tsx") continue;
        routes.push(`/${segments.join("/")}`.replace(/\/+/g, "/").replace(/(.)\/$/, "$1"));
      }
      return routes;
    };

    for (const route of walk(appDir, [])) {
      const normalized = route === "" ? "/" : route;
      if (excluded.has(normalized)) continue;
      expect(registered.has(normalized)).toBe(true);
    }
  });
});
