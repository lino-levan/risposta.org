import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { UpdateClassForm } from "islands/UpdateClass.tsx";

// deno-lint-ignore require-await
export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  return (
    <div class="bg-white p-4 rounded">
      <h1 class="text-4xl pb-4 font-bold">Update Class Details</h1>
      <UpdateClassForm
        classId={ctx.state.class.id}
        name={ctx.state.class.name || "Class Name"}
      />
    </div>
  );
}
