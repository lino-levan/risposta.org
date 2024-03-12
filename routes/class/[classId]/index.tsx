import { FreshContext } from "$fresh/server.ts";
import { render } from "gfm";
import { bad } from "lib/response.ts";
import { getPinnedPosts } from "db/get_pinned_posts.ts";
import type { ClassState } from "lib/state.ts";

export default async function ClassDashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const posts = await getPinnedPosts(ctx.state.class.id);
  if (!posts) return bad();

  return (
    <div class="bg-base-200 p-20 rounded max-w-screen-sm">
      <h1 class="text-2xl font-bold">
        Welcome to {ctx.state.class.name}!
      </h1>

      <p>
        {ctx.state.class.description}
      </p>

      {posts.length > 0 && (
        <h1 className="font-bold text-xl mt-6 mb-6">
          Pinned Posts
        </h1>
      )}
      {posts.map((item) => (
        <div class="flex flex-col gap-2 justify-between">
          <h2 class="text-xl">{item.title}</h2>
          <div
            class="markdown-body"
            dangerouslySetInnerHTML={{ __html: render(item.content) }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
