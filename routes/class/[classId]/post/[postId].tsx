import { RouteContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";
import { supabase } from "lib/db.ts";
import ArrowUp from "icons/arrow-big-up.tsx";
import { bad } from "lib/response.ts";
import ArrowUpFilled from "icons/arrow-big-up-filled.tsx";
import { EditIsland } from "islands/edit.tsx"

export default async function Dashboard(req: Request, ctx: RouteContext) {
  // TODO(lino-levan): Clean up
  const user = await getUser(req);
  if (!user) return redirect("/login");
  const { data: postData, error } = await supabase.from("posts").select("*").eq(
    "id",
    ctx.params.postId,
  );
  if (error) throw ":(";
  const post = postData[0];

  //(Matt) - Pulling comments from supabase?? Waiting for comment functionality.
  /*
  const { data} = await supabase
  .from('posts')
  .select(`
    *,
    member_id!inner(*),
    comments:comments!inner(*)
  `)
  .eq('member_id.class_id', 10);

  if (error) {
  console.error('Error: ', error);
} else {
  console.log('Data: ', data);
}
*/

  const { count: upvoteCount } = await supabase.from("votes").select("*", {
    count: "exact",
  }).eq("upvote", true);
  const { count: downvoteCount } = await supabase.from("votes").select("*", {
    count: "exact",
  }).eq("upvote", false);
  const votes = (upvoteCount ?? 0) - (downvoteCount ?? 0);

  return (
    <>
      <header class="w-screen py-2 px-4 shadow fixed flex items-center gap-4">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <div class="ml-auto" />
        <a
          href="/dashboard/user"
          class="w-40 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded group"
        >
          <p>{user.name}</p>
          <img class="w-8 h-8 rounded-full" src={user.picture} />
        </a>
      </header>
      <div class="w-screen h-screen flex pt-16">
        <div class="h-full w-64 border-r p-4 flex flex-col gap-4">
          <a
            href={`/class/${ctx.params.classId}/create`}
            class="px-4 py-2 rounded border text-center"
          >
            Create Post
          </a>
          <div class="flex flex-col gap-4">
            QUESTIONS HERE
          </div>
        </div>
        <div class="h-full flex-grow p-4 flex flex-col gap-2">
          <div class="flex items-center gap-4">
            <div class="flex items-center flex-col w-4">
              <button>
                <ArrowUp />
              </button>
              <p>{votes}</p>
              <button>
                <ArrowUp class="rotate-180" />
              </button>
            </div>
            <div class="flex flex-col">
              <h2 class="text-zinc-400 text-xs">
                Posted by Lino Le Van 7 hours ago
              </h2>
              <h1 class="font-bold text-3xl">{post.title}</h1>
              <div class="flex gap-2 pt-2">
                <p class="text-xs bg-black text-white px-2 rounded">Lab 1</p>
                <p class="text-xs bg-black text-white px-2 rounded">Lab 2</p>
              </div>
            </div>
          </div>
          <p class="pl-8">{post.content}</p>
          <EditIsland></EditIsland>
        </div>
      </div>
    </>
  );
}
