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
      .from("posts")
      .select("member_id, member:member_id (user_id)")
      .eq("id", postId)
      .single();

    if (postError || !post) return bad("Post not found.");
    if (post.member.user_id !== user.id) {
      return unauthorized("You do not have permission to edit this post.");
    }

    const { title, content }: { title: string; content: string } = await req
      .json();
    const { error } = await supabase.from("posts")
      .update({ title, content })
      .eq("id", postId);

    if (error) return bad();

    return new Response("Post updated successfully", { status: 200 });
  },
};
