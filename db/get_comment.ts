import { supabase } from "lib/db.ts";
import type { Database } from "lib/supabase_types.ts";

export async function getComment(comment_id: number) {
  const { data, error } = await supabase.from(
    "comments",
  ).select("*, member:member_id!inner(*)").eq("id", comment_id).single();
  if (error) return null;
  return data as unknown as (
    Database["public"]["Tables"]["comments"]["Row"] & {
      member: Database["public"]["Tables"]["members"]["Row"];
    }
  );
}
