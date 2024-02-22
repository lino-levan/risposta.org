import { supabase } from "lib/db.ts";

export async function getClass(class_id: number) {
  const { data: classData, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", class_id)
    .single();

  //console.log("Class id:", class_id);
  if (error || !classData) return null;
  return classData;
}
