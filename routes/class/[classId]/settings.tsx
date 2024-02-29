import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { UpdateClassForm } from "islands/UpdateClass.tsx";

// deno-lint-ignore require-await
export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  if (ctx.state.member.role === "student") return ctx.renderNotFound();
  return (
    <div class="bg-white p-4 rounded w-full max-w-md">
      <h1 class="text-2xl pb-4 font-bold w-full">Update Class Details</h1>
      <UpdateClassForm
        classId={ctx.state.class.id}
        name={ctx.state.class.name || "Class Name"}
      />
    </div>
  );
}
