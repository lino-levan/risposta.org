import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function NoAccess(req: Request) {
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
      <div class="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <p>Sorry, you do not have access to the current class</p>
        <a
          href="/dashboard"
          class="px-4 py-2 rounded border text-center"
        >
          Return to your main page
        </a>
      </div>
    </>
  );
}
