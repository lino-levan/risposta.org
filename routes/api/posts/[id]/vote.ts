import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { getExpandedPost } from "db/get_expanded_post.ts";
import { getMembership } from "db/get_member.ts";
import { upsertPostVote } from "db/upsert_post_vote.ts";
import { deletePostVote } from "db/delete_post_vote.ts";
import { z } from "zod";

const voteSchema = z.object({
  vote: z.number(),
});

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  // Upvote a post
  async POST(req, ctx) {
    const result = voteSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { vote } = result.data;

    const postId = parseInt(ctx.params.id);
    const user = ctx.state.user;

    // Get data on the post being upvoted
    const expanded_post = await getExpandedPost(postId);
    if (!expanded_post) return bad();

    // get member who is upvoting from the class id and user
    const member = await getMembership(user.id, expanded_post.class_id);
    if (!member) return bad();

    if (vote === 1) {
      const vote = await upsertPostVote(postId, member.id, true);
      if (!vote) return bad();
    } else if (vote === -1) {
      const vote = await upsertPostVote(postId, member.id, false);
      if (!vote) return bad();
    } else if (vote === 0) {
      const deleted = await deletePostVote(postId, member.id);
      if (!deleted) return bad();
    }

    return success();
  },
};
