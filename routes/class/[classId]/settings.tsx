import { UpdataClassForm } from "islands/UpdataClass.tsx";
import { RouteContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { getClass } from "lib/get_class.ts";
import { getMembership } from "lib/get_member.ts";
import { redirect } from "lib/response.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  const member = await getMembership(user.id, ctx.params.classId);
  if (!member || member.role != "teacher") return redirect("./");

  const classData = await getClass(ctx.params.classId);

  return (
    <div class="bg-white p-4 rounded">
      <h1 class="text-4xl pb-4 font-bold">Update Class Details</h1>
      <UpdataClassForm
        classId={ctx.params.classId}
        name={classData?.name || "Class Name"}
      />
    </div>
  );
}