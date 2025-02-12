import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value || "lt";

  // ✅ Ensure locale is always set in cookies
  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", localeCookie, { path: "/" });

  return response;
}

export const config = {
  matcher: "/:path*",
};
