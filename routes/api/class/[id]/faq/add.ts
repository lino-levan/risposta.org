import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { success } from "lib/response.ts";
import { bad, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const postId = parseInt(ctx.params.id);
    const user = await getUser(req);
    if (!user) return unauthorized();

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("member_id, member:member_id (user_id)")
      .eq("id", postId)
      .single();

    if (postError || !post) return bad("Post not found.");

    const { error } = await supabase.from("posts")
      .update({ faq: true })
      .eq("id", postId)
      .select();

    if (error) return bad();

    return success();
  },
};
