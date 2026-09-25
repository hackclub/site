import { describe, expect, test } from "bun:test";
import { getLocaleDomain, getLocaleFromHost, getRequestOrigin } from "@/i18n/routing";

describe("getLocaleFromHost", () => {
  test("reads the locale from the subdomain", () => {
    expect(getLocaleFromHost("hackclub.com")).toBe("en");
    expect(getLocaleFromHost("ru.hackclub.com")).toBe("ru");
    expect(getLocaleFromHost("de.hackclub.com:443")).toBe("de");
    expect(getLocaleFromHost("FR.HACKCLUB.COM")).toBe("fr");
  });

  test("falls back to the default locale", () => {
    expect(getLocaleFromHost(null)).toBe("en");
    expect(getLocaleFromHost("localhost:3000")).toBe("en");
    expect(getLocaleFromHost("site-preview.vercel.app")).toBe("en");
  });
});

describe("getRequestOrigin", () => {
  test("production hosts resolve to the canonical locale domain", () => {
    expect(getRequestOrigin("hackclub.com")).toBe(getLocaleDomain("en"));
    expect(getRequestOrigin("es.hackclub.com")).toBe(getLocaleDomain("es"));
    // Even if the request arrived over http, the canonical origin is https.
    expect(getRequestOrigin("ru.hackclub.com", "http")).toBe("https://ru.hackclub.com");
  });

  test("other hosts keep their own origin so generated docs stay self-consistent", () => {
    expect(getRequestOrigin("localhost:3000", "http")).toBe("http://localhost:3000");
    expect(getRequestOrigin("localhost:3000", "http:")).toBe("http://localhost:3000");
    expect(getRequestOrigin("site-git-branch.vercel.app")).toBe(
      "https://site-git-branch.vercel.app",
    );
  });

  test("no host at all falls back to the canonical site", () => {
    expect(getRequestOrigin(null)).toBe("https://hackclub.com");
  });
});
