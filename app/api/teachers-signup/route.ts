import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const BASE_ID = "appnxDVC3XCKzCuPt";
const TABLE_NAME = "Teachers";

function apiKey() {
  return process.env.TEACHERS_AIRTABLE_KEY;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  try {
    const key = apiKey();
    if (!key) {
      console.error("[teachers-signup] TEACHERS_AIRTABLE_KEY is not set");
      return NextResponse.json({ error: "TEACHERS_AIRTABLE_KEY is not set" }, { status: 500 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      console.error("[teachers-signup] invalid JSON body");
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, firstName, lastName } = body as {
      email?: unknown;
      firstName?: unknown;
      lastName?: unknown;
    };

    if (!isValidEmail(email)) {
      console.error("[teachers-signup] invalid email", email);
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName)) {
      console.error("[teachers-signup] missing first/last name", { firstName, lastName });
      return NextResponse.json({ error: "First and last name are required" }, { status: 400 });
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
                email: email.trim(),
                "First Name": firstName.trim(),
                "Last Name": lastName.trim(),
              },
            },
          ],
        }),
      },
    );

    if (!res.ok) {
      const airtableError = await res.text();
      console.error("[teachers-signup] Airtable error", res.status, airtableError);
      return NextResponse.json(
        { error: "Failed to save signup", detail: airtableError },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[teachers-signup] unexpected error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 500 },
    );
  }
}
