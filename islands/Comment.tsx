import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import IconMessage from "icons/message.tsx";
import IconDots from "icons/dots.tsx";
import { CommentVote } from "islands/CommentVote.tsx";
import { getReadableTime } from "lib/readable_time.ts";
import { DotMenu } from "components/DotMenu.tsx";
import { render } from "gfm";

export interface CommentProps {
  class_id: number;
  post_id: number;

  comment_id: number;
  picture: string;
  name: string;
  role: string;
  content: string;
  created_at: string;
  parent_id: number | null;
  votes: number;

  is_author: boolean;
  is_instructor: boolean;
  voted: 0 | 1 | -1;

  children: ComponentChildren;
}

export function Comment(props: CommentProps) {
  const editing = useSignal(false);
  const editedContent = useSignal(props.content);
  const comment = useSignal("");
  const disabled = useSignal(false);
  const showCommentForm = useSignal(false);

  const menuItems = [
    {
      name: "Share",
      onClick: () => {
        const url = new URL(location.toString());
        url.hash = props.comment_id.toString();
        navigator.clipboard.writeText(url.toString());
      },
    },
  ];

  if (props.is_author || props.is_instructor) {
    menuItems.push({
      name: "Delete",
      onClick: async () => {
        const req = await fetch(`/api/comments/${props.comment_id}`, {
          method: "DELETE",
        });
        if (req.ok) {
          location.reload();
        }
      },
    });
  }

  if (props.is_author) {
    menuItems.push({
      name: "Edit",
      onClick: () => {
        editing.value = true;
      },
    });
  }

  return (
    <div
      id={props.comment_id.toString()}
      class="px-4 py-2 flex gap-2 p-4 border-l-2"
    >
      <img
        class="rounded-full w-6 h-6"
        src={props.picture}
      />
      <div class="flex flex-col gap-2">
        <p class="text-zinc-400 text-xs">
          <span class="text-black font-bold">
            {props.name}
          </span>{" "}
          {props.role !== "student" && (
            <>
              <span class="text-xs bg-black text-white px-1 py-[2px] rounded">
                {props.role}
              </span>
              {" "}
            </>
          )}
          · {getReadableTime(props.created_at)}
        </p>
        {!editing.value && (
          <div
            class="markdown-body"
            dangerouslySetInnerHTML={{ __html: render(props.content) }}
          >
          </div>
        )}
        {editing.value && (
          <>
            <div class="flex gap-4">
              <button
                class="btn btn-primary w-max"
                onClick={async () => {
                  const req = await fetch(`/api/comments/${props.comment_id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                      content: editedContent.value,
                    }),
                  });
                  if (req.ok) {
                    location.reload();
                  }
                }}
              >
                Save Edit
              </button>
              <button
                class="btn btn-ghost w-max"
                onClick={() => {
                  editing.value = false;
                  editedContent.value = props.content;
                }}
              >
                Cancel Edit
              </button>
            </div>
            <textarea
              class="textarea textarea-bordered"
              value={editedContent.value}
              onInput={(e) => editedContent.value = e.currentTarget.value}
            />
          </>
        )}
        <div class="flex items-center gap-1 text-gray-500 text-sm">
          <CommentVote
            votes={props.votes}
            voted={props.voted}
            commentId={props.comment_id}
          />
          <button
            class="flex items-center gap-1 hover:bg-base-300 p-1 rounded"
            onClick={() => showCommentForm.value = !showCommentForm.value}
          >
            <IconMessage class="w-5 h-5" />
            Reply
          </button>
          <DotMenu
            items={menuItems}
          >
            <IconDots class="w-5 h-5" />
          </DotMenu>
        </div>
        <div>
          {showCommentForm.value && (
            <div class="flex flex-col gap-4 px-4 py-2 pl-8 border-l-2">
              <textarea
                placeholder="What are your thoughts?"
                className="textarea textarea-bordered w-96 h-24 resize-none"
                value={comment.value}
                onInput={(e) => {
                  comment.value = e.currentTarget.value;
                }}
              />
              <button
                className="btn btn-primary w-max"
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
            </div>
          )}
          {props.children}
        </div>
      </div>
    </div>
  );
}
