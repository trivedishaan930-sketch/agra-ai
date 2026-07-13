import type { Session, User } from "@supabase/supabase-js";

export type AuthProvider = "email" | "google";
export type AuthRole = "owner" | "admin" | "member" | "viewer";

export type AuthSession = Session;
export type AuthUser = User;

export type AuthState = {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
};

export type EmailOtpInput = {
  email: string;
  redirectTo?: string;
};

export type OAuthInput = {
  provider: Extract<AuthProvider, "google">;
  redirectTo?: string;
};
