import { describe, expect, test } from "bun:test";
import { getAuthUrl, getLoginUrl } from "@/lib/send-auth";

describe("getAuthUrl parameter encoding", () => {
  test("correctly encodes standard email address without double encoding", () => {
    const rawEmail = "orpheus@hackclub.com";
    const urlString = getAuthUrl(rawEmail);
    const parsed = new URL(urlString);

    expect(parsed.origin + parsed.pathname).toBe("https://slack.hackclub.com/slides/0");
    expect(parsed.searchParams.get("email")).toBe("orpheus@hackclub.com");
    expect(urlString).toContain("email=orpheus%40hackclub.com");
    expect(urlString).not.toContain("%2540");
  });

  test("correctly handles plus-addressed email without double encoding", () => {
    const rawEmail = "orpheus+test@hackclub.com";
    const urlString = getAuthUrl(rawEmail);
    const parsed = new URL(urlString);

    expect(parsed.searchParams.get("email")).toBe("orpheus+test@hackclub.com");
    expect(urlString).toContain("email=orpheus%2Btest%40hackclub.com");
    expect(urlString).not.toContain("%252B");
    expect(urlString).not.toContain("%2540");
  });

  test("trims leading and trailing whitespace from email", () => {
    const rawEmail = "  orpheus@hackclub.com  ";
    const urlString = getAuthUrl(rawEmail);
    const parsed = new URL(urlString);

    expect(parsed.searchParams.get("email")).toBe("orpheus@hackclub.com");
    expect(urlString).not.toContain("%20");
    expect(urlString).not.toContain("+hackclub");
  });

  test("omits email parameter when email is empty or missing", () => {
    expect(new URL(getAuthUrl()).searchParams.has("email")).toBe(false);
    expect(getAuthUrl()).toBe("https://slack.hackclub.com/slides/0");
    expect(new URL(getAuthUrl("")).searchParams.has("email")).toBe(false);
    expect(getAuthUrl("")).toBe("https://slack.hackclub.com/slides/0");
    expect(new URL(getAuthUrl("   ")).searchParams.has("email")).toBe(false);
    expect(getAuthUrl("   ")).toBe("https://slack.hackclub.com/slides/0");
  });
});

describe("getLoginUrl parameter encoding", () => {
  test("correctly encodes standard email address without double encoding", () => {
    const rawEmail = "orpheus@hackclub.com";
    const urlString = getLoginUrl(rawEmail);
    const parsed = new URL(urlString);

    expect(parsed.origin + parsed.pathname).toBe("https://auth.hackclub.com/login");
    expect(parsed.searchParams.get("email")).toBe("orpheus@hackclub.com");
    expect(urlString).toContain("email=orpheus%40hackclub.com");
    expect(urlString).not.toContain("%2540");
  });

  test("correctly handles plus-addressed email without double encoding", () => {
    const rawEmail = "orpheus+test@hackclub.com";
    const urlString = getLoginUrl(rawEmail);
    const parsed = new URL(urlString);

    expect(parsed.searchParams.get("email")).toBe("orpheus+test@hackclub.com");
    expect(urlString).toContain("email=orpheus%2Btest%40hackclub.com");
    expect(urlString).not.toContain("%252B");
    expect(urlString).not.toContain("%2540");
  });

  test("trims leading and trailing whitespace from email", () => {
    const rawEmail = "  orpheus@hackclub.com  ";
    const urlString = getLoginUrl(rawEmail);
    const parsed = new URL(urlString);

    expect(parsed.searchParams.get("email")).toBe("orpheus@hackclub.com");
    expect(urlString).not.toContain("%20");
    expect(urlString).not.toContain("+hackclub");
  });

  test("omits email parameter when email is empty or missing", () => {
    expect(new URL(getLoginUrl()).searchParams.has("email")).toBe(false);
    expect(getLoginUrl()).toBe("https://auth.hackclub.com/login");
    expect(new URL(getLoginUrl("")).searchParams.has("email")).toBe(false);
    expect(getLoginUrl("")).toBe("https://auth.hackclub.com/login");
    expect(new URL(getLoginUrl("   ")).searchParams.has("email")).toBe(false);
    expect(getLoginUrl("   ")).toBe("https://auth.hackclub.com/login");
  });
});

