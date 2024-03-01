import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";

// deno-lint-ignore require-await
export default async function ClassDashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  return (
    <div class="bg-green-300 p-20 rounded shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-black">
        Welcome to {ctx.state.class.name}!
      </h1>
      <p class="text-black">This is the dashboard.</p>
    </div>
  );
}