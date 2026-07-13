import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { signInWithEmailOtp, signInWithOAuth, signOut } from "@/services/auth/client";

export const authService = {
  client: createSupabaseBrowserClient,
  signInWithEmailOtp,
  signInWithOAuth,
  signOut,
};
