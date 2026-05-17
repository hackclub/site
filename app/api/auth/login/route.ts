import { NextRequest, NextResponse } from "next/server";

// Redirects the browser to Hack Club OAuth — redirect_uri is inferred from request origin
export async function GET(req: NextRequest) {
  const clientId = process.env.HACKCLUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "HACKCLUB_OAUTH_CLIENT_ID is not set" }, { status: 500 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/callback`;

  // Generate a random state token to prevent CSRF on the callback
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state,
  });
  const authUrl = `https://auth.hackclub.com/oauth/authorize?${params.toString()}&scope=openid%20profile%20slack_id`;

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes — just long enough to complete the flow
    path: "/",
  });
  return response;
}
