import { supabase } from "lib/db.ts";

/** Upsert a session in the database */
export async function upsertSession(id: string, user_id: number) {
  const { error, data } = await supabase.from("sessions").upsert({
    id,
    user_id,
  }).select("*");
  if (error) return null;
  return data;
}
