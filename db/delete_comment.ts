import { supabase } from "lib/db.ts";

export async function deleteComment(comment_id: number) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);
  if (error) return null;
  return true;
}
