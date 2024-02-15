import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, success, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req) {
    // TODO(lino-levan): Validate input
    const { vote, commentId }: { vote: number, commentId: number } = await req.json();
    const user = await getUser(req);
    if (!user) return unauthorized();

    // Get data on the comment being upvoted
    const { data: commentData, error: commentError } = await supabase.from(
      "comments",
    ).select("*").eq("id", commentId);
    if (commentError || commentData.length === 0 || commentData.length > 1) return bad();
    const comment = commentData[0];

    // Get data on the author who commented the comment
    const { data: authorData, error: authorError } = await supabase.from(
      "members",
    ).select("*").eq("id", comment.member_id);
    if (authorError || authorData.length === 0 || authorData.length > 1) {
      return bad();
    }
    const author = authorData[0];

    // get member who is upvoting from the class id and user
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", author.class_id);
    if (
      memberError || !memberData || memberData.length === 0 ||
      memberData.length > 1
    ) return new Response(null, { status: 500 });
    const member = memberData[0];

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
        .upsert({ comment_id: commentId, member_id: member.id, upvote: false }, {
          onConflict: "comment_id, member_id",
        }).select(
          "*",
        );
      if (error) return bad();
    } else if (vote === 0) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("comment_id", commentId)
        .eq("member_id", member.id);
      if (error) return bad();
    }

    return success();
  },
};
