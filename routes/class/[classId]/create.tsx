import { PostQuestion } from "islands/PostQuestion.tsx";
import { RouteContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";

// This needs to be an async function because of how fresh does routing
// deno-lint-ignore require-await
export default async function Create(req: Request, ctx: RouteContext) {
  const currentUser = await getUser(req);

  return (
    <div class="p-8 bg-white rounded">
      <h1 class="text-4xl pb-4 font-bold">Create Post</h1>
      <PostQuestion classId={ctx.params.classId} username={currentUser?.name} />
    </div>
  );
}
