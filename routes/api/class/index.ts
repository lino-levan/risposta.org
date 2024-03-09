import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const user = ctx.state.user;

    //insert new class
    const { name, description, enableAI } = await req.json();
    const { error, data: classroom } = await supabase.from("classes").insert({
      name,
      description,
      ai: enableAI,
    }).select("*").single();
    if (error) return bad();

    //insert new member
    const { error: memberError } = await supabase.from("members").insert({
      user_id: user.id,
      role: "instructor",
      class_id: classroom.id,
    }).select("*");

    if (memberError) return bad();

    return success(JSON.stringify(classroom));
  },
};
