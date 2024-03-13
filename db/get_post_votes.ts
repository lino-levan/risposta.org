import { supabase } from "lib/db.ts";

/** Get the votes for a post */
export async function getPostVotes(post_id: number) {
  const { count: upvoteCount } = await supabase.from("post_votes").select("*", {
    count: "exact",
  }).eq("upvote", true).eq("post_id", post_id);
  const { count: downvoteCount } = await supabase.from("post_votes").select(
    "*",
    {
      count: "exact",
    },
  ).eq("upvote", false).eq("post_id", post_id);

  return (upvoteCount ?? 0) - (downvoteCount ?? 0);
}
