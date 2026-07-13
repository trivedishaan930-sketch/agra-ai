import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { REQUEST_ID_HEADER } from "@/config/constants";
import { applySecurityHeaders } from "@/lib/security/headers";
import { isProtectedRoute, isPublicRoute } from "@/services/auth/helpers";
import { updateAuthSession } from "@/services/auth/session";

export async function middleware(request: NextRequest) {
  const requestId = request.headers.get(REQUEST_ID_HEADER) ?? crypto.randomUUID();
  const pathname = request.nextUrl.pathname;
  const { response, user } = await updateAuthSession(request);
  response.headers.set(REQUEST_ID_HEADER, requestId);

  if (isProtectedRoute(pathname) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.search = new URLSearchParams({ next: pathname }).toString();
    const redirectResponse = NextResponse.redirect(redirectUrl);
    redirectResponse.headers.set(REQUEST_ID_HEADER, requestId);
    return applySecurityHeaders(redirectResponse);
  }

  if (!isPublicRoute(pathname)) return response;
  return applySecurityHeaders(response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
