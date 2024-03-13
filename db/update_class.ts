import { supabase } from "lib/db.ts";

/** Update a class in the database */
export async function updateClass(
  class_id: number,
  name: string | undefined,
  description: string | undefined,
  ai: boolean | undefined,
) {
  const { error, data } = await supabase.from("classes").update({
    name,
    description,
    ai,
  }).eq(
    "id",
    class_id,
  ).select("*");
  if (error) return null;
  return data;
}
