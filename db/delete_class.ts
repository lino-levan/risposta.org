import { supabase } from "lib/db.ts";

/** Delete a class from the database */
export async function deleteClass(class_id: number) {
  const { error } = await supabase.from("classes").delete().eq(
    "id",
    class_id,
  );
  if (error) return null;
  return true;
}
