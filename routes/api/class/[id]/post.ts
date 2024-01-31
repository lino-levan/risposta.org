import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const classId = parseInt(ctx.params.id);
    const { title, content }: { title: string; content: string } = await req
      .json();

    // get user for request
    const user = await getUser(req);
    if (!user) return unauthorized();

    // get member row from class id and user
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", classId);
    if (memberError || memberData.length === 0 || memberData.length > 1) {
      return bad();
    }
    const member = memberData[0];

    // post question
    const { error } = await supabase.from("posts").insert({
      member_id: member.id,
      content,
      title,
    }).select();
    if (error) return bad();

    // success :)
    return new Response(null);
  },
};
