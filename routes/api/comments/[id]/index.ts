import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, unauthorized } from "lib/response.ts";
import { APIState } from "lib/state.ts";

async function getCommentAuthor(commentId: number) {
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .select("id, member_id, member:member_id (user_id)")
    .eq("id", commentId)
    .single();
  if (commentError) return null;
  return (commentData.member as unknown as { user_id: number }).user_id;
}

export const handler: Handlers<unknown, APIState> = {
  async PATCH(req, ctx) {
    // TODO(lino-levan): Validate input
    const commentId = parseInt(ctx.params.id);
    const { content }: { content: string } = await req.json();
    const user = ctx.state.user;

    const authorId = await getCommentAuthor(commentId);
    if (!authorId) return bad("Comment not found.");
    if (authorId !== user.id) {
      return unauthorized("You do not have permission to edit this comment.");
    }

    const { error } = await supabase
      .from("comments")
      .update({ content })
      .eq("id", commentId);

    if (error) return bad();

    return new Response("Comment updated successfully", { status: 200 });
  },
  async DELETE(_, ctx) {
    const commentId = parseInt(ctx.params.id);
    const user = ctx.state.user;

    const authorId = await getCommentAuthor(commentId);
    if (!authorId) return bad("Comment not found.");
    if (authorId !== user.id) {
      return unauthorized("You do not have permission to edit this comment.");
    }

    console.log("hi");

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) return bad();

    return new Response(ctx.params.id);
  },
};
