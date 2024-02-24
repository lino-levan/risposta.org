import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";

// deno-lint-ignore require-await
export default async function ClassDashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  return (
    <div class="bg-white p-20 rounded">
      <h1 class="text-2xl font-bold mb-4">
        Welcome to {ctx.state.class.name}!
      </h1>
      <p class="text-gray-500">This is the dashboard.</p>
    </div>
  );
}
