import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success, unauthorized } from "lib/response.ts";
import { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const classId = parseInt(ctx.params.id);
    const tags: { id?: number; tag: string }[] = await req.json();
    const user = ctx.state.user;

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
    // TODO(lino-levan): Validate input
    const { tagId }: { tagId: string } = await req.json();

    const { error } = await supabase.from("tags")
      .delete()
      .eq("id", tagId);

    if (error) return bad();
    return success();
  },
};
