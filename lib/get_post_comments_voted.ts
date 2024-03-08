import { supabase } from "lib/db.ts";
import type { Database } from "lib/supabase_types.ts";

export type CommentVoted = Database["public"]["Tables"]["comment_votes"]["Row"];

export async function getPostCommentsVoted(post_id: number) {
  const { data: voted } = await supabase
    .from("comment_votes")
    .select("*, comment:comment_id!inner(*)")
    .eq("comment.post_id", post_id);

  return voted as CommentVoted[];
}
