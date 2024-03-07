import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const { vote, commentId }: { vote: number; commentId: number } = await req
      .json();
    const user = ctx.state.user;

    // Get data on the comment being upvoted
    const { data: comment, error: commentError } = await supabase.from(
      "comments",
    ).select("*").eq("id", commentId).single();
    if (commentError) return bad();

    // Get data on the author who commented the comment
    const { data: author, error: authorError } = await supabase.from(
      "members",
    ).select("*").eq("id", comment.member_id).single();
    if (authorError) return bad();

    // get member who is upvoting from the class id and user
    const { data: member, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", author.class_id)
      .single();
    if (memberError) return bad();

    if (vote === 1) {
      const { error } = await supabase
        .from("votes")
        .upsert({ comment_id: commentId, member_id: member.id, upvote: true }, {
          onConflict: "comment_id, member_id",
        }).select(
          "*",
        );
      if (error) return bad();
    } else if (vote === -1) {
      const { error } = await supabase
        .from("votes")
        .upsert(
          { comment_id: commentId, member_id: member.id, upvote: false },
          {
            onConflict: "comment_id, member_id",
          },
        ).select(
          "*",
        );
      if (error) return bad();
    } else if (vote === 0) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("comment_id", commentId)
        .eq("member_id", member.id)
        .select("*");
      if (error) return bad();
    }

    return success();
  },
};
