import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { deleteTag } from "db/delete_tag.ts";
import { insertTags } from "db/insert_tags.ts";
import { upsertTags } from "db/upsert_tags.ts";

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const classId = parseInt(ctx.params.id);
    const tags: { id?: number; tag: string }[] = await req.json();

    // upsert tags
    const upsertedTags = await upsertTags(
      tags.filter((tag) => tag.id !== undefined).map((tag) => ({
        id: tag.id,
        tag: tag.tag,
        class_id: classId,
      })),
    );
    if (!upsertedTags) return bad();

    // insert tags
    const insertedTags = await insertTags(
      tags.filter((tag) => tag.id === undefined).map((tag) => ({
        tag: tag.tag,
        class_id: classId,
      })),
    );
    if (!insertedTags) return bad();
    return success(JSON.stringify([...upsertedTags, ...insertedTags]));
  },
  async DELETE(req) {
    const { tag_id }: { tag_id: number } = await req.json();

    const deleted = await deleteTag(tag_id);
    if (!deleted) return bad();

    return success();
  },
};
