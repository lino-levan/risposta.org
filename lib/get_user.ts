import { getSessionId } from "deno_kv_oauth";
import { supabase } from "./db.ts";

/** Given a response object, return either a user or null */
export async function getUser(request: Request) {
  const sessionId = await getSessionId(request);
  if (!sessionId) return null;

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId);
  if (sessionError || !session || session.length === 0) return null;
  const userId = session[0].user_id;
  const { data: user, error } = await supabase.from("users").select("*").eq(
    "id",
    userId,
  );
  if (error || !user || user.length === 0) return null;
  return user[0];
}
