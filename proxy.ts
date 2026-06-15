import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const h = new Headers(request.headers);
  h.set("x-pathname", request.nextUrl.pathname);
  h.set("x-search", request.nextUrl.search);

  return NextResponse.next({
    request: { headers: h },
  });
}

export const config = {
  matcher: [
    // 404 matching on valid paths
    "/((?!_next/|api/|.*\\.[^/]+$).*)",
  ],
};
