import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import IconDotsVertical from "icons/dots-vertical.tsx";
import { getReadableTime } from "lib/readable_time.ts";
import { Vote } from "islands/Vote.tsx";

interface PostProps {
  votes: number;
  voted: number;
  classId: number;
  postId: number;
  postedBy: string;
  createdAt: string;
  inFAQ: boolean;

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
    inFAQ,
  }: PostProps,
) {
  const dotMenuOpen = useSignal(false);

  useEffect(() => {
    const effect = () => {
      dotMenuOpen.value = false;
    };
    document.addEventListener("click", effect);

    return () => {
      document.removeEventListener("click", effect);
    };
  }, []);

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
        {(isAuthor || isTeacher) && (
          <button
            class="ml-auto hover:bg-base-300 rounded-full p-1 relative"
            onClick={(e) => {
              e.stopPropagation();
              dotMenuOpen.value = !dotMenuOpen.value;
            }}
          >
            <IconDotsVertical />
            {dotMenuOpen.value && (
              <div
                style={{
                  borderRadius: "var(--rounded-btn, 0.5rem)",
                  borderColor: "var(--fallback-bc,oklch(var(--bc)/0.2))",
                  backgroundColor:
                    "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))",
                }}
                class="absolute border shadow w-48 right-0 top-10 p-2 rounded-lg flex flex-col gap-2 bg-base-100"
              >
                {isAuthor && <button class="btn btn-ghost">Edit Post</button>}
                <div class="border-b" />
                {(isAuthor || isTeacher) && (
                  <button
                    class="btn btn-ghost"
                    onClick={async () => {
                      const req = await fetch(`/api/posts/${postId}/delete`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                      if (req.ok) {
                        location.href = `/class/${classId}`;
                      }
                    }}
                  >
                    Delete Post
                  </button>
                )}
                {isTeacher && <div class="border-b" />}
                {isTeacher && !inFAQ && (
                  <button
                    class="btn btn-ghost"
                    onClick={async () => {
                      const req = await fetch(`/api/class/${postId}/faq/add`, {
                        method: "POST",
                      });
                      if (req.ok) {
                        location.href = `/class/${classId}`;
                      }
                    }}
                  >
                    Add to FAQ
                  </button>
                )}
                {isTeacher && inFAQ && (
                  <button
                    class="btn btn-ghost"
                    onClick={async () => {
                      const req = await fetch(
                        `/api/class/${postId}/faq/remove`,
                        {
                          method: "POST",
                        },
                      );
                      if (req.ok) {
                        location.href = `/class/${classId}`;
                      }
                    }}
                  >
                    Remove to FAQ
                  </button>
                )}
              </div>
            )}
          </button>
        )}
      </div>
      <p class="pl-8">{content}</p>
    </div>
  );
}
