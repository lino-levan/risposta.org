import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { supabase } from "lib/db.ts";
import { UpdateClassForm } from "islands/UpdateClass.tsx";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  if (ctx.state.member.role === "student") return ctx.renderNotFound();
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("class_id", ctx.state.class.id);
  if (error) return ctx.renderNotFound();
  return (
    <div class="bg-white p-4 rounded w-full max-w-md">
      <h1 class="text-2xl pb-4 font-bold w-full">Update Class Details</h1>
      <UpdateClassForm
        classId={ctx.state.class.id}
        name={ctx.state.class.name || "Class Name"}
        tags={data}
      />
    </div>
  );
}
