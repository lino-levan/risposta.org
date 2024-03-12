import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import type { APIState } from "lib/state.ts";
import { deletePost } from "db/delete_post.ts";
import { updatePost } from "db/update_post.ts";

export const handler: Handlers<unknown, APIState> = {
  async PATCH(req, ctx) {
    const postId = parseInt(ctx.params.id);
    const { title, content }: {
      title: string;
      content: string;
    } = await req.json();

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
