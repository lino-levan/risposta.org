import { Handlers } from "$fresh/server.ts";
import { updateClass } from "db/update_class.ts";
import { deleteClass } from "db/delete_class.ts";
import { bad, success } from "lib/response.ts";
import { z } from "zod";

const classSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  ai: z.boolean().optional(),
});

// TODO(lino-levan): Validate inputs
export const handler: Handlers = {
  // Update the class settings
  async PATCH(req, ctx) {
    const classId = parseInt(ctx.params.id);
    const result = classSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());

    const classroom = await updateClass(
      classId,
      result.data.name,
      result.data.description,
      result.data.ai,
    );
    if (!classroom) return bad();

    return success();
  },
  // Delete the class
  async DELETE(_req, ctx) {
    const classId = parseInt(ctx.params.id);

    const deleted = await deleteClass(classId);
    if (!deleted) return bad();

    return success();
  },
};
