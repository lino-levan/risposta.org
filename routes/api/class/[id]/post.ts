import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const { title, content }: { title: string; content: string } = await req
      .json();

    // get user for request
    const user = await getUser(req);
    if (!user) return new Response(null, { status: 401 });

    // get member row from class id and user
    const { data: memberData, error: memberError } = await supabase.from(
      "members",
    ).select("*").eq("user_id", user.id).eq("class_id", ctx.params.id);
    if (
      memberError || !memberData || memberData.length === 0 ||
      memberData.length > 1
    ) return new Response(null, { status: 500 });
    const member = memberData[0];

    // post question
    const { data, error } = await supabase.from("posts").insert({
      member_id: member.id,
      content,
      title,
    });
    if (error || !data) return new Response(null, { status: 500 });

    // success :)
    return new Response(null);
  },
};
