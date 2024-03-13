import { supabase } from "lib/db.ts";

/** Delete a comment vote from the database */
export async function deleteCommentVote(comment_id: number, member_id: number) {
  const { error } = await supabase
    .from("comment_votes")
    .delete()
    .eq("comment_id", comment_id)
    .eq("member_id", member_id)
    .select("*");
  if (error) return null;
  return true;
}
