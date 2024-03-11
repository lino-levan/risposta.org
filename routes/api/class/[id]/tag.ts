import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { deleteTag } from "db/delete_tag.ts";

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const classId = parseInt(ctx.params.id);
    const tags: { id?: number; tag: string }[] = await req.json();

    // upsert keys
    const { data: upsertData, error: upsertError } = await supabase
      .from("tags")
      .upsert(
        tags.filter((tag) => tag.id !== undefined).map((tag) => ({
          id: tag.id,
          tag: tag.tag,
          class_id: classId,
        })),
        {
          onConflict: "id",
        },
      ).select(
        "*",
      );
    if (upsertError) return bad();
    // insert keys
    const { data, error } = await supabase
      .from("tags")
      .insert(
        tags.filter((tag) => tag.id === undefined).map((tag) => ({
          tag: tag.tag,
          class_id: classId,
        })),
      ).select(
        "*",
      );
    if (error) return bad();
    return success(JSON.stringify([...upsertData, ...data]));
  },
  async DELETE(req) {
    const { tag_id }: { tag_id: number } = await req.json();

    const deleted = await deleteTag(tag_id);
    if (!deleted) return bad();

    return success();
  },
};
