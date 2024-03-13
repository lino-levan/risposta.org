import { supabase } from "lib/db.ts";

/** Delete a post vote from the database */
export async function deletePostVote(post_id: number, member_id: number) {
  const { error } = await supabase
    .from("post_votes")
    .delete()
    .eq("post_id", post_id)
    .eq("member_id", member_id)
    .select("*");
  if (error) return null;
  return true;
}
