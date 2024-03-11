import { FreshContext } from "$fresh/server.ts";
import { CreateComment } from "islands/CreateComment.tsx";
import { Post } from "islands/Post.tsx";
import { CommentTree } from "components/CommentTree.tsx";
import type { PostState } from "lib/state.ts";
import { getPostVotes } from "db/get_post_votes.ts";
import { getPostComments } from "db/get_post_comments.ts";
import { getPostVoted } from "db/get_post_voted.ts";
import { getPostTags } from "db/get_post_tags.ts";
import { getPostCommentsVoted } from "db/get_post_comments_voted.ts";
import { getExpandedPost } from "db/get_expanded_post.ts";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<PostState>,
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

  const postedBy = post.anonymous ? "Anonymous" : ctx.state.user.name;

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
