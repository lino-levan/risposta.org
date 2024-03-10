import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";

export async function getMembership(user_id: number, class_id: number) {
  const { data: memberData, error } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", user_id)
    .eq("class_id", class_id)
    .single();

  if (error) return bad();
  return memberData;
}

export async function getAllMembers(class_id: number) {
  const { data: memberData, error } = await supabase
    .from("members")
    .select("*, user_id!inner(*)")
    .eq("class_id", class_id);
  if (error || !memberData) return bad();
  return memberData;
}
