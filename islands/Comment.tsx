import { useSignal } from "@preact/signals";

export interface CommentProps {
  post_id: string;
  classId: string;
  parent_id?: number;
  commentId?: number; // Add this line
}

//island
export function Comment(props: CommentProps) {
  const comment = useSignal("");
  const disabled = useSignal(false);
  const showCommentForm = useSignal(false);

  return (
    <div class="flex flex-col gap-4 rounded bg-white px-4 py-2 pl-8">
      {/* Add left padding here */}
      <button
        className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-max"
        onClick={() => showCommentForm.value = !showCommentForm.value}
      >
        Reply
      </button>
      {showCommentForm.value && (
        <>
          <p className="font-bold">Comment</p>
          <textarea
            className="border rounded px-4 py-2 w-96 h-12 resize-none"
            value={comment.value}
            onInput={(e) => {
              comment.value = e.currentTarget.value;
            }}
          />
          <button
            className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-max"
            disabled={disabled.value}
            onClick={async () => {
              disabled.value = true;
              console.log("Post Comment button clicked!");
              console.log("post_id:", props.post_id);
              console.log("comment:", comment.value);
              const req = await fetch(`/api/posts/${props.post_id}/comment`, {
                method: "POST",
                body: JSON.stringify({
                  content: comment.value,
                  post_id: parseInt(props.post_id, 10),
                  parent_id: props.commentId,
                }),
              });
              if (req.ok) {
                comment.value = "";
                disabled.value = false;
                window.location.reload();
              } else {
                disabled.value = false;
              }
            }}
          >
            Post Reply
          </button>
        </>
      )}
    </div>
  );
}
