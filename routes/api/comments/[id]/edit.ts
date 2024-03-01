import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const commentId = parseInt(ctx.params.id);
    const { content }: { content: string } = await req.json();
    const user = await getUser(req);
    if (!user) return unauthorized();

    const { data: commentData, error: commentError } = await supabase
      .from("comments")
      .select("id, member_id, member:member_id (user_id)")
      .eq("id", commentId)
      .single();
    console.log(commentId);
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
