import { supabase } from "lib/db.ts";

export async function deleteClass(class_id: number) {
  const { error } = await supabase.from("classes").delete().eq(
    "id",
    class_id,
  );
  if (error) return null;
  return true;
}
