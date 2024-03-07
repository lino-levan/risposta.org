import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers = {
  async PATCH(req, ctx) {
    const { name } = await req.json();
    const { error } = await supabase.from("classes").update({
      name,
    }).eq("id", ctx.params.id).select();

    if (error) {
      console.error(error);
      return new Response("Error updating class info", { status: 500 });
    } else {
      return new Response(null);
    }
  },
  async DELETE(_req, ctx) {
    const { error } = await supabase.from("classes").delete().eq(
      "id",
      ctx.params.id,
    );

    if (error) {
      console.error(error);
      return new Response("Failed to delete the class.", { status: 500 });
    } else {
      return new Response(null);
    }
  },
};
