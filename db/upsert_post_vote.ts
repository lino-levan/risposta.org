import { supabase } from "lib/db.ts";

export async function upsertPostVote(
  post_id: number,
  member_id: number,
  upvote: boolean,
) {
  const { error, data } = await supabase
    .from("post_votes")
    .upsert({ post_id, member_id, upvote }, {
      onConflict: "post_id, member_id",
    }).select(
      "*",
    );
  if (error) return null;
  return data;
}
