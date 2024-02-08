import { PostQuestion } from "islands/PostQuestion.tsx";
import { RouteContext } from "$fresh/server.ts";

export default async function Create(req: Request, ctx: RouteContext) {
  return (
    <div class="p-8 bg-white rounded">
      <h1 class="text-4xl pb-4 font-bold">Create Post</h1>
      <PostQuestion classId={ctx.params.classId} />
    </div>
  );
}
