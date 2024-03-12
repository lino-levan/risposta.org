import { supabase } from "lib/db.ts";

export async function deletePost(post_id: number) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", post_id);
  if (error) return null;
  return true;
}
