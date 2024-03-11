import { supabase } from "lib/db.ts";
import { Database } from "lib/supabase_types.ts";

interface UserDetail {
  name: string;
  picture: string;
}

export type ClassMember = Database["public"]["Tables"]["members"]["Row"] & {
  user_id: UserDetail;
};

export async function getClassMembers(class_id: number) {
  const { data: memberData, error } = await supabase
    .from("members")
    .select("*, user_id!inner(*)")
    .eq("class_id", class_id);
  if (error) return null;
  return memberData as unknown as ClassMember[];
}
