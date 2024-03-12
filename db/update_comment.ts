import { supabase } from "lib/db.ts";

export async function updateComment(
  comment_id: number,
  content: string,
) {
  const { error, data } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", comment_id)
    .select("*");
  if (error) return null;
  return data;
}
