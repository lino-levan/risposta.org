import IconLogout from "icons/logout.tsx";
import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";

// deno-lint-ignore require-await
export default async function Dashboard(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  const user = ctx.state.user;

  return (
    <>
      <div class="w-screen h-screen flex flex-col justify-center items-center gap-8">
        <h1 class="text-5xl">User Profile</h1>
        <div class="flex items-center gap-2 p-4">
          <img src={user.picture} />
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl">{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
        <a class="btn btn-error" href="/api/auth/logout">
          <IconLogout /> Log out
        </a>
      </div>
    </>
  );
}
