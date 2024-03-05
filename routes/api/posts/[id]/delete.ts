import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const postId = parseInt(ctx.params.id);

    const user = await getUser(req);
    if (!user) return unauthorized();

    const { data: post, error: postError } = await supabase
      .from("expanded_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (postError || !post) return bad("Post not found.");
    if (post.user_id !== user.id) {
      return unauthorized("You do not have permission to edit this post.");
    }

    const { error } = await supabase.from("posts")
      .delete()
      .eq("id", postId);

    if (error) return bad();

    return new Response(ctx.params.id);
  },
};
