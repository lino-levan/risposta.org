import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { bad, success, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req) {
    //get user
    const user = await getUser(req);
    if (!user) return unauthorized();

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
      role: "teacher",
      class_id: classroom.id,
    }).select("*");

    if (memberError) return bad();

    return success(JSON.stringify(classroom));
  },
};
