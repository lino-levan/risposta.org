import { getReadableTime } from "lib/readable_time.ts";
import { Vote } from "islands/Vote.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { DotMenu } from "components/DotMenu.tsx";

export function getMenuItems(
  isAuthor: boolean,
  isTeacher: boolean,
  pinned: boolean,
  postId: number,
  classId: number,
) {
  if (!IS_BROWSER) {
    return [];
  }

  const menuItems = [];

  if (isAuthor) {
    menuItems.push({
      name: "Edit Post",
      onClick: () => {},
    });
  }
  if (isAuthor || isTeacher) {
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
  if (isTeacher && !pinned) {
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
  if (isTeacher && pinned) {
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

  return menuItems;
}

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
  tags: {
    tag_id: {
      tag: string;
    };
  }[];

  isAuthor: boolean;
  isTeacher: boolean;
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
    isTeacher,
    pinned,
  }: PostProps,
) {
  return (
    <div class="p-4">
      <div class="flex items-start gap-4">
        <div>
          <Vote votes={votes} voted={voted} postId={postId} />
        </div>
        <div class="flex flex-col">
          <h2 class="text-zinc-400 text-xs">
            Posted by {postedBy} {getReadableTime(createdAt)}
          </h2>
          <h1 class="font-bold text-3xl">
            {title}
          </h1>
          {tags && tags.length > 0 && (
            <div class="flex gap-2 pt-2">
              {tags!.map((tag) => (
                <p class="text-xs bg-black text-white px-2 rounded">
                  {tag.tag_id.tag}
                </p>
              ))}
            </div>
          )}
        </div>
        <DotMenu
          items={getMenuItems(isAuthor, isTeacher, pinned, postId, classId)}
        />
      </div>
      <p class="pl-8">{content}</p>
    </div>
  );
}
