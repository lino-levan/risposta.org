import { Comment } from "islands/Comment.tsx";
import type { ExpandedComment } from "lib/get_post_comments.ts";
import type { CommentVoted } from "lib/get_post_comments_voted.ts";

interface CommentTreeProps {
  comment: ExpandedComment;
  comments: ExpandedComment[];
  comments_voted: CommentVoted[];
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
      created_at={props.comment.created_at}
      parent_id={props.comment.parent_id}
    >
      {props.comments.filter((c) => c.parent_id === props.comment.id).map((
        c,
      ) => (
        <CommentTree
          comment={c}
          comments={props.comments}
          comments_voted={props.comments_voted}
          class_id={props.class_id}
          post_id={props.post_id}
        />
      ))}
    </Comment>
  );
}
