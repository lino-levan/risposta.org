import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success, unauthorized } from "lib/response.ts";
import type { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async PATCH(req, ctx) {
    const postId = parseInt(ctx.params.id);
    const user = ctx.state.user;
    const { title, content }: {
      title: string;
      content: string;
    } = await req.json();

    const { data: post, error: postError } = await supabase
      .from("expanded_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (postError) return bad("Post not found.");
    if (post.user_id !== user.id) {
      return unauthorized("You do not have permission to edit this post.");
    }

    const { error } = await supabase.from("posts")
      .update({ title, content })
      .eq("id", postId)
      .select("*");

    if (error) return bad();

    return success("Post updated successfully");
  },
  async DELETE(_, ctx) {
    const postId = parseInt(ctx.params.id);
    const user = ctx.state.user;

    const { data: post, error: postError } = await supabase
      .from("expanded_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (postError) return bad("Post not found.");
    if (post.user_id !== user.id) {
      return unauthorized("You do not have permission to edit this post.");
    }

    const { error } = await supabase.from("posts")
      .delete()
      .eq("id", postId);

    if (error) return bad();

    return success(ctx.params.id);
  },
};
