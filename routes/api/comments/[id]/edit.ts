import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, unauthorized } from "lib/response.ts";
import { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const commentId = parseInt(ctx.params.id);
    const { content }: { content: string } = await req.json();
    const user = ctx.state.user;

    const { data: commentData, error: commentError } = await supabase
      .from("comments")
      .select("id, member_id, member:member_id (user_id)")
      .eq("id", commentId)
      .single();
    if (commentError || !commentData) {
      return bad("Comment not found.");
    }
    if (commentData.member.user_id !== user.id) {
      return unauthorized("You do not have permission to edit this comment.");
    }

    const { error } = await supabase
      .from("comments")
      .update({ content })
      .eq("id", commentId);

    if (error) return bad();

    return new Response("Comment updated successfully", { status: 200 });
  },
};
