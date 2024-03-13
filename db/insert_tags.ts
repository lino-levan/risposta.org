import { supabase } from "lib/db.ts";
import { TablesInsert } from "lib/supabase_types.ts";

/** Insert tags into the database */
export async function insertTags(tags: TablesInsert<"tags">[]) {
  const { data, error } = await supabase
    .from("tags")
    .insert(
      tags,
    ).select(
      "*",
    );
  if (error) return null;
  return data;
}
