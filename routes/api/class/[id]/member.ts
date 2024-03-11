import { Handlers } from "$fresh/server.ts";
import { deleteMember } from "db/delete_member.ts";
import { updateMember } from "db/update_member.ts";
import { bad, success } from "lib/response.ts";

export const handler: Handlers = {
  /** Change member role */
  async PATCH(req, _ctx) {
    const { id, role } = await req.json();

    const member = await updateMember(id, role);
    if (!member) return bad();

    return success();
  },
  /** Remove member from class */
  async DELETE(req, _ctx) {
    const { id } = await req.json();

    const deleted = await deleteMember(id);
    if (!deleted) return bad();

    return success();
  },
};
