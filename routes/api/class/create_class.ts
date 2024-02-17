import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";

export const handler: Handlers = {
  async POST(req) {
    //get user
    const user = await getUser(req);
    if (!user) return new Response(null, { status: 401 });

    //insert new class
    const { name, GPT, access } = await req.json();
    const { error } = await supabase.from("classes").insert({ name });
    //const { error } = await supabase.from("classes").insert({ name, enableGPT: GPT, access: access});

    //get class_id (somehow I can't get classData from line 13)
    const { data: classData, error: classError } = await supabase.from(
      "classes",
    )
      .select("*")
      .eq("name", name)
      .order("created_at", { ascending: false })
      .limit(1);

    if (
      classError || !classData || classData.length === 0 || classData.length > 1
    ) {
      return new Response(null, { status: 500 });
    }

    if (error) throw error;
    const classroom = classData[0];

    //insert new member
    const { error: memberError } = await supabase.from("members").insert({
      user_id: user.id,
      role: "teacher",
      class_id: classroom.id,
    });

    if (memberError) {
      console.error(memberError);
      throw memberError;
    }

    return new Response(JSON.stringify(classroom));
  },
};
