import { useSignal } from "@preact/signals";

export interface PostCommentProps {
  post_id: string;
  classId: string;
}

export function PostComment(props: PostCommentProps) {
  const comment = useSignal("");
  const loading = useSignal(false);
  return (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Post To</p>
        <select class="border rounded px-4 py-2">
          <option value="everyone">Entire Class</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold w-36">Comment</p>
        <textarea
          className="border rounded px-4 py-2 w-96 h-32 resize-none"
          value={comment.value}
          onInput={(e) => {
            comment.value = e.currentTarget.value;
          }}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
          onClick={async () => {
            loading.value = true;
            console.log("Post Comment button clicked!");
            console.log("post_id:", props.post_id);
            console.log("comment:", comment.value);
            loading.value = true;
            const req = await fetch(`/api/class/${props.post_id}/comment`, {
              method: "POST",
              body: JSON.stringify({
                content: comment.value,
                post_id: parseInt(props.post_id, 10),
              }),
            });
            if (req.ok) {
              comment.value = "";
            }
            loading.value = false;
          }}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
