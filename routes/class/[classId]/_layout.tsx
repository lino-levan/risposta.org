import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import {
  type PostWithTags,
  SearchablePostList,
} from "islands/SearchablePostList.tsx";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";
import { getClassTags } from "db/get_class_tags.ts";
import { getPostTags } from "db/get_post_tags.ts";
import { getClassPosts } from "db/get_class_posts.ts";

export default async function Layout(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const classId = ctx.state.class.id;
  const posts = await getClassPosts(classId);
  if (!posts) return bad();

  const classTags = await getClassTags(ctx.state.class.id);
  if (!classTags) return ctx.renderNotFound();
  const uniqueTags = [...new Set(classTags.map((tag) => tag.tag))];

  // Get tags for each post
  const postsWithTags: PostWithTags[] = await Promise.all(
    posts.map(async (post) => {
      const postTags = await getPostTags(post.id as number);
      const tagString = postTags.map((tag) => tag.tag.tag);
      return {
        postId: post.id as number,
        tagString,
      };
    }),
  );

  return (
    <div class="flex pt-16 w-screen h-screen overflow-hidden">
      <aside class="h-full shrink-0 w-64 border-r p-4 flex flex-col gap-2 overflow-y-auto">
        <a href={`/class/${classId}`} class="btn btn-primary">
          Home
        </a>
        {ctx.state.member.role === "instructor" && (
          <a href={`/class/${classId}/settings`} class="btn btn-accent">
            Manage Class
          </a>
        )}
        <a href={`/class/${classId}/create`} class="btn">
          Create Post
        </a>
        <SearchablePostList
          classId={classId}
          posts={posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            upvotes: post.upvotes,
            downvotes: post.downvotes,
            created_at: post.created_at,
            member_id: post.member_id,
            visibility: post.visibility,
          }))}
          member={ctx.state.member}
          classTags={uniqueTags}
          postTags={postsWithTags}
        />
      </aside>
      <main class="grow bg-base-100 flex flex-col items-center justify-center">
        <ctx.Component />
      </main>
    </div>
  );
}
