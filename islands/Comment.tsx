import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { CommentVote } from "islands/CommentVote.tsx";
import { getReadableTime } from "lib/readable_time.ts";

export interface CommentProps {
  class_id: number;
  post_id: number;

  comment_id: number;
  picture: string;
  name: string;
  content: string;
  created_at: string;
  parent_id: number | null;
  votes: number;
  voted: 0 | 1 | -1;

  children: ComponentChildren;
}

export function Comment(props: CommentProps) {
  const comment = useSignal("");
  const disabled = useSignal(false);
  const showCommentForm = useSignal(false);

  return (
    <div class="px-4 py-2 flex gap-2 p-4 border-l-2">
      <img
        class="rounded-full w-6 h-6"
        src={props.picture}
      />
      <div class="flex flex-col gap-2">
        <p class="text-zinc-400 text-xs">
          <span class="text-black font-bold">
            {props.name}
          </span>{" "}
          · {getReadableTime(props.created_at)}
        </p>
        <p>{props.content}</p>
        <div class="flex gap-4">
          <CommentVote
            votes={props.votes}
            voted={props.voted}
            commentId={props.comment_id}
          />
        </div>
        <div>
          <div class="flex flex-col gap-4 rounded bg-white px-4 py-2 pl-8">
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
                    const req = await fetch(
                      `/api/posts/${props.post_id}/comment`,
                      {
                        method: "POST",
                        body: JSON.stringify({
                          content: comment.value,
                          post_id: props.post_id,
                          parent_id: props.comment_id,
                        }),
                      },
                    );
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
          {props.children}
        </div>
      </div>
    </div>
  );
}
