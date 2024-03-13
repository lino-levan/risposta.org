import { Handlers } from "$fresh/server.ts";
import { APIState } from "lib/state.ts";
import { bad, success } from "lib/response.ts";
import { insertMember } from "db/insert_member.ts";
import { getInvite } from "db/get_invite.ts";
import { z } from "zod";

const joinClassSchema = z.object({
  code: z.string().min(4).max(40),
});

// TODO(lino-levan): Validate inputs
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const result = joinClassSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { code } = result.data;

    const invite = await getInvite(code);
    if (!invite) return bad();

    const member = await insertMember(
      ctx.state.user.id,
      invite.class_id,
      "student",
    );
    if (!member) return bad();

    return success();
  },
};
