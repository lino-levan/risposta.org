import { FreshContext } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { redirect } from "lib/response.ts";

export const handler = [
  async function postAccessCheck(_req: Request, ctx: FreshContext) {
    //get member_id from postId
    const { data: postData, error } = await supabase.from("posts").select("*")
      .eq("id", ctx.params.postId);
    if (error || !postData) {
      return redirect("../");
    }

    //get class_id from member_id
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("id", postData[0].member_id);
    if (memberError || !memberData) return redirect("../");

    // if classId from memberId from /post/[postId] != /class/[classId]
    if (memberData[0].class_id != ((ctx.params.classId as unknown) as number)) {
      console.error("Invalid postId for the current class!");
      return redirect("../");
    }

    return await ctx.next();
  },
];