import { supabase } from "lib/db.ts";

/** Upsert a user in the database */
export async function upsertUser(name: string, email: string, picture: string) {
  const { data, error } = await supabase.from("users")
    .upsert({
      name,
      email,
      picture,
    }, { onConflict: "email" }).select().single();
  if (error) return null;
  return data;
}
