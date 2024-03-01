import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";

// deno-lint-ignore require-await
export default async function Layout(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  return (
    <>
      <header class="w-screen py-2 px-4 shadow fixed flex items-center gap-4 bg-green-400">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <div class="ml-auto" />
        <a
          href="/class/user"
          class="w-40 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded group"
        >
          <p>{ctx.state.user.name}</p>
          <img class="w-8 h-8 rounded-full" src={ctx.state.user.picture} />
        </a>
      </header>
      <ctx.Component />
    </>
  );
}
