import { supabase } from "lib/db.ts";

/** Delete a tag from the database */
export async function deleteTag(tag_id: number) {
  const { error } = await supabase.from("tags").delete().eq(
    "id",
    tag_id,
  );
  if (error) return null;
  return true;
}
