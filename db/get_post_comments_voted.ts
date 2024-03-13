import { supabase } from "lib/db.ts";
import type { Tables } from "lib/supabase_types.ts";

/** CommentVoted is a comment with the vote data */
export type CommentVoted = Tables<"comment_votes"> & {
  comment: Tables<"comments">;
};

/** Get all the comments voted by a member */
export async function getPostCommentsVoted(post_id: number) {
  const { data: voted } = await supabase
    .from("comment_votes")
    .select("*, comment:comment_id!inner(*)")
    .eq("comment.post_id", post_id);

  return voted as CommentVoted[];
}
