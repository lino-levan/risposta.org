import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers = {
  async PATCH(req, ctx) {
    const { name } = await req.json();
    const { error } = await supabase.from("classes").update({
      name,
    }).eq("id", ctx.params.id).select();

    if (error) return bad();
    return success();
  },
  async DELETE(_req, ctx) {
    const { error } = await supabase.from("classes").delete().eq(
      "id",
      ctx.params.id,
    );

    if (error) return bad();
    return success();
  },
};
