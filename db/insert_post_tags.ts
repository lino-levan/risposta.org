import { supabase } from "lib/db.ts";
import type { TablesInsert } from "lib/supabase_types.ts";

/** Insert post tags into the database */
export async function insertPostTags(
  tags: TablesInsert<"post_tags">[],
) {
  const { error, data } = await supabase.from("post_tags").insert(
    tags,
  ).select("*");
  if (error) return null;
  return data;
}
