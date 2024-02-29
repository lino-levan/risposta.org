import { FreshContext } from "$fresh/server.ts";
import type { PostState } from "lib/state.ts";
import { supabase } from "lib/db.ts";
import { getReadableTime } from "lib/readable_time.ts";
import { Vote } from "islands/Vote.tsx";
import { CommentVote } from "islands/CommentVote.tsx";
import { PostComment } from "islands/PostComment.tsx";
import { EditPost } from "islands/edit.tsx";
import { DeletePost } from "islands/delete.tsx";
import { AddToFAQ } from "islands/FAQ/AddToFAQ.tsx";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<PostState>,
) {
  const post = ctx.state.post;
  const { count: upvoteCount } = await supabase.from("votes").select("*", {
    count: "exact",
  }).eq("upvote", true).eq("post_id", post.id);
  const { count: downvoteCount } = await supabase.from("votes").select("*", {
    count: "exact",
  }).eq("upvote", false).eq("post_id", post.id);
  const votes = (upvoteCount ?? 0) - (downvoteCount ?? 0);

  // Get comments
  const { data: commentData } = await supabase
    .from("comments")
    .select("*, member_id!inner(*, user_id!inner(*))")
    .eq("post_id", post.id);
  const comments = commentData as unknown as {
    id: number;
    content: string;
    created_at: string;
    member_id: { user_id: { name: string; picture: string } };
  }[];

  const commentVotesPromises = comments!.map(async (comment) => {
    const { count: upvoteCountComment } = await supabase
      .from("votes")
      .select("*", { count: "exact" })
      .eq("upvote", true)
      .eq("comment_id", comment.id);

    const { count: downvoteCountComment } = await supabase
      .from("votes")
      .select("*", { count: "exact" })
      .eq("upvote", false)
      .eq("comment_id", comment.id);
    const votesComment = (upvoteCountComment ?? 0) -
      (downvoteCountComment ?? 0);

    return votesComment;
  });

  const votesComments = await Promise.all(commentVotesPromises);

  //Checked the voted state
  const { data } = await supabase.from("votes").select("*").eq(
    "member_id",
    ctx.state.member.id,
  ).eq("post_id", post.id);
  const voted = data === null || data.length === 0
    ? 0
    : (data[0].upvote ? 1 : -1);

  const postedBy = post.anonymous ? "Anonymous" : ctx.state.user.name;
  //added to check for editing post
  const { data: postData, error } = await supabase
    .from("posts")
    .select("*, member:member_id(user_id)")
    .eq("id", ctx.params.postId)
    .single();
  if (error || !postData) {
    throw new Error("Post not found or an error occurred.");
  }
  const postCreatorId = postData.member.user_id;

  return (
    <div class="w-full h-full p-4 flex flex-col gap-2 overflow-hidden overflow-y-auto">
      <div class="bg-white p-4 rounded">
        <div class="flex items-start gap-4">
          <div>
            <Vote votes={votes} voted={voted} postId={post.id} />
          </div>
          <div class="flex flex-col">
            <h2 class="text-zinc-400 text-xs">
              Posted by {postedBy} {getReadableTime(post.created_at)}
            </h2>
            <h1 class="font-bold text-3xl">{post.title}</h1>
            <div class="flex gap-2 pt-2">
              <p class="text-xs bg-black text-white px-2 rounded">Lab 1</p>
              <p class="text-xs bg-black text-white px-2 rounded">Lab 2</p>
            </div>
          </div>
          {
            ctx.state.member.role !== "student" && (
              <div class="ml-auto">
                <AddToFAQ postId={post.id} classId={ctx.params.classId} />
              </div>
            )
          }
        </div>
        <p class="pl-8">{post.content}</p>
      </div>
      <div>
        <EditPost
          postId={post.id}
          initialTitle={post.title}
          initialContent={post.content}
          classId={ctx.params.classId}
          userId={ctx.state.user.id}
          postCreatorId={postCreatorId}
        >
        </EditPost>
      </div>
      <div>
        <DeletePost
          postId={post.id}
          classId={ctx.params.classId}
          userId={ctx.state.user.id}
          postCreatorId={postCreatorId}
        >
        </DeletePost>
      </div>
      <PostComment post_id={ctx.params.postId} classId={ctx.params.classId} />
      {comments!.map((comment, index) => (
        <div class="rounded px-4 py-2 flex bg-white gap-2">
          <img
            class="rounded-full w-6 h-6"
            src={comment.member_id.user_id.picture}
          />
          <div class="flex flex-col gap-2">
            <p class="text-zinc-400 text-xs">
              <span class="text-black font-bold">
                {comment.member_id.user_id.name}
              </span>{" "}
              · {getReadableTime(comment.created_at)}
            </p>
            <p>{comment.content}</p>
            <div class="flex gap-4">
              <CommentVote
                votes={votesComments[index]}
                voted={voted}
                commentId={comment.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
