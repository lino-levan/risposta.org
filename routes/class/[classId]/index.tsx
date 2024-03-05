import { FreshContext } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";
import { RemoveFromFAQ } from "islands/FAQ/RemoveFromFAQ.tsx";
import type { ClassState } from "lib/state.ts";

export default async function ClassDashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, member_id!inner(*)")
    .eq("member_id.class_id", ctx.params.classId)
    .eq("faq", true);
  if (error) return bad();

  return (
    <div class="bg-white p-20 rounded">
      <h1 class="text-2xl font-bold">
        Welcome to {ctx.state.class.name}!
      </h1>

      {data.length > 0 && (
        <h1 className="font-bold text-xl mt-6 mb-6">
          Frequently Asked Questions
        </h1>
      )}
      {data.map((item) => (
        <a
          href={`/class/${ctx.params.classId}/post/${item.id}`}
          class="block py-2 px-3 mb-2 rounded border"
        >
          <div class="flex flex-col gap-2 justify-between">
            <h2 class="text-xl">{item.title}</h2>
            <p>{item.content}</p>
            {ctx.state.member.role !== "student" && (
              <RemoveFromFAQ
                postId={item.id}
                classId={ctx.params.classId}
              />
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
