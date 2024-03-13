import { Handlers } from "$fresh/server.ts";
import { deleteCommentVote } from "db/delete_comment_vote.ts";
import { getMembership } from "db/get_member.ts";
import { getComment } from "db/get_comment.ts";
import { upsertCommentVote } from "db/upsert_comment_vote.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { z } from "zod";

const voteSchema = z.object({
  vote: z.number(),
  comment_id: z.number(),
});

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  // Upvote a comment
  async POST(req, ctx) {
    const user = ctx.state.user;

    const result = voteSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { vote, comment_id } = result.data;

    // Get data on the comment being upvoted
    const comment = await getComment(comment_id);
    if (!comment) return bad();

    // get member who is upvoting from the class id and user
    const member = await getMembership(user.id, comment.member.class_id);
    if (!member) return bad();

    if (vote === 1 || vote === -1) {
      const voted = await upsertCommentVote(comment.id, member.id, vote === 1);
      if (!voted) return bad();
    } else if (vote === 0) {
      const deleted = await deleteCommentVote(comment.id, member.id);
      if (!deleted) return bad();
    }

    return success();
  },
};
