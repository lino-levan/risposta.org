import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, success, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const postId = parseInt(ctx.params.id);
    const { title, content }: { title: string; content: string } = await req
      .json();

    const user = await getUser(req);
    if (!user) return unauthorized();

    // edit the post
    const { error } = await supabase.from("posts")
      .update({
        title,
        content,
      })
      .eq("id", postId);
    if (error) return bad();

    return success();
  },
};
