import { describe, expect, test } from "bun:test";
import {
  API_DOCUMENTATION_URL,
  API_ERROR_CODES,
  buildApiError,
  defaultErrorCode,
} from "@/lib/api-error";

describe("buildApiError", () => {
  test("returns the structured fields agents need", () => {
    const body = buildApiError({
      status: 400,
      code: "bad_request",
      message: "Invalid email address",
      hint: "Send a valid address in the `email` field.",
    });

    expect(body).toEqual({
      error: "Invalid email address",
      code: "bad_request",
      message: "Invalid email address",
      hint: "Send a valid address in the `email` field.",
      status: 400,
      documentation_url: API_DOCUMENTATION_URL,
    });
  });

  test("keeps `error` a plain string for existing clients", () => {
    const body = buildApiError({ status: 502, message: "Airtable fetch failed" });
    expect(typeof body.error).toBe("string");
    expect(body.error).toBe(body.message);
  });

  test("fills in a default hint per code", () => {
    expect(buildApiError({ status: 404, message: "Nope" }).hint).toContain("OpenAPI");
    expect(buildApiError({ status: 401, message: "Nope" }).hint).toContain("/api/auth/login");
  });

  test("infers the code from the status", () => {
    expect(defaultErrorCode(400)).toBe("bad_request");
    expect(defaultErrorCode(401)).toBe("unauthorized");
    expect(defaultErrorCode(403)).toBe("forbidden");
    expect(defaultErrorCode(404)).toBe("not_found");
    expect(defaultErrorCode(413)).toBe("payload_too_large");
    expect(defaultErrorCode(415)).toBe("unsupported_media_type");
    expect(defaultErrorCode(502)).toBe("upstream_error");
    expect(defaultErrorCode(418)).toBe("bad_request");
    expect(defaultErrorCode(503)).toBe("internal_error");
  });

  test("every documented code is usable", () => {
    for (const code of API_ERROR_CODES) {
      const body = buildApiError({ status: 400, code, message: "x" });
      expect(body.code).toBe(code);
    }
  });
});
