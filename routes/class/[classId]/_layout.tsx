import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { SearchablePostList } from "islands/SearchablePostList.tsx";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";

export default async function Layout(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const classId = ctx.state.class.id;

  const { data, error } = await supabase
    .from("posts")
    .select("*, member_id!inner(*)")
    .eq("member_id.class_id", classId);
  if (error) return bad();

  return (
    <>
      <div class="flex pt-16 w-screen h-screen">
        <aside class="h-full w-64 border-r p-4 flex flex-col gap-2">
          <a
            href={`/class/${classId}`}
            class="px-4 py-2 rounded border text-center hover:bg-gray-100"
          >
            Home
          </a>
          {ctx.state.member.role === "teacher" && (
            <a
              href={`/class/${classId}/settings`}
              class="px-4 py-2 rounded border text-center hover:bg-gray-100"
            >
              Manage Class
            </a>
          )}
          <a
            href={`/class/${classId}/create`}
            class="px-4 py-2 rounded border text-center hover:bg-gray-100"
          >
            Create Post
          </a>
          <SearchablePostList classId={classId} posts={data} />
        </aside>
        <main class="flex-1 bg-gray-100 flex flex-col items-center justify-center">
          <ctx.Component />
        </main>
      </div>
    </>
  );
}
