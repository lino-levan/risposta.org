import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";
import { redirect } from "lib/response.ts";
import { getUser } from "db/get_user.ts";
import { insertMember } from "db/insert_member.ts";
import { getInvite } from "db/get_invite.ts";

export default async function Join(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  const invite = await getInvite(ctx.params.code);
  if (!invite) return ctx.renderNotFound();

  const member = await insertMember(user.id, invite.class_id, "student");
  if (!member) return ctx.renderNotFound();

  return redirect(`/class/${invite.class_id}`);
}
