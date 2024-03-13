import { supabase } from "lib/db.ts";

/** Delete a comment from the database */
export async function deleteComment(comment_id: number) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);
  if (error) return null;
  return true;
}
