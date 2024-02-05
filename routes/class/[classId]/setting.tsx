import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";
import { UpdataClassForm } from "../../../islands/UpdataClass.tsx";
import { RouteContext } from "$fresh/server.ts";
import { getClass } from "lib/get_class.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  const user = await getUser(req);
  if (!user) return redirect("/login");
  const classData = await getClass(ctx.params.classId);

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
        <UpdataClassForm
          classId={ctx.params.classId}
          name={classData?.name || "Class Name"}
        />
      </div>
    </>
  );
}
