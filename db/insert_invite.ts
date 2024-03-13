import { supabase } from "lib/db.ts";

/** Insert an invite into the database */
export async function insertInvite(code: string, class_id: number) {
  const { error, data } = await supabase.from("invites").insert({
    code,
    class_id,
  }).select("*").single();
  if (error) return null;
  return data;
}
