import type { AuthRole } from "@/features/auth/types";

export const publicRoutes = ["/", "/login", "/signup"] as const;
export const protectedRoutePrefixes = [
  "/dashboard",
  "/settings",
  "/projects",
] as const;
export const authRoles: readonly AuthRole[] = [
  "owner",
  "admin",
  "member",
  "viewer",
] as const;

export function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => pathname === route);
}

export function isProtectedRoute(pathname: string) {
  return protectedRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function getLoginRedirect(nextPath: string) {
  const params = new URLSearchParams({ next: nextPath });
  return `/login?${params.toString()}`;
}

export function getPostAuthRedirect(pathname: string | null) {
  return pathname && isProtectedRoute(pathname) ? pathname : "/dashboard";
}
