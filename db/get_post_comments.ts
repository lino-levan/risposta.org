import { supabase } from "lib/db.ts";
import type { NoNullFields } from "lib/type_helpers.ts";
import type { Database } from "lib/supabase_types.ts";

type Comments = Database["public"]["Views"]["expanded_comments"]["Row"];
export type ExpandedComment =
  & NoNullFields<Omit<Comments, "parent_id">>
  & Pick<Comments, "parent_id">;

export async function getPostComments(post_id: number) {
  const { data: comments } = await supabase
    .from("expanded_comments")
    .select("*")
    .eq("post_id", post_id);

  return comments as unknown as ExpandedComment[];
}
