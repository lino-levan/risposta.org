import { useSignal } from "@preact/signals";

export interface EditCommentProps {
  postId: number;
  commentId: number;
  classId: string;
  userId: number;
  commentCreatorId: number;
}

export function EditComment(props: EditCommentProps) {
  const loading = useSignal(false);
  const isEditing = useSignal(false);
  const content = useSignal("");

  const updatePost = async () => {
    loading.value = true;
    const req = await fetch(`/api/comments/${props.commentId}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content.value,
      }),
    });
    if (req.ok) {
      console.log("Comment updated successfully");
      location.href = `/class/${props.classId}/post/${props.postId}`;
    } else {
      console.log(req);
      alert("Failed to update the comment. Please try again.");
    }
    loading.value = false;
  };

  const isUserCommentCreator = props.userId == props.commentCreatorId;
  if (!isUserCommentCreator) {
    return <div>You do not have permission to edit this comment</div>;
  }

  return (
    <div class="flex flex-col">
      {!isEditing.value && (
        <button
          class="bg-blue-500 text-white p-2 rounded"
          onClick={() => isEditing.value = true}
        >
          Edit Comment
        </button>
      )}
      {isEditing.value && (
        <>
          <textarea
            class="border p-2 my-2"
            onInput={(e) => content.value = e.currentTarget.value}
            placeholder={content.value}
            disabled={loading.value}
          />
          <button
            class="bg-blue-500 text-white p-2 rounded"
            onClick={updatePost}
            disabled={loading.value}
          >
            {loading.value ? "Updating..." : "Update Comment"}
          </button>
        </>
      )}
    </div>
  );
}
