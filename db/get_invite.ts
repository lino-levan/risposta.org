import { supabase } from "lib/db.ts";

/** Get an invite from the database */
export async function getInvite(code: string) {
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("code", code)
    .single();
  if (error) return null;
  return data;
}
