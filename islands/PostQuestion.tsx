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
    <div class="flex flex-col gap-4 bg-green-400 p-10 rounded shadow-lg">
      <div class="flex items-center gap-4">
        <p class="font-bold w-36 text-black">Post To</p>
        <select class="border-green-200 rounded px-4 py-2 bg-white text-black">
          <option value="everyone">Entire Class</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36 text-black">Tags</p>
        <select class="border-green-200 rounded px-4 py-2 bg-white text-black flex flex-row">
          <option value="lab1">lab1</option>
          <option value="lab2">lab2</option>
          <option value="lab3">lab3</option>
        </select>
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36 text-black">Title</p>
        <input
          class="border-green-200 rounded px-4 py-2 w-96 bg-white text-black"
          value={title.value}
          onInput={(e) => {
            title.value = e.currentTarget.value;
          }}
        />
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36 text-black">Details</p>
        <textarea
          class="border-green-200 rounded px-4 py-2 w-96 h-32 resize-none bg-white text-black"
          content={content.value}
          onInput={(e) => {
            content.value = e.currentTarget.value;
          }}
        />
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36 text-black">Show my name as</p>
        <select
          class="border-green-200 rounded px-4 py-2 bg-white text-black flex flex-row"
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
          class="rounded px-4 py-2 border-green-200 bg-white hover:bg-green-500 text-black"
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
        <button class="rounded px-4 py-2 border-green-200 bg-white hover:bg-green-500 text-black" disabled={loading}>
          Save Draft
        </button>
        <a class="rounded px-4 py-2 border-green-200 bg-white hover:bg-green-500 text-black" href={`/class/${props.classId}`}>
          Cancel
        </a>
      </div>
    </div>
  );
}