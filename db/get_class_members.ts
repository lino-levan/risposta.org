import { supabase } from "lib/db.ts";
import { Tables } from "lib/supabase_types.ts";

/** A member of a class */
export type ClassMember = Tables<"members"> & {
  user: Tables<"users">;
};

/** Get all members of a class */
export async function getClassMembers(class_id: number) {
  const { data: memberData, error } = await supabase
    .from("members")
    .select("*, user:user_id!inner(*)")
    .eq("class_id", class_id);
  if (error) return null;
  return memberData as unknown as ClassMember[];
}
