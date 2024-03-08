import { supabase } from "lib/db.ts";

export async function getClassTags(class_id: number) {
  const { data: tagsData, error } = await supabase
    .from("tags")
    .select("*")
    .eq("class_id", class_id);

  if (error) return null;
  return tagsData;
}
