import { FreshContext } from "$fresh/server.ts";
import { SearchablePostList } from "islands/SearchablePostList.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";
import { getClass } from "lib/get_class.ts";
import { getMembership } from "lib/get_member.ts";

export default async function Layout(req: Request, ctx: FreshContext) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  const { data, error } = await supabase
    .from("posts")
    .select("*, member_id!inner(*)")
    .eq("member_id.class_id", ctx.params.classId);
  if (error) return bad();

  //get current user member state
  const member = await getMembership(user.id, ctx.params.classId);
  if (!member) return redirect("./no_access");

  const classData = await getClass(ctx.params.classId);

  return (
    <>
      <div class="flex pt-16 w-screen h-screen">
        <aside class="h-full w-64 border-r p-4 flex flex-col gap-2">
          {member.role === "teacher" && (
            <a
              href={`/class/${ctx.params.classId}/settings`}
              class="px-4 py-2 rounded border text-center hover:bg-gray-100"
            >
              Manage Class
            </a>
          )}
          <a
            href={`/class/${ctx.params.classId}/create`}
            class="px-4 py-2 rounded border text-center hover:bg-gray-100"
          >
            Create Post
          </a>
          <SearchablePostList classId={ctx.params.classId} posts={data} />
        </aside>
        <main class="flex-1 bg-gray-100 flex flex-col items-center justify-center">
          <ctx.Component />
        </main>
      </div>
    </>
  );
}
