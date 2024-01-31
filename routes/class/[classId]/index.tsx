import { RouteContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

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
        <div class="h-full flex-grow p-4">
          <p>This is the class main page</p>
        </div>
      </div>
    </>
  );
}
