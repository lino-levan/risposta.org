import { supabase } from "lib/db.ts";

export async function deleteTag(tag_id: number) {
  const { error } = await supabase.from("tags").delete().eq(
    "id",
    tag_id,
  );
  if (error) return null;
  return true;
}
