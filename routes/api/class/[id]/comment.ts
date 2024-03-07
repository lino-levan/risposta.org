import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, success, unauthorized } from "lib/response.ts";
import { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const postId = parseInt(ctx.params.id);
    const { content, parent_id }: {
      content: string;
      parent_id: number | null;
    } = await req.json();

    // get user for request
    const user = ctx.state.user;

    // Get data on the post being upvoted
    const { data: post, error: postError } = await supabase.from(
      "posts",
    ).select("*, member_id!inner(*)").eq("id", postId).single();
    if (postError) return bad();

    //get member row from user
    const { data: member, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq(
      "class_id",
      (post.member_id as unknown as { class_id: string }).class_id,
    ).single();
    if (memberError) {
      return bad();
    }

    // post comment
    const { error } = await supabase.from("comments").insert({
      member_id: member.id,
      post_id: postId,
      parent_id,
      content,
    }).select("*");
    if (error) return bad();

    // success :)
    return success();
  },
};
