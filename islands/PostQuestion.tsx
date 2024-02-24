import { useSignal } from "@preact/signals";

export interface PostQuestionProps {
  classId: string;
  username?: string;
}

export function PostQuestion(props: PostQuestionProps) {
  const title = useSignal("");
  const content = useSignal("");
  const loading = useSignal(false);
  const anonymous = useSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Post To</p>
        <select class="border rounded px-4 py-2">
          <option value="everyone">Entire Class</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Tags</p>
        <select class="border rounded px-4 py-2 flex flex-row">
          <option value="lab1">lab1</option>
          <option value="lab2">lab2</option>
          <option value="lab3">lab3</option>
        </select>
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Title</p>
        <input
          class="border rounded px-4 py-2 w-96"
          value={title.value}
          onInput={(e) => {
            title.value = e.currentTarget.value;
          }}
        />
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Details</p>
        <textarea
          class="border rounded px-4 py-2 w-96 h-32 resize-none"
          content={content.value}
          onInput={(e) => {
            content.value = e.currentTarget.value;
          }}
        />
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Show my name as</p>
        <select
          class="border rounded px-4 py-2 flex flex-row"
          value={anonymous.value ? "anonymous" : "username"}
          onChange={(e) => {
            anonymous.value = e.currentTarget.value === "anonymous";
          }}
        >
          <option value={props.username}>
            {props.username}
          </option>
          <option value="anonymous">Anonymous</option>
        </select>
      </div>
      <div class="flex items-center gap-4 pl-40">
        <button
          class="rounded px-4 py-2 border"
          disabled={loading}
          onClick={async () => {
            loading.value = true;
            const req = await fetch(`/api/class/${props.classId}/post`, {
              method: "POST",
              body: JSON.stringify({
                title: title.value,
                content: content.value,
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
        <button class="rounded px-4 py-2 border" disabled={loading}>
          Save Draft
        </button>
        <a class="rounded px-4 py-2 border" href={`/class/${props.classId}`}>
          Cancel
        </a>
      </div>
    </div>
  );
}
