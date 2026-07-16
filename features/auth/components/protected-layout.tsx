import type { ReactNode } from "react";
import { requireServerUser } from "@/services/auth/server";

export async function ProtectedLayout({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname?: string;
}) {
  await requireServerUser(pathname);
  return <>{children}</>;
}
