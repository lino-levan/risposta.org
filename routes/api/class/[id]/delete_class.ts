import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers = {
  async POST(_req, ctx) {
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
