import { supabase } from "lib/db.ts";

/** Get all invites for a class from the database */
export async function getClassInvites(class_id: number) {
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("class_id", class_id);
  if (error) return null;
  return data;
}
