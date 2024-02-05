import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
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
};