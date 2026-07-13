import type { AuthRole } from "@/features/auth/types";
import { authRoles } from "@/services/auth/helpers";

export type RoleAssignment = {
  userId: string;
  role: AuthRole;
};

export function isAuthRole(value: string): value is AuthRole {
  return authRoles.includes(value as AuthRole);
}

export function assertAuthRole(value: string): AuthRole {
  if (!isAuthRole(value)) throw new Error(`Unsupported auth role: ${value}`);
  return value;
}
