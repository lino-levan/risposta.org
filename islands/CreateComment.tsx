import { useSignal } from "@preact/signals";

export interface CreateCommentProps {
  post_id: string;
  classId: string;
  parent_id?: number;
}

//island
export function CreateComment(props: CreateCommentProps) {
  const comment = useSignal("");
  const disabled = useSignal(false);
  return (
    <div class="px-4 py-2 flex flex-col gap-4 p-4">
      <textarea
        className="textarea textarea-bordered w-full h-24 resize-none"
        value={comment.value}
        onInput={(e) => {
          comment.value = e.currentTarget.value;
        }}
      />
      <button
        className="btn btn-primary w-max"
        disabled={disabled}
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
