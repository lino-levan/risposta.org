import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const postId = ctx.params.id;
    const user = await getUser(req);
    if (!user) return new Response(null, { status: 401 });

    const { data: postData, error: postError } = await supabase.from(
      "posts",
    ).select("*").eq("id", postId);
    if (
      postError || !postData || postData.length === 0 ||
      postData.length > 1
    ) return new Response(null, { status: 500 });

    const post = postData[0];

    const { data: authorData, error: authorError } = await supabase.from(
      "members",
    ).select("*").eq("id", post.member_id);
    if (
      postError || !postData || postData.length === 0 ||
      postData.length > 1
    ) return new Response(null, { status: 500 });
    if (
      authorError || !authorData || authorData.length === 0 ||
      authorData.length > 1
    ) return new Response(null, { status: 500 });

    const author = authorData[0];

    // get member row from class id and user
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", author.class_id);
    if (
      memberError || !memberData || memberData.length === 0 ||
      memberData.length > 1
    ) return new Response(null, { status: 500 });
    const member = memberData[0];

    const upvote = true;

    const { data, error } = await supabase
      .from("votes")
      .upsert([{ post_id: postId, member_id: member.id, upvote: upvote }]);

    if (error) {
      console.error("Error adding vote:", error.message);
    } else {
      console.log("Vote added successfully:", data);
    }
    return new Response(ctx.params.id);
  },
};

// import { createClient } from "@supabase/supabase-js";
// import { supabase } from "./db.ts";

// const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY")!;

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// async function addVote(postId: string, memberId: string, upvote: boolean) {
//     const { data, error } = await supabase
//       .from("votes")
//       .upsert([{ post_id: postId, member_id: memberId, upvote: upvote }]);

//     if (error) {
//       console.error("Error adding vote:", error.message);
//     } else {
//       console.log("Vote added successfully:", data);
//     }
//   }
