import { supabase } from "lib/db.ts";

export async function deleteInvite(code: string) {
  const { error } = await supabase.from("invites").delete().eq(
    "code",
    code,
  );
  if (error) return null;
  return true;
}
