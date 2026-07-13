import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const authService = {
  client: createSupabaseBrowserClient,
};
