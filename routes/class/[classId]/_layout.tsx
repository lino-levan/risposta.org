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
      <header class="w-screen py-2 px-4 shadow fixed flex items-center gap-4 bg-white">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <span class="relative group">
          <a
            href={`/class/${classId}`}
            class="ml-2 font-bold hover:text-gray-700"
          >
            | {ctx.state.class.name}
          </a>
          <div class="absolute hidden group-hover:block bg-white shadow-md mt-1">
            {ctx.state.member.role === "teacher" && (
              <a
                href={`/class/${classId}/settings`}
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
            )}
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Quit class (not implemented)
            </a>
            More features to be added
          </div>
        </span>
        <div class="ml-auto" />
        <a
          href="/class/user"
          class="w-40 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded group"
        >
          <p>{ctx.state.user.name}</p>
          <img class="w-8 h-8 rounded-full" src={ctx.state.user.picture} />
        </a>
      </header>
      <div class="flex pt-16 w-screen h-screen">
        <aside class="h-full w-64 border-r p-4 flex flex-col gap-2">
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
