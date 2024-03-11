import { supabase } from "lib/db.ts";

export async function getPostVoted(member_id: number, post_id: number) {
  const { data } = await supabase.from("post_votes").select("*").eq(
    "member_id",
    member_id,
  ).eq("post_id", post_id);
  return data === null || data.length === 0 ? 0 : (data[0].upvote ? 1 : -1);
}
