import { supabase } from "lib/db.ts";
import { TablesUpdate } from "lib/supabase_types.ts";

/** Upsert tags in the database */
export async function upsertTags(tags: TablesUpdate<"tags">[]) {
  const { data, error } = await supabase
    .from("tags")
    .update(
      // I know this works, but supabase does not making typing easy
      // deno-lint-ignore no-explicit-any
      tags as any,
      // deno-lint-ignore no-explicit-any
      { onConflict: "id" } as any,
    ).select(
      "*",
    );
  if (error) return null;
  return data;
}
