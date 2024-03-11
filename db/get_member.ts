import { supabase } from "lib/db.ts";

export async function getMembership(user_id: number, class_id: number) {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", user_id)
    .eq("class_id", class_id)
    .single();

  if (error) return null;
  return data;
}
