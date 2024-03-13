import { supabase } from "lib/db.ts";
import { TablesUpdate } from "lib/supabase_types.ts";

/** Update a post in the database */
export async function updatePost(
  post_id: number,
  post: TablesUpdate<"posts">,
) {
  const { error, data } = await supabase
    .from("posts")
    .update(post)
    .eq("id", post_id)
    .select("*");
  if (error) return null;
  return data;
}
