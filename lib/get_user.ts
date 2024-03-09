import { getSessionId } from "deno_kv_oauth";
import { supabase } from "lib/db.ts";

/** Given a response object, return either a user or null */
export async function getUser(request: Request) {
  const sessionId = await getSessionId(request);
  if (!sessionId) return null;

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId).single();
  if (sessionError) return null;
  const userId = session.user_id;

  const { data: user, error } = await supabase.from("users").select("*").eq(
    "id",
    userId,
  ).single();
  if (error) return null;
  return user;
}
