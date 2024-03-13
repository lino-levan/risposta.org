import { supabase } from "lib/db.ts";

/** Insert a post into the database */
export async function insertPost(
  member_id: number,
  content: string,
  title: string,
  anonymous: boolean,
  visibility: string,
  ai_answer: string | null,
) {
  const { error, data } = await supabase.from("posts")
    .insert({
      member_id,
      content,
      title,
      anonymous,
      visibility,
      ai_answer,
    }).select("*").single();
  if (error) return null;
  return data;
}
