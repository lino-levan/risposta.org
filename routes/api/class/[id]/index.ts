import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad, success } from "lib/response.ts";
import { z } from "zod";

const classSchema = z.object({
  name: z.string().min(1).max(100),
});

// TODO(lino-levan): Validate inputs
export const handler: Handlers = {
  async PATCH(req, ctx) {
    const result = classSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { error } = await supabase.from("classes").update(result.data).eq(
      "id",
      ctx.params.id,
    ).select();

    if (error) return bad();
    return success();
  },
  async DELETE(_req, ctx) {
    const { error } = await supabase.from("classes").delete().eq(
      "id",
      ctx.params.id,
    );

    if (error) return bad();
    return success();
  },
};
