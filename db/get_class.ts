import { supabase } from "lib/db.ts";

export async function getClass(class_id: number) {
  const { data: classData, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", class_id)
    .single();

  if (error) return null;
  return classData;
}
