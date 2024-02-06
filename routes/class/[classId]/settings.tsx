import { UpdataClassForm } from "../../../islands/UpdataClass.tsx";
import { RouteContext } from "$fresh/server.ts";
import { getClass } from "lib/get_class.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
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
