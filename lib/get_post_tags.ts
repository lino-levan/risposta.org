import { supabase } from "lib/db.ts";

export type PostTag = {
  id: number;
  created_at: string;
  post_id: number;
  tag: {
    id: number;
    tag: string;
    class_id: number;
    created_at: string;
  };
};

export async function getPostTags(post_id: number) {
  const { data: tagData } = await supabase.from("post_tags").select(
    "*, tag:tag_id!inner(*)",
  ).eq("post_id", post_id);
  return tagData as unknown as PostTag[];
}
