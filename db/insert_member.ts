import { supabase } from "lib/db.ts";

export async function insertMember(
  user_id: number,
  class_id: number,
  role: string,
) {
  const { error, data } = await supabase.from("members").insert({
    user_id,
    role,
    class_id,
  }).select("*").single();
  if (error) return null;
  return data;
}
