import { UpdataClassForm } from "islands/UpdataClass.tsx";
import { RouteContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { getClass } from "lib/get_class.ts";
import { getMembership } from "lib/get_member.ts";
import { redirect } from "lib/response.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  const classId = parseInt(ctx.params.classId);

  const user = await getUser(req);
  if (!user) return redirect("/login");

  const member = await getMembership(user.id, classId);
  if (!member || member.role != "teacher") return redirect("./");

  const classData = await getClass(classId);

  return (
    <div class="bg-white p-4 rounded">
      <h1 class="text-4xl pb-4 font-bold">Update Class Details</h1>
      <UpdataClassForm
        classId={classId}
        name={classData?.name || "Class Name"}
      />
    </div>
  );
}
