import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";

// deno-lint-ignore require-await
export default async function Layout(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  return (
    <>
      <header class="w-screen py-2 px-4 fixed flex items-center gap-4 bg-base-100">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <div class="ml-auto" />
        <a
          href="/class/user"
          class="w-max flex items-center justify-center gap-2 p-2 hover:bg-base-200 rounded group"
        >
          <p class="hidden md:inline">{ctx.state.user.name}</p>
          <img class="w-8 h-8 rounded-full" src={ctx.state.user.picture} />
        </a>
      </header>
      <ctx.Component />
    </>
  );
}
