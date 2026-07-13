import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLoginRedirect } from "@/services/auth/helpers";

export async function getServerSession() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session;
}

export async function getServerUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function requireServerUser(pathname = "/dashboard") {
  const user = await getServerUser();
  if (!user) redirect(getLoginRedirect(pathname));
  return user;
}
