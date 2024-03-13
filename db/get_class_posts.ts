import { supabase } from "lib/db.ts";
import type { NoNullFields } from "lib/type_helpers.ts";

/** Get all posts for a class from the database */
export async function getClassPosts(class_id: number) {
  const { data, error } = await supabase.from("expanded_posts")
    .select("*").eq("class_id", class_id);
  if (error) return null;
  return data as NoNullFields<typeof data[0]>[];
}
