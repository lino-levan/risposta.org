import { supabase } from "lib/db.ts";

/** Get pinned posts from the database */
export async function getPinnedPosts(class_id: number) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, member:member_id!inner(*)")
    .eq("member.class_id", class_id)
    .eq("pinned", true);

  if (error) return null;
  return data;
}
