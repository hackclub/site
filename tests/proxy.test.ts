import { describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";
import proxy from "@/proxy";

function request(url: string, headers: Record<string, string> = {}, method = "GET") {
  return new NextRequest(new URL(url), { headers, method });
}

describe("proxy content negotiation", () => {
  test("Accept: text/markdown is rewritten to the Markdown handler", () => {
    const response = proxy(request("https://hackclub.com/philosophy", { accept: "text/markdown" }));

    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "https://hackclub.com/api/markdown/philosophy",
    );
    expect(response.headers.get("vary")).toContain("Accept");
    expect(response.headers.get("link")).toContain(
      '<https://hackclub.com/philosophy.md>; rel="alternate"; type="text/markdown"',
    );
  });

  test("the homepage rewrites to the handler root", () => {
    const response = proxy(request("https://hackclub.com/", { accept: "text/markdown" }));
    expect(response.headers.get("x-middleware-rewrite")).toBe("https://hackclub.com/api/markdown");
  });

  test("the query string survives the rewrite", () => {
    const response = proxy(
      request("https://hackclub.com/programs?year=2026", { accept: "text/markdown" }),
    );
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "https://hackclub.com/api/markdown/programs?year=2026",
    );
  });

  test("HTML requests are left to the i18n middleware but still advertise Markdown", () => {
    const response = proxy(
      request("https://hackclub.com/philosophy", {
        accept: "text/html,application/xhtml+xml,*/*;q=0.8",
      }),
    );

    expect(response.headers.get("x-middleware-rewrite")).not.toContain("/api/markdown");
    expect(response.headers.get("vary")).toContain("Accept");
    expect(response.headers.get("link")).toContain("/philosophy.md");
  });

  test("every page response advertises the machine-readable surfaces", () => {
    const link = proxy(request("https://hackclub.com/philosophy")).headers.get("link") ?? "";

    expect(link).toContain('rel="index"');
    expect(link).toContain("/llms.txt");
    expect(link).toContain('rel="service-desc"');
    expect(link).toContain("/openapi.json");
    expect(link).toContain('rel="sitemap"');
  });

  test("clients that accept neither representation get 406", () => {
    const response = proxy(request("https://hackclub.com/philosophy", { accept: "image/png" }));
    expect(response.status).toBe(406);
    expect(response.headers.get("vary")).toContain("Accept");
  });

  test("RSC payload requests are never negotiated", () => {
    const response = proxy(
      request("https://hackclub.com/philosophy", { accept: "text/x-component", rsc: "1" }),
    );
    expect(response.status).not.toBe(406);
    expect(response.headers.get("x-middleware-rewrite")).not.toContain("/api/markdown");
  });

  test("non-GET requests are never negotiated", () => {
    const response = proxy(
      request("https://hackclub.com/philosophy", { accept: "text/markdown" }, "POST"),
    );
    expect(response.headers.get("x-middleware-rewrite")).not.toContain("/api/markdown");
  });

  test("unknown paths negotiate too, so agents get a Markdown 404", () => {
    const response = proxy(request("https://hackclub.com/nope", { accept: "text/markdown" }));
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "https://hackclub.com/api/markdown/nope",
    );
  });

  test("the API is never negotiated as a page", () => {
    const response = proxy(
      request("https://hackclub.com/api/programs", { accept: "text/markdown" }),
    );
    expect(response.headers.get("x-middleware-rewrite")).not.toContain("/api/markdown");
    expect(response.status).not.toBe(406);
  });
});
