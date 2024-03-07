import { useSignal } from "@preact/signals";
import { Multiselect } from "islands/Multiselect.tsx";

export interface CreatePostProps {
  classId: string;
  username?: string;
  tags: string[];
}

export function CreatePost(props: CreatePostProps) {
  const title = useSignal("");
  const content = useSignal("");
  const loading = useSignal(false);
  const anonymous = useSignal(false);
  const tags = useSignal<string[]>([]);

  return (
    <div class="flex flex-col gap-4 p-10">
      <div class="flex flex-col gap-2">
        <p class="font-bold w-36">Post To</p>
        <select class="select select-bordered">
          <option value="everyone">Entire Class</option>
          <option value="instructor">Instructor</option>
        </select>
        {props.tags.length > 0 && (
          <>
            <p class="font-bold w-36">Tags</p>
            <Multiselect selected={tags} options={props.tags} />
          </>
        )}
        <p class="font-bold w-36 text-black">Title</p>
        <input
          class="input input-bordered w-full"
          value={title.value}
          onInput={(e) => {
            title.value = e.currentTarget.value;
          }}
        />
        <p class="font-bold w-36 text-black">Details</p>
        <textarea
          class="textarea textarea-bordered w-full"
          content={content.value}
          onInput={(e) => {
            content.value = e.currentTarget.value;
          }}
        />
        <p class="font-bold w-36 text-black">Show my name as</p>
        <select
          class="select select-bordered"
          value={anonymous.value ? "anonymous" : "username"}
          onChange={(e) => {
            anonymous.value = e.currentTarget.value === "anonymous";
          }}
        >
          <option value="username">
            {props.username}
          </option>
          <option value="anonymous">Anonymous</option>
        </select>
      </div>
      <div class="flex items-center gap-4 pl-40">
        <button
          class="btn btn-primary"
          disabled={loading}
          onClick={async () => {
            loading.value = true;
            const req = await fetch(`/api/class/${props.classId}/post`, {
              method: "POST",
              body: JSON.stringify({
                title: title.value,
                content: content.value,
                tags: tags.value,
                anonymous: anonymous.value,
              }),
            });
            if (req.ok) {
              location.href = `/class/${props.classId}`;
            }
          }}
        >
          Post
        </button>
        <button
          class="btn btn-ghost"
          disabled={loading}
        >
          Save Draft
        </button>
        <a
          class="btn btn-ghost"
          href={`/class/${props.classId}`}
        >
          Cancel
        </a>
      </div>
    </div>
  );
}