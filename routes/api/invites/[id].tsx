import { Handlers } from "$fresh/server.ts";
import { deleteInvite } from "db/delete_invite.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";

export const handler: Handlers<unknown, APIState> = {
  async DELETE(_, ctx) {
    const inviteId = ctx.params.id;

    const deleted = await deleteInvite(inviteId);
    if (!deleted) return bad();

    return success();
  },
};
