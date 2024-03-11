import { supabase } from "lib/db.ts";

export async function insertPost(
  member_id: number,
  content: string,
  title: string,
  anonymous: boolean,
  visibility: string,
) {
  const { error, data } = await supabase.from("posts")
    .insert({
      member_id,
      content,
      title,
      anonymous,
      visibility,
    }).select("*").single();
  if (error) return null;
  return data;
}
