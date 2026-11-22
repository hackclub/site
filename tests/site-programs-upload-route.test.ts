import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { NextRequest } from "next/server";

const realFetch = globalThis.fetch;
const realAirtableKey = process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
const realTinifyKey = process.env.TINIFY_API_KEY;
const realConsoleError = console.error;

beforeEach(() => {
  process.env.HACK_CLUB_SITE_AIRTABLE_KEY = "test-airtable-key";
  process.env.TINIFY_API_KEY = "test-tinify-key";
  console.error = () => {};
});

afterEach(() => {
  globalThis.fetch = realFetch;
  console.error = realConsoleError;
  if (realAirtableKey === undefined) delete process.env.HACK_CLUB_SITE_AIRTABLE_KEY;
  else process.env.HACK_CLUB_SITE_AIRTABLE_KEY = realAirtableKey;
  if (realTinifyKey === undefined) delete process.env.TINIFY_API_KEY;
  else process.env.TINIFY_API_KEY = realTinifyKey;
});

type FetchCall = {
  url: string;
  method: string;
  headers: Headers;
  redirect: RequestRedirect | undefined;
  body: unknown;
};

const ORIGINAL_PNG = new Uint8Array(64).fill(0x41);
const SMALLER_WEBP = new Uint8Array(16).fill(0x57);

function makeUploadRequest(): NextRequest {
  const form = new FormData();
  form.set("programName", "Undercity");
  form.set("type", "logo");
  form.set("file", new File([ORIGINAL_PNG], "logo.png", { type: "image/png" }));

  return new NextRequest("https://hackclub.com/api/site-programs/upload", {
    method: "POST",
    body: form,
  });
}

function stubUploadFetch(shrinkLocation: string): FetchCall[] {
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (input: URL | RequestInfo, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const method = init.method ?? "GET";
    const headers = new Headers(init.headers);
    const body = typeof init.body === "string" ? JSON.parse(init.body) : init.body;
    calls.push({ url, method, headers, redirect: init.redirect, body });

    if (url.startsWith("https://api.airtable.com/") && url.includes("fields[]=Name")) {
      return Response.json({
        records: [{ id: "recuklKiVnDAlUycR", fields: { Name: "Undercity" } }],
      });
    }

    if (url === "https://api.tinify.com/shrink") {
      return new Response(null, {
        status: 201,
        headers: { Location: shrinkLocation },
      });
    }

    if (url === "https://api.tinify.com/output/abc123") {
      return new Response(SMALLER_WEBP, {
        status: 200,
        headers: { "Content-Type": "image/webp" },
      });
    }

    if (url.startsWith("https://content.airtable.com/")) {
      return Response.json({ id: "recuklKiVnDAlUycR" });
    }

    if (url.startsWith("https://api.airtable.com/")) {
      return Response.json({
        id: "recuklKiVnDAlUycR",
        fields: { Name: "Undercity" },
      });
    }

    throw new Error(`Unexpected fetch URL: ${url}`);
  }) as unknown as typeof fetch;

  return calls;
}

describe("POST /api/site-programs/upload", () => {
  for (const untrustedLocation of [
    "https://evil.example/output/abc123",
    "http://api.tinify.com/output/abc123",
    "//evil.example/output/abc123",
    "https://api.tinify.com.evil.example/output/abc123",
    "http://[::1",
  ]) {
    test(`does not send Basic auth to untrusted Location: ${untrustedLocation}`, async () => {
      mock.module("@/lib/server-auth", () => ({
        getEditAuth: async () => ({ canEdit: true, isAdmin: false }),
        canEditProgram: async () => true,
      }));
      mock.module("next/cache", () => ({
        revalidateTag: () => {},
        unstable_cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
      }));

      const calls = stubUploadFetch(untrustedLocation);
      const { POST } = await import("@/app/api/site-programs/upload/route");

      const res = await POST(makeUploadRequest());
      expect(res.status).toBe(200);

      const basicAuthCalls = calls.filter((c) =>
        c.headers.get("authorization")?.startsWith("Basic "),
      );
      expect(basicAuthCalls).toHaveLength(1);
      expect(basicAuthCalls[0].url).toBe("https://api.tinify.com/shrink");
      expect(basicAuthCalls[0].redirect).toBe("error");

      const uploadCall = calls.find((c) => c.url.startsWith("https://content.airtable.com/"));
      expect(uploadCall?.body).toMatchObject({
        contentType: "image/png",
        filename: "logo.png",
        file: Buffer.from(ORIGINAL_PNG).toString("base64"),
      });
    });
  }

  for (const validLocation of ["https://api.tinify.com/output/abc123", "/output/abc123"]) {
    test(`converts via Tinify when Location is trusted: ${validLocation}`, async () => {
      mock.module("@/lib/server-auth", () => ({
        getEditAuth: async () => ({ canEdit: true, isAdmin: false }),
        canEditProgram: async () => true,
      }));
      mock.module("next/cache", () => ({
        revalidateTag: () => {},
        unstable_cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
      }));

      const calls = stubUploadFetch(validLocation);
      const { POST } = await import("@/app/api/site-programs/upload/route");

      const res = await POST(makeUploadRequest());
      expect(res.status).toBe(200);

      const convertCall = calls.find((c) => c.url === "https://api.tinify.com/output/abc123");
      expect(convertCall).toBeDefined();
      expect(convertCall?.headers.get("authorization")).toBe(
        `Basic ${Buffer.from("api:test-tinify-key").toString("base64")}`,
      );
      expect(convertCall?.redirect).toBe("error");

      const uploadCall = calls.find((c) => c.url.startsWith("https://content.airtable.com/"));
      expect(uploadCall?.body).toMatchObject({
        contentType: "image/webp",
        filename: "logo.webp",
        file: Buffer.from(SMALLER_WEBP).toString("base64"),
      });
    });
  }
});
