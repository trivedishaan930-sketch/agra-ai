"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { EmailOtpInput, OAuthInput } from "@/features/auth/types";

export function getAuthClient() {
  return createSupabaseBrowserClient();
}

export async function signInWithEmailOtp({ email, redirectTo }: EmailOtpInput) {
  const supabase = getAuthClient();
  return supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
}

export async function signInWithOAuth({ provider, redirectTo }: OAuthInput) {
  const supabase = getAuthClient();
  return supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
}

export async function signOut() {
  const supabase = getAuthClient();
  return supabase.auth.signOut();
}
