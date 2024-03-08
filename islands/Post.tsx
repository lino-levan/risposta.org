import { getReadableTime } from "lib/readable_time.ts";
import IconDotsVertical from "icons/dots-vertical.tsx";
import { Vote } from "islands/Vote.tsx";
import { DotMenu } from "components/DotMenu.tsx";
import { useSignal } from "@preact/signals";
import { PostTag } from "lib/get_post_tags.ts";

interface PostProps {
  votes: number;
  voted: number;
  classId: number;
  postId: number;
  postedBy: string;
  createdAt: string;
  pinned: boolean;

  title: string;
  content: string;
  tags: PostTag[];

  isAuthor: boolean;
  isInstructor: boolean;
}

export function Post(
  {
    classId,
    votes,
    voted,
    postId,
    title,
    postedBy,
    createdAt,
    content,
    tags,
    isAuthor,
    isInstructor,
    pinned,
  }: PostProps,
) {
  const editedTitle = useSignal(title);
  const editedContent = useSignal(content);

  const editing = useSignal(false);
  const menuItems = [];

  if (isAuthor) {
    menuItems.push({
      name: "Edit Post",
      onClick: () => {
        editing.value = true;
      },
    });
  }
  if (isAuthor || isInstructor) {
    menuItems.push({
      name: "Delete Post",
      onClick: async () => {
        const req = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });
        if (req.ok) {
          location.href = `/class/${classId}`;
        }
      },
    });
  }
  if (isInstructor && !pinned) {
    menuItems.push({
      name: "Pin Post",
      onClick: async () => {
        const req = await fetch(`/api/posts/${postId}/pin`, {
          method: "POST",
        });
        if (req.ok) {
          location.href = `/class/${classId}`;
        }
      },
    });
  }
  if (isInstructor && pinned) {
    menuItems.push({
      name: "Unpin Post",
      onClick: async () => {
        const req = await fetch(
          `/api/posts/${postId}/pin`,
          {
            method: "DELETE",
          },
        );
        if (req.ok) {
          location.href = `/class/${classId}`;
        }
      },
    });
  }

  return (
    <div class="p-4">
      {editing.value && (
        <div class="mb-4 flex gap-4">
          <button
            class="btn btn-primary"
            onClick={async () => {
              const req = await fetch(`/api/posts/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                  title: editedTitle.value,
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
            class="btn btn-ghost"
            onClick={() => {
              editing.value = false;
            }}
          >
            Cancel Edit
          </button>
        </div>
      )}

      <div class="flex items-start gap-4">
        <div>
          <Vote votes={votes} voted={voted} postId={postId} />
        </div>
        <div class="flex flex-col">
          <h2 class="text-zinc-400 text-xs">
            Posted by {postedBy} {getReadableTime(createdAt)}
          </h2>
          {!editing.value && (
            <h1 class="font-bold text-3xl">
              {title}
            </h1>
          )}
          {editing.value && (
            <input
              class="input input-bordered"
              value={editedTitle}
              onInput={(e) => editedTitle.value = e.currentTarget.value}
            />
          )}
          {!editing.value && tags && tags.length > 0 && (
            <div class="flex gap-2 pt-2">
              {tags!.map((tag) => (
                <p class="text-xs bg-black text-white px-2 rounded">
                  {tag.tag.tag}
                </p>
              ))}
            </div>
          )}
        </div>
        <DotMenu
          class="ml-auto"
          items={menuItems}
        >
          <IconDotsVertical />
        </DotMenu>
      </div>
      {!editing.value && <p class="pl-8">{content}</p>}
      {editing.value && (
        <textarea
          class="ml-8 textarea textarea-bordered max-w-screen-md w-full"
          value={editedContent}
          onInput={(e) => editedContent.value = e.currentTarget.value}
        />
      )}
    </div>
  );
}
