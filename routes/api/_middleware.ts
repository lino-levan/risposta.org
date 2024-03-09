import { FreshContext } from "$fresh/server.ts";
import type { APIState } from "lib/state.ts";
import { getUser } from "lib/get_user.ts";
import { unauthorized } from "lib/response.ts";

export async function handler(
  req: Request,
  ctx: FreshContext<APIState>,
) {
  if (req.url.includes("/auth/")) {
    return await ctx.next();
  }

  // The user must be authenticated for all non-auth API requests
  const user = await getUser(req);
  if (!user) return unauthorized();
  ctx.state.user = user;
  return await ctx.next();
}
