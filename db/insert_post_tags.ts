import { supabase } from "lib/db.ts";
import type { Database } from "lib/supabase_types.ts";

export async function insertPostTags(
  tags: Database["public"]["Tables"]["post_tags"]["Insert"][],
) {
  const { error, data } = await supabase.from("post_tags").insert(
    tags,
  ).select("*");
  if (error) return null;
  return data;
}
