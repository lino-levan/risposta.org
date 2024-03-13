import { supabase } from "lib/db.ts";

/** Insert a class into the database */
export async function insertClass(
  name: string,
  description: string,
  ai: boolean,
) {
  const { error, data } = await supabase.from("classes").insert({
    name,
    description,
    ai,
  }).select("*").single();
  if (error) return null;
  return data;
}
