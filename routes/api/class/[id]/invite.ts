import type { Handlers } from "$fresh/server.ts";
import type { APIState } from "lib/state.ts";
import { insertInvite } from "db/insert_invite.ts";
import { bad, success } from "lib/response.ts";

// TODO(lino-levan): Validate input
export const handler: Handlers<unknown, APIState> = {
  async POST(_, ctx) {
    const classId = parseInt(ctx.params.id);

    // Randomly generate code
    const code = [...Array(10)].map(() => Math.random().toString(36)[2]).join(
      "",
    );

    const invite = await insertInvite(code, classId);
    if (!invite) return bad();

    return success(code);
  },
};
