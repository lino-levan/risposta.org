import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { insertMember } from "db/insert_member.ts";
import { insertClass } from "db/insert_class.ts";
import { z } from "zod";

const createClassSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string(),
  ai: z.boolean(),
});

// TODO(lino-levan): Validate inputs
export const handler: Handlers<unknown, APIState> = {
  // Create a new class
  async POST(req, ctx) {
    const user = ctx.state.user;
    const result = createClassSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { name, description, ai } = result.data;

    const classroom = await insertClass(name, description, ai);
    if (!classroom) return bad();

    const member = await insertMember(user.id, classroom.id, "instructor");
    if (!member) return bad();

    return success(JSON.stringify(classroom));
  },
};
