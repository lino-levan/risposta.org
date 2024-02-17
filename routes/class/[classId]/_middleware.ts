import { FreshContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { getMembership } from "lib/get_member.ts";
import { redirect } from "lib/response.ts";

export const handler = [
  async function classAccess(req: Request, ctx: FreshContext) {
    const user = await getUser(req);
    if (!user) return redirect("/login");

    //not a member of this class
    const member = await getMembership(user.id, ctx.params.classId);
    if (!member) return redirect("./no_access");

    return await ctx.next();
  },
];
