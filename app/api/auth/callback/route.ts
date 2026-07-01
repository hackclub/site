import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/programs/edit?auth_error=1", req.url));
  }

  // Verify CSRF state
  const expectedState = req.cookies.get("oauth_state")?.value;
  if (!expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL("/programs/edit?auth_error=1", req.url));
  }

  const clientId = process.env.HACKCLUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.HACKCLUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "HCA secrets are not set!" }, { status: 500 });
  }
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/callback`;

  const tokenRes = await fetch("https://auth.hackclub.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL("/programs/edit?auth_error=1", req.url));
  }

  const { access_token } = await tokenRes.json();

  const response = NextResponse.redirect(new URL("/programs/edit", req.url));
  // Clear the one-time state cookie
  response.cookies.set("oauth_state", "", { maxAge: 0, path: "/" });
  response.cookies.set("hc_access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 180, // 6 months (matches HC token expiry)
    path: "/",
  });

  return response;
}
