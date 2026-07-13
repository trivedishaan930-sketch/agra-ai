import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/config/env";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co", env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder", {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); },
    },
  });
}
