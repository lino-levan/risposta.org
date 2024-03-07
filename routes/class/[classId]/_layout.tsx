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
    .from("expanded_posts")
    .select("*")
    .eq("class_id", classId);
  if (error) return bad();

  return (
    <>
      <div class="flex pt-16 w-screen h-screen">
        <aside class="h-full w-64 border-r p-4 flex flex-col gap-2 overflow-y-auto">
          <a
            href={`/class/${classId}`}
            class="btn btn-primary"
          >
            Home
          </a>
          {ctx.state.member.role === "teacher" && (
            <a
              href={`/class/${classId}/settings`}
              class="btn btn-accent"
            >
              Manage Class
            </a>
          )}
          <a
            href={`/class/${classId}/create`}
            class="btn"
          >
            Create Post
          </a>
          <SearchablePostList classId={classId} posts={data} />
        </aside>
        <main class="flex-1 bg-base-100 flex flex-col items-center justify-center">
          <ctx.Component />
        </main>
      </div>
    </>
  );
}