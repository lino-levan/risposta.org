import { supabase } from "lib/db.ts";
import type { NoNullFields } from "lib/type_helpers.ts";

/** Get an expanded post from the database */
export async function getExpandedPost(post_id: number) {
  const { data, error } = await supabase.from("expanded_posts")
    .select("*").eq(
      "id",
      post_id,
    ).single();
  if (error) return null;
  return data as NoNullFields<typeof data>;
}
