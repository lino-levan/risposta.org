import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { getExpandedPost } from "db/get_expanded_post.ts";
import { getMembership } from "db/get_member.ts";
import { insertComment } from "db/insert_comment.ts";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1),
  parent_id: z.number().optional(),
});

export const handler: Handlers<unknown, APIState> = {
  // Create a comment
  async POST(req, ctx) {
    const result = createCommentSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { content, parent_id } = result.data;

    const postId = parseInt(ctx.params.id);

    // get user for request
    const user = ctx.state.user;

    // Get data on the post being commented under
    const expanded_post = await getExpandedPost(postId);
    if (!expanded_post) return bad();

    // get member who is commenting from the class id and user
    const member = await getMembership(user.id, expanded_post.class_id);
    if (!member) return bad();

    // post comment
    const comment = await insertComment(
      member.id,
      expanded_post.id,
      parent_id,
      content,
    );
    if (!comment) return bad();

    // success :)
    return success();
  },
};
