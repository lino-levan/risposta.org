import { useSignal } from "@preact/signals";

export interface PostCommentProps {
  post_id: string;
  classId: string;
  parent_id?: number;
}

//island
export function PostComment(props: PostCommentProps) {
  const comment = useSignal("");
  const disabled = useSignal(false);
  return (
    <div class="rounded px-4 py-2 flex flex-col gap-4 bg-white p-4 shadow-lg mb-4">
      <p className="font-bold">Comment:</p>
      <textarea
        className="border rounded px-4 py-2 w-96 h-12 resize-none"
        value={comment.value}
        onInput={(e) => {
          comment.value = e.currentTarget.value;
        }}
      />
      <button
        className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-max"
        disabled={disabled}
        onClick={async () => {
          disabled.value = true;
          console.log("Post Comment button clicked!");
          console.log("post_id:", props.post_id);
          console.log("comment:", comment.value);
          const req = await fetch(`/api/class/${props.post_id}/comment`, {
            method: "POST",
            body: JSON.stringify({
              content: comment.value,
              post_id: parseInt(props.post_id, 10),
              parent_id: props.parent_id,
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
        Post Comment
      </button>
    </div>
  );
}