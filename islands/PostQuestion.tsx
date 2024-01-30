export interface PostQuestionProps {
  classId: string;
}

export function PostQuestion(props: PostQuestionProps) {
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
        <input class="border rounded px-4 py-2 w-96" id="title" />
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Details</p>
        <textarea
          class="border rounded px-4 py-2 w-96 h-32 resize-none"
          id="content"
        />
      </div>
      <div class="flex items-center gap-4">
        <p class="font-bold w-36">Show my name as</p>
        <select class="border rounded px-4 py-2 flex flex-row">
          <option value="lab1">Lino</option>
          <option value="lab2">Anonymous to Classmates</option>
          <option value="lab3">Anonymous to Everyone</option>
        </select>
      </div>
      <div class="flex items-center gap-4 pl-40">
        <button
          class="rounded px-4 py-2 border"
          onClick={async () => {
            const title =
              (document.getElementById("title") as HTMLInputElement).value;
            const content =
              (document.getElementById("content") as HTMLTextAreaElement).value;
            const req = await fetch(`/api/class/${props.classId}/post`, {
              method: "POST",
              body: JSON.stringify({
                title,
                content,
              }),
            });
            const res = await req.text();
          }}
        >
          Post
        </button>
        <button class="rounded px-4 py-2 border">Save Draft</button>
        <button class="rounded px-4 py-2 border">Cancel</button>
      </div>
    </div>
  );
}
