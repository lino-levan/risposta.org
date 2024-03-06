import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { APIState } from "lib/state.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // Get user information
    const user = ctx.state.user;

    // Hardcoded class ID for testing (replace with actual logic)
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
