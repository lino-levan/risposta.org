import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, success, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const postId = parseInt(ctx.params.id);
    const { content }: { content: string } = await req.json();

    // get user for request
    const user = await getUser(req);
    if (!user) return unauthorized();

    // Get data on the post being upvoted
    const { data: postData, error: postError } = await supabase.from(
        "posts",
      ).select("*, member_id!inner(*)").eq("id", postId);
      if (postError || postData.length === 0 || postData.length > 1) return bad();
      const post = postData[0];

    // get member row from user
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", post.member_id.class_id);
    console.log(memberData);
    if (memberError || memberData.length === 0 || memberData.length > 1) {
      return bad();
    }
    const member = memberData[0];

    // post comment
    const { error } = await supabase.from("comments").insert({
      member_id: member.id,
      post_id: postId,
      content,
    }).select();
    if (error) return bad();

    // success :)
    return success();
  },
};