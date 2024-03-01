import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { UpdataClassForm } from "islands/UpdataClass.tsx";

// deno-lint-ignore require-await
export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  if (ctx.state.member.role === "student") return ctx.renderNotFound();
  return (
    <div class="bg-white p-4 rounded">
      <h1 class="text-4xl pb-4 font-bold">Update Class Details</h1>
      <UpdataClassForm
        classId={ctx.state.class.id}
        name={ctx.state.class.name || "Class Name"}
      />
    </div>
  );
}
