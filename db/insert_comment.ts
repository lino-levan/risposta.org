import { supabase } from "lib/db.ts";

export async function insertComment(
  member_id: number,
  post_id: number,
  parent_id: number | null,
  content: string,
) {
  const { error, data } = await supabase.from("comments").insert({
    member_id,
    post_id,
    parent_id,
    content,
  }).select("*").single();
  if (error) return null;
  return data;
}
