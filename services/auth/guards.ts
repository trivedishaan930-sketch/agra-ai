import { redirect } from "next/navigation";
import { getLoginRedirect, getPostAuthRedirect, isProtectedRoute, isPublicRoute } from "@/services/auth/helpers";
import { getServerUser } from "@/services/auth/server";

export async function guardProtectedRoute(pathname: string) {
  if (!isProtectedRoute(pathname)) return null;
  const user = await getServerUser();
  if (!user) redirect(getLoginRedirect(pathname));
  return user;
}

export async function guardGuestRoute(pathname: string | null) {
  const user = await getServerUser();
  if (user) redirect(getPostAuthRedirect(pathname));
  return null;
}

export { isProtectedRoute, isPublicRoute };
