import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import type { APIState } from "lib/state.ts";
import { deletePost } from "db/delete_post.ts";
import { updatePost } from "db/update_post.ts";
import { z } from "zod";

const updatePostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
});

export const handler: Handlers<unknown, APIState> = {
  async PATCH(req, ctx) {
    const result = updatePostSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { title, content } = result.data;

    const postId = parseInt(ctx.params.id);

    const post = await updatePost(postId, { title, content });
    if (!post) return bad();

    return success("Post updated successfully");
  },
  async DELETE(_, ctx) {
    const postId = parseInt(ctx.params.id);

    const deleted = await deletePost(postId);
    if (!deleted) return bad();

    return success(ctx.params.id);
  },
};
