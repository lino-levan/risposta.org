import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, success, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const { vote }: { vote: number } = await req.json();
    const postId = parseInt(ctx.params.id);
    const user = await getUser(req);
    if (!user) return unauthorized();

    // Get data on the post being upvoted
    const { data: postData, error: postError } = await supabase.from(
      "posts",
    ).select("*").eq("id", postId);
    if (postError || postData.length === 0 || postData.length > 1) return bad();
    const post = postData[0];

    // Get data on the author who posted the post
    const { data: authorData, error: authorError } = await supabase.from(
      "members",
    ).select("*").eq("id", post.member_id);
    if (authorError || authorData.length === 0 || authorData.length > 1) {
      return bad();
    }
    const author = authorData[0];

    // get member who is upvoting from the class id and user
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", author.class_id);
    if (
      memberError || !memberData || memberData.length === 0 ||
      memberData.length > 1
    ) return new Response(null, { status: 500 });
    const member = memberData[0];

    if (vote === 1) {
      const { error } = await supabase
        .from("votes")
        .upsert({ post_id: postId, member_id: member.id, upvote: true }, {
          onConflict: "post_id, member_id",
        }).select(
          "*",
        );
      if (error) return bad();
    } else if (vote === -1) {
      const { error } = await supabase
        .from("votes")
        .upsert({ post_id: postId, member_id: member.id, upvote: false }, {
          onConflict: "post_id, member_id",
        }).select(
          "*",
        );
      if (error) return bad();
    } else if (vote === 0) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("post_id", postId)
        .eq("member_id", member.id);
      if (error) return bad();
    }

    return success();
  },
};
