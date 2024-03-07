import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { getClassTags } from "lib/get_class_tags.ts";
import { CreatePost } from "islands/CreatePost.tsx";

export default async function Create(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const tags = await getClassTags(ctx.state.class.id);
  if (!tags) return ctx.renderNotFound();

  return (
    <div class="p-8 bg-base-200 rounded-lg">
      <h1 class="text-4xl pb-4 font-bold">Create Post</h1>
      <CreatePost
        classId={ctx.params.classId}
        username={ctx.state.user.name}
        tags={[...new Set(tags.map((t) => t.tag))]}
      />
    </div>
  );
}
