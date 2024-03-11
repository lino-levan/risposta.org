import { Handlers } from "$fresh/server.ts";
import { APIState } from "lib/state.ts";
import { bad, success } from "lib/response.ts";
import { insertMember } from "db/insert_member.ts";
import { getInvite } from "db/get_invite.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const { code } = await req.json();

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
