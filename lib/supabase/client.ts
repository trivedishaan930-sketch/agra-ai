import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/config/env";

export function createSupabaseBrowserClient() {
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co", env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder");
}
