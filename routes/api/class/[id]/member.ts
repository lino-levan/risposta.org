import { Handlers } from "$fresh/server.ts";
import { deleteMember } from "db/delete_member.ts";
import { updateMember } from "db/update_member.ts";
import { bad, success } from "lib/response.ts";
import { z } from "zod";

const updateMemberSchema = z.object({
  id: z.number(),
  role: z.enum(["instructor", "TA", "student"]),
});

const deleteMemberSchema = z.object({
  id: z.number(),
});

export const handler: Handlers = {
  /** Change member role */
  async PATCH(req, _ctx) {
    const result = updateMemberSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { id, role } = result.data;

    const member = await updateMember(id, role);
    if (!member) return bad();

    return success();
  },
  /** Remove member from class */
  async DELETE(req, _ctx) {
    const result = deleteMemberSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { id } = result.data;

    const deleted = await deleteMember(id);
    if (!deleted) return bad();

    return success();
  },
};
