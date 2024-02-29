import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { PostQuestion } from "islands/PostQuestion.tsx";

// deno-lint-ignore require-await
export default async function Create(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  return (
    <div class="p-8 bg-white rounded">
      <h1 class="text-4xl pb-4 font-bold">Create Post</h1>
      <PostQuestion
        classId={ctx.params.classId}
        username={ctx.state.user.name}
        tags={ctx.state.tags.map((t) => t.tag)}
      />
    </div>
  );
}
