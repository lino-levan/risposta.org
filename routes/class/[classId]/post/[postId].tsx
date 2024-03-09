import { FreshContext } from "$fresh/server.ts";
import { CreateComment } from "islands/CreateComment.tsx";
import { Post } from "islands/Post.tsx";
import { CommentTree } from "components/CommentTree.tsx";
import type { PostState } from "lib/state.ts";
import { getPostVotes } from "lib/get_post_votes.ts";
import { getPostComments } from "lib/get_post_comments.ts";
import { getPostVoted } from "lib/get_post_voted.ts";
import { getPostTags } from "lib/get_post_tags.ts";
import { getPostCommentsVoted } from "lib/get_post_comments_voted.ts";
import { supabase } from "lib/db.ts";
import { getReadableTime } from "lib/readable_time.ts";
import { Vote } from "islands/Vote.tsx";
import { CommentVote } from "islands/CommentVote.tsx";
import { PostComment } from "islands/PostComment.tsx";
import { EditPost } from "islands/edit.tsx";
import { DeletePost } from "islands/delete.tsx";
import { AddToFAQ } from "islands/FAQ/AddToFAQ.tsx";
import { EditComment } from "islands/EditComment.tsx";
import { DeleteComment } from "islands/DeleteComment.tsx";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<PostState>,
) {
  const post = ctx.state.post;
  const postedBy = post.anonymous ? "Anonymous" : ctx.state.user.name;

  const [votes, comments, voted, tags, comments_voted] = await Promise.all([
    getPostVotes(post.id),
    getPostComments(post.id),
    getPostVoted(ctx.state.member.id, post.id),
    getPostTags(post.id),
    getPostCommentsVoted(post.id),
  ]);

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
