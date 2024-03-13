import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { deleteTag } from "db/delete_tag.ts";
import { insertTags } from "db/insert_tags.ts";
import { upsertTags } from "db/upsert_tags.ts";
import { z } from "zod";

const updateTagsSchema = z.object({
  id: z.number().optional(),
  tag: z.string(),
}).array();

const deleteTagsSchema = z.object({
  tag_id: z.number(),
});

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  // Create a new tag or update an existing tag
  async POST(req, ctx) {
    const classId = parseInt(ctx.params.id);
    const result = updateTagsSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const tags = result.data;

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
  // Delete a tag
  async DELETE(req) {
    const result = deleteTagsSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { tag_id } = result.data;

    const deleted = await deleteTag(tag_id);
    if (!deleted) return bad();

    return success();
  },
};
