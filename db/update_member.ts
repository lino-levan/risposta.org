import { supabase } from "lib/db.ts";

export async function updateMember(member_id: number, role: string) {
  const { error, data } = await supabase.from("members")
    .update({ role })
    .eq("id", member_id)
    .select("*");
  if (error) return null;
  return data;
}
