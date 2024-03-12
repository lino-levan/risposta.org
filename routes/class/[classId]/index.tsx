import { FreshContext } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";
import type { ClassState } from "lib/state.ts";

export default async function ClassDashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, member_id!inner(*)")
    .eq("member_id.class_id", ctx.params.classId)
    .eq("pinned", true);
  if (error) return bad();

  return (
    <div class="bg-base-200 p-20 rounded max-w-screen-sm">
      <h1 class="text-2xl font-bold text-center">
        Welcome to {ctx.state.class.name}!
      </h1>
      <h2 class="text-2xl font-bold text-center">
        Class ID: {ctx.state.class.id}
      </h2>
      

      {data.length > 0 && (
        <h1 className="font-bold text-xl mt-6 mb-6">
          Frequently Asked Questions
        </h1>
      )}
      {data.map((item) => (
        <div class="flex flex-col gap-2 justify-between">
          <h2 class="text-xl">{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
