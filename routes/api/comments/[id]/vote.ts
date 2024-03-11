import { Handlers } from "$fresh/server.ts";
import { deleteCommentVote } from "db/delete_comment_vote.ts";
import { getMembership } from "db/get_member.ts";
import { getComment } from "db/get_comment.ts";
import { upsertCommentVote } from "db/upsert_comment_vote.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const { vote, comment_id }: { vote: number; comment_id: number } = await req
      .json();
    const user = ctx.state.user;

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
