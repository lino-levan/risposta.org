import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";

export const handler: Handlers = {
  async POST(req) {
    // Get user information
    const user = await getUser(req);
    if (!user) return new Response(null, { status: 401 });

    // Hardcoded class ID for testing (replace with actual logic)
    //const class_id = 411; // Replace this with your actual class ID or logic to obtain class ID
    const { class_id } = await req.json();

    // Insert new member
    const { error: memberError } = await supabase.from("members").insert({
      user_id: user.id,
      role: "student", // Assuming the role is 'student' for those joining
      class_id: class_id,
    });

    // Handle member insertion errors
    if (memberError) {
      console.error(memberError);
      throw memberError;
    }

    // Return success response
    return new Response(JSON.stringify({ success: true }));
  },
};
