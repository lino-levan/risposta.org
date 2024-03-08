import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const { vote }: { vote: number } = await req.json();
    const postId = parseInt(ctx.params.id);
    const user = ctx.state.user;

    // Get data on the post being upvoted
    const { data: post, error: postError } = await supabase.from(
      "posts",
    ).select("*").eq("id", postId).single();
    if (postError) return bad();

    // Get data on the author who posted the post
    const { data: author, error: authorError } = await supabase.from(
      "members",
    ).select("*").eq("id", post.member_id).single();
    if (authorError) {
      return bad();
    }

    // get member who is upvoting from the class id and user
    const { data: member, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", author.class_id)
      .single();
    if (memberError) return bad();

    if (vote === 1) {
      const { error } = await supabase
        .from("post_votes")
        .upsert({ post_id: postId, member_id: member.id, upvote: true }, {
          onConflict: "post_id, member_id",
        })
        .select("*");
      if (error) return bad();
    } else if (vote === -1) {
      const { error } = await supabase
        .from("post_votes")
        .upsert({ post_id: postId, member_id: member.id, upvote: false }, {
          onConflict: "post_id, member_id",
        })
        .select("*");
      if (error) return bad();
    } else if (vote === 0) {
      const { error } = await supabase
        .from("post_votes")
        .delete()
        .eq("post_id", postId)
        .eq("member_id", member.id)
        .select("*");
      if (error) return bad();
    }

    return success();
  },
};
