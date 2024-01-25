import IconLogout from "icons/logout.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/redirect.ts";

export default async function Dashboard(req: Request) {
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
      <div class="w-screen h-screen flex flex-col justify-center items-center gap-8">
        <h1 class="text-5xl">User Profile</h1>
        <div class="flex items-center gap-2 p-4">
          <img src={user.picture} />
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl">{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
        <a class="border px-4 py-2 flex gap-2" href="/api/auth/logout">
          <IconLogout /> Logout
        </a>
      </div>
    </>
  );
}
