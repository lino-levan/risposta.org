import { supabase } from "lib/db.ts";
import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { vote_cnt } = await req.json();
    //get post (for anonymous: post.anonymous)
    const { data: postData, error: postError } = await supabase.from(
      "posts",
    ).select("*").eq("id", ctx.params.id);
    if (postError || postData.length === 0 || postData.length > 1) return bad();
    const post = postData[0];

    //update votes
    const { error: _post_err } = await supabase.from("posts").update({
      votes: vote_cnt,
      anonymous: post.anonymous,
    }).eq("id", post.id).select();

    return success();
  },
};
