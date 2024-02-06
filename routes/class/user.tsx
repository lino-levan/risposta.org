import IconLogout from "icons/logout.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Dashboard(req: Request) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  return (
    <>
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
