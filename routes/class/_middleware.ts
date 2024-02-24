import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  const user = await getUser(req);
  if (!user) return redirect("/login");
  ctx.state.user = user;
  return await ctx.next();
}
