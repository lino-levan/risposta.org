import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { success } from "lib/response.ts";
import { bad } from "lib/response.ts";
import type { APIState } from "lib/state.ts";

// TODO(lino-levan): Verify that the user is authorized to pin results
export const handler: Handlers<unknown, APIState> = {
  async POST(_, ctx) {
    const postId = parseInt(ctx.params.id);
    // const user = ctx.state.user;

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("member_id, member:member_id (user_id)")
      .eq("id", postId)
      .single();

    if (postError || !post) return bad("Post not found.");

    const { error } = await supabase.from("posts")
      .update({ pinned: true })
      .eq("id", postId)
      .select();

    if (error) return bad();

    return success();
  },
  async DELETE(_, ctx) {
    const postId = parseInt(ctx.params.id);
    // const user = ctx.state.user;

    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("member_id, member:member_id (user_id)")
      .eq("id", postId)
      .single();

    if (postError || !post) return bad("Post not found.");

    const { error } = await supabase.from("posts")
      .update({ pinned: false })
      .eq("id", postId)
      .select();

    if (error) return bad();

    return success();
  },
};
