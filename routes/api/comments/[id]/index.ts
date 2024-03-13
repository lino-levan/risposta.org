import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { updateComment } from "db/update_comment.ts";
import { deleteComment } from "db/delete_comment.ts";
import { z } from "zod";

const updateCommentSchema = z.object({
  content: z.string().min(1),
});

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  // Update a comment
  async PATCH(req, ctx) {
    const comment_id = parseInt(ctx.params.id);

    const result = updateCommentSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { content } = result.data;

    const updated = await updateComment(comment_id, content);
    if (!updated) return bad();

    return new Response("Comment updated successfully", { status: 200 });
  },
  // Delete a comment
  async DELETE(_, ctx) {
    const comment_id = parseInt(ctx.params.id);

    const deleted = await deleteComment(comment_id);
    if (!deleted) return bad();

    return success();
  },
};
