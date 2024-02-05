import { supabase } from "lib/db.ts";

export async function getMembership(user_id: number, class_id: string) {
  const { data: memeberData, error } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", user_id)
    .eq("class_id", class_id)
    .single();

  //console.log(memeberData);
  if (error || !memeberData) return null;
  return memeberData;
}
