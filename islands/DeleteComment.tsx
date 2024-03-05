import { useSignal } from "@preact/signals";

export interface DeleteCommentProps {
  postId: number;
  commentId: number;
  classId: string;
  userId: number;
  commentCreatorId: number;
}

export function DeleteComment(props: DeleteCommentProps) {
  const deleteComment = async () => {
    const req = await fetch(`/api/comments/${props.commentId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (req.ok) {
      console.log("Comment deleted successfully");
      location.href = `/class/${props.classId}/post/${props.postId}`;
    } else {
      alert("Failed to delete Comment");
    }
  };
  const isUserCommentCreator = props.userId == props.commentCreatorId;
  if (!isUserCommentCreator) {
    return <div>You do not have permission to edit this post</div>;
  }
  return (
    <div class="flex flex-col">
      <button
        class="bg-red-500 text-white p-2 rounded"
        onClick={deleteComment}
      >
        Delete Comment
      </button>
    </div>
  );
}
