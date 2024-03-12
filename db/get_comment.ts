import { supabase } from "lib/db.ts";
import type { Tables } from "lib/supabase_types.ts";

export async function getComment(comment_id: number) {
  const { data, error } = await supabase.from(
    "comments",
  ).select("*, member:member_id!inner(*)").eq("id", comment_id).single();
  console.log(error);
  if (error) return null;
  console.log(data);
  return data as unknown as (
    Tables<"comments"> & {
      member: Tables<"members">;
    }
  );
}
