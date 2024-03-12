import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { getExpandedPost } from "db/get_expanded_post.ts";
import { getMembership } from "db/get_member.ts";
import { insertComment } from "db/insert_comment.ts";

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const postId = parseInt(ctx.params.id);
    const { content, parent_id }: {
      content: string;
      parent_id: number | null;
    } = await req.json();

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
