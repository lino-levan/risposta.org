import { supabase } from "lib/db.ts";

/** Delete a member from the database */
export async function deleteMember(member_id: number) {
  const { error } = await supabase.from("members").delete().eq(
    "id",
    member_id,
  );
  if (error) return null;
  return true;
}
