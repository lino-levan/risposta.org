import { FreshContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";
import { getMembership } from "lib/get_member.ts";
import { RemoveFromFAQ } from "islands/FAQ/RemoveFromFAQ.tsx";
import type { ClassState } from "lib/state.ts";

export default async function ClassDashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  const { data, error } = await supabase
    .from("posts")
    .select("*, member_id!inner(*)")
    .eq("member_id.class_id", ctx.params.classId);
  if (error) return bad();

  const classId = Number(ctx.params.classId);
  //get current user member state
  const member = await getMembership(user.id, classId);
  if (!member) return redirect("./no_access");

  return (
    <div class="bg-white p-20 rounded">
      <h1 class="text-2xl font-bold mb-8">
        Welcome to {ctx.state.class.name}!
      </h1>

      <h1 className="font-bold text-3xl mb-6">Frequently Asked Questions</h1>
      {data.map((item) => (
        item.faq
          ? (
            <a
              href={`/class/${ctx.params.classId}/post/${item.id}`}
              class="block py-2 px-3 mb-2 rounded rounded border"
            >
              <div class="flex justify-between">
                <h2 class="text-xl">{item.title}</h2>
                <RemoveFromFAQ
                  postId={item.id}
                  classId={ctx.params.classId}
                />
              </div>
            </a>
          )
          : null
      ))}
    </div>
  );
}
