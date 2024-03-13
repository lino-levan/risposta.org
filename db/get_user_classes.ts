import { supabase } from "lib/db.ts";
import type { Tables } from "lib/supabase_types.ts";

/** Given a response object, return either a user or null */
export async function getUserClasses(user_id: number) {
  const { data, error } = await supabase
    .from("members")
    .select("*, class:class_id!inner(*)")
    .eq("user_id", user_id);
  if (error) return null;
  return data.map((row) => row.class) as unknown as Tables<"classes">[];
}
