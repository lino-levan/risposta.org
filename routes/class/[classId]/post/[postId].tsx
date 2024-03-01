import { FreshContext } from "$fresh/server.ts";
import type { PostState } from "lib/state.ts";
import { supabase } from "lib/db.ts";
import { getReadableTime } from "lib/readable_time.ts";
import { Vote } from "islands/Vote.tsx";
import { CommentVote } from "islands/CommentVote.tsx";
import { PostComment } from "islands/PostComment.tsx";
import { ThreadedComment } from "islands/ThreadedComment.tsx";

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
    .select("*, member_id!inner(*, user_id!inner(*)), parent_id")
    .eq("post_id", post.id);

  const comments = commentData as unknown as {
    id: number;
    content: string;
    created_at: string;
    member_id: { user_id: { name: string; picture: string } };
    parent_id: number;
    children: any[];
  }[];

  function buildTree(comments, parent) {
    let tree = [];
  
    for(let comment of comments) {
      if(comment.parent_id === parent) {
        let children = buildTree(comments, comment.id);
  
        if(children.length) {
          comment.children = children;
        }
  
        tree.push(comment);
      }
    }
  
    return tree;
  }
  
  // Build a comment tree
  const commentForest = buildTree(comments, null);

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

  
  function renderComment(comment, index) {
    return (
      <div class={`rounded px-4 py-2 flex bg-white gap-2 ${comment.parent_id ? 'pl-20' : ''}`}>
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
          <div class={`pl-8 ${comment.parent_id ? 'pl-20' : ''}`}>
            <ThreadedComment
              post_id={ctx.params.postId}
              classId={ctx.params.classId}
              commentId={comment.id}
            />
          </div>
          {comment.children &&
            comment.children.map(renderComment)}
        </div>
      </div>
    );
  }
  
  return (
    <div class="w-full h-full p-4 flex flex-col gap-2 overflow-hidden overflow-y-auto">
      <div class="bg-white p-4 rounded">
        <div class="flex items-center gap-4">
          <Vote votes={votes} voted={voted} postId={post.id} />
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
        </div>
        <p class="pl-8">{post.content}</p>
      </div>
      <PostComment post_id={ctx.params.postId} classId={ctx.params.classId} />
      {commentForest && commentForest.map(renderComment)}
    </div>
  ); }