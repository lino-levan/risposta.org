import { supabase } from "lib/db.ts";

export async function upsertCommentVote(
  comment_id: number,
  member_id: number,
  upvote: boolean,
) {
  const { error, data } = await supabase
    .from("comment_votes")
    .upsert({ comment_id, member_id, upvote }, {
      onConflict: "comment_id, member_id",
    }).select(
      "*",
    );
  if (error) return null;
  return data;
}
