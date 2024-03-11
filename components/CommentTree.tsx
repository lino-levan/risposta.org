import { Comment } from "islands/Comment.tsx";
import type { ExpandedComment } from "db/get_post_comments.ts";
import type { CommentVoted } from "db/get_post_comments_voted.ts";
import type { Database } from "lib/supabase_types.ts";

interface CommentTreeProps {
  comment: ExpandedComment;
  comments: ExpandedComment[];
  comments_voted: CommentVoted[];

  member: Database["public"]["Tables"]["members"]["Row"];
  class_id: number;
  post_id: number;
}

export function CommentTree(props: CommentTreeProps) {
  const comment_voted = props.comments_voted.find((v) =>
    v.comment_id === props.comment.id
  );
  return (
    <Comment
      class_id={props.class_id}
      post_id={props.post_id}
      comment_id={props.comment.id}
      picture={props.comment.picture}
      name={props.comment.author_name}
      content={props.comment.content}
      votes={props.comment.upvotes - props.comment.downvotes}
      voted={comment_voted ? (comment_voted.upvote ? 1 : -1) : 0}
      role={props.comment.author_role}
      created_at={props.comment.created_at}
      parent_id={props.comment.parent_id}
      is_author={props.comment.author_user_id === props.member.user_id}
      is_instructor={props.member.role !== "student"}
    >
      {props.comments.filter((c) => c.parent_id === props.comment.id).sort((
        a,
        b,
      ) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)).map((
        c,
      ) => (
        <CommentTree
          comment={c}
          comments={props.comments}
          comments_voted={props.comments_voted}
          class_id={props.class_id}
          post_id={props.post_id}
          member={props.member}
        />
      ))}
    </Comment>
  );
}
