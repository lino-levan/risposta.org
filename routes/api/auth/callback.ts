import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "deno_kv_oauth";
import { oAuthConfig } from "lib/auth.ts";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";

/** Properties guaranteed to exist on a google user */
interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

/** Get the google user JSON */
async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const googleUserReq = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    },
  );
  return await googleUserReq.json();
}

// Handle the callback (redirect to dashboard)
export const handler: Handlers = {
  async GET(request) {
    const { response, sessionId, tokens } = await handleCallback(
      request,
      oAuthConfig,
    );
    const googleUser = await getGoogleUser(tokens.accessToken);

    // Upsert user
    const { data: user, error: userError } = await supabase.from("users")
      .upsert({
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
      }, { onConflict: "email" }).select().single();
    if (userError) return bad("error creating user record");

    // upsert session
    const { error: sessionError } = await supabase.from("sessions").upsert({
      id: sessionId,
      user_id: user.id,
    }).select();
    if (sessionError) return bad("error creating session record");

    return response;
  },
};
