import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";

export const handler: Handlers = {
  //change TA/student role
  async PATCH(req, _ctx) {
    const target = await req.json();
    const { error } = await supabase.from("members")
      .update({ role: target.role })
      .eq("id", target.id)
      .select();

    if (error) return bad();
    return success();
  },
  //remove from class
  async DELETE(_req, _ctx) {
    const target = await _req.json();
    const { error } = await supabase.from("members")
      .delete()
      .eq("id", target.id);

    if (error) return bad();
    return success();
  },
};
