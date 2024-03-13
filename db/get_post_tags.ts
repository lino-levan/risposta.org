import { supabase } from "lib/db.ts";
import type { Tables } from "lib/supabase_types.ts";

export type PostTag = Tables<"post_tags"> & {
  tag: Tables<"tags">;
};

/** Get all tags for a post */
export async function getPostTags(post_id: number) {
  const { data: tagData } = await supabase.from("post_tags").select(
    "*, tag:tag_id!inner(*)",
  ).eq("post_id", post_id);
  return tagData as unknown as PostTag[];
}
