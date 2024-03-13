import { FreshContext } from "$fresh/server.ts";
import IconSparkles from "icons/sparkles.tsx";
import IconAlertTriangle from "icons/alert-triangle.tsx";
import type { ClassState } from "lib/state.ts";
import { CreateComment } from "islands/CreateComment.tsx";
import { Post } from "islands/Post.tsx";
import { CommentTree } from "components/CommentTree.tsx";
import { getPostVotes } from "db/get_post_votes.ts";
import { getPostComments } from "db/get_post_comments.ts";
import { getPostVoted } from "db/get_post_voted.ts";
import { getPostTags } from "db/get_post_tags.ts";
import { getPostCommentsVoted } from "db/get_post_comments_voted.ts";
import { getExpandedPost } from "db/get_expanded_post.ts";
import { getReadableTime } from "lib/readable_time.ts";
import { render } from "gfm";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  const postId = parseInt(ctx.params.postId);

  const [post, votes, comments, voted, tags, comments_voted] = await Promise
    .all([
      getExpandedPost(postId),
      getPostVotes(postId),
      getPostComments(postId),
      getPostVoted(ctx.state.member.id, postId),
      getPostTags(postId),
      getPostCommentsVoted(postId),
    ]);
  if (!post) return ctx.renderNotFound();

  const postedBy = post.anonymous ? "Anonymous" : post.author_name;

  return (
    <div class="w-full h-full p-4 flex flex-col overflow-hidden overflow-y-auto">
      <Post
        pinned={post.pinned}
        classId={ctx.state.class.id}
        isAuthor={post.member_id === ctx.state.member.id}
        isInstructor={ctx.state.member.role !== "student"}
        createdAt={post.created_at}
        votes={votes}
        voted={voted}
        postId={post.id}
        title={post.title}
        content={post.content}
        tags={tags}
        postedBy={postedBy}
      />
      <CreateComment post_id={ctx.params.postId} classId={ctx.params.classId} />
      {post.ai_answer !== null && (
        <div class="border-l-2 pl-12 p-4 flex flex-col gap-2">
          <div class="text-xs flex items-center gap-1">
            <IconSparkles class="w-4 h-4" />
            <span class="text-black font-bold">
              AI Answer
            </span>
            <span class="text-zinc-400">
              · {getReadableTime(post.created_at)}
            </span>
          </div>
          <div
            class="markdown-body"
            dangerouslySetInnerHTML={{ __html: render(post.ai_answer) }}
          />
          <p class="text-yellow-500 bg-yellow-100 border border-yellow-500 p-2 rounded-lg text-sm w-max flex gap-2 items-center">
            <IconAlertTriangle class="w-4 h-4" />
            AI generated answer may be false or misleading. Please fact-check
            any AI answer before taking action.
          </p>
        </div>
      )}
      {comments.filter((comment) => !comment.parent_id).sort((a, b) =>
        (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      ).map((comment) => (
        <CommentTree
          comment={comment}
          comments={comments}
          comments_voted={comments_voted}
          class_id={ctx.state.class.id}
          post_id={post.id}
          member={ctx.state.member}
        />
      ))}
    </div>
  );
}
