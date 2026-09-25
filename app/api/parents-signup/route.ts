import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/email";
import { apiError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

function apiKey() {
  return process.env.PARENTS_AIRTABLE_KEY;
}

export async function POST(req: NextRequest) {
  const key = apiKey();
  if (!key) {
    return apiError({
      status: 500,
      code: "server_misconfigured",
      message: "PARENTS_AIRTABLE_KEY is not set",
    });
  }

  const BASE_ID = process.env.PARENTS_AIRTABLE_BASE_ID;
  if (!BASE_ID) {
    return apiError({
      status: 500,
      code: "server_misconfigured",
      message: "PARENTS_AIRTABLE_BASE_ID is not set",
    });
  }

  const TABLE_NAME = process.env.PARENTS_AIRTABLE_TABLE_ID;
  if (!TABLE_NAME) {
    return apiError({
      status: 500,
      code: "server_misconfigured",
      message: "PARENTS_AIRTABLE_TABLE_ID is not set",
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid JSON body",
      hint: 'Send a JSON object such as {"email":"you@example.com"}.',
    });
  }

  const firstName = (body as { firstName?: unknown })?.firstName;
  if (
    typeof firstName !== "string" ||
    firstName.trim().length === 0 ||
    firstName.trim().length > 200
  ) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid first name",
      hint: "Send a non-empty string in the `firstName` field.",
    });
  }

  const lastName = (body as { lastName?: unknown })?.lastName;
  if (
    typeof lastName !== "string" ||
    lastName.trim().length === 0 ||
    lastName.trim().length > 200
  ) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid last name",
      hint: "Send a non-empty string in the `lastName` field.",
    });
  }

  const email = (body as { email?: unknown })?.email;
  if (!isValidEmail(email)) {
    return apiError({
      status: 400,
      code: "bad_request",
      message: "Invalid email address",
      hint: "Send a valid address in the `email` field.",
    });
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "First name": firstName.trim(),
              "Last name": lastName.trim(),
              Email: email.trim(),
            },
          },
        ],
      }),
    },
  );

  if (!res.ok) {
    console.error("[parents-signup] Airtable error", res.status, await res.text());
    return apiError({ status: 502, code: "upstream_error", message: "Failed to save signup" });
  }

  return NextResponse.json({ ok: true });
}
