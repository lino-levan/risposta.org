import { Handlers } from "$fresh/server.ts";
import { success } from "lib/response.ts";
import { bad } from "lib/response.ts";
import type { APIState } from "lib/state.ts";
import { updatePost } from "db/update_post.ts";

// TODO(lino-levan): Verify that the user is authorized to pin results
export const handler: Handlers<unknown, APIState> = {
  // Pin a post
  async POST(_, ctx) {
    const postId = parseInt(ctx.params.id);

    const post = await updatePost(postId, { pinned: true });
    if (!post) return bad();

    return success();
  },
  // Unpin a post
  async DELETE(_, ctx) {
    const postId = parseInt(ctx.params.id);

    const post = await updatePost(postId, { pinned: false });
    if (!post) return bad();

    return success();
  },
};
