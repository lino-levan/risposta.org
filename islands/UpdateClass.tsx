import { useSignal } from "@preact/signals";
import { debounce } from "$std/async/debounce.ts";
import IconX from "icons/x.tsx";
import type { Database } from "lib/supabase_types.ts";

export interface UpdataClassProps {
  classId: number;
  name: string;
  tags: Database["public"]["Tables"]["tags"]["Row"][];
}

const updateTags = debounce(
  async (
    classId: number,
    tags: Database["public"]["Tables"]["tags"]["Row"][],
  ) => {
    await fetch(`/api/class/${classId}/tag`, {
      method: "POST",
      body: JSON.stringify(tags),
    });
  },
  500,
);

const updateClass = debounce(async (classId: number, className: string) => {
  if (!className.trim()) {
    alert("Class name cannot be empty!");
    return;
  }
  const req = await fetch(`/api/class/${classId}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: className,
    }),
  });
}, 200);

export function UpdateClassForm(props: UpdataClassProps) {
  const className = useSignal(props.name);
  const tags = useSignal(props.tags);

  const deleteClass = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this class?\nThis action cannot be reverted.",
    );
    if (confirmation) {
      const req = await fetch(`/api/class/${props.classId}`, {
        method: "DELETE",
      });
      if (req.ok) {
        location.href = "/";
      }
    }
  };

  return (
    <div class="flex gap-2 flex-col items-center">
      <p class="text-xl w-full">Name</p>
      <input
        class="input input-bordered w-full"
        value={className.value}
        placeholder="Your class name..."
        onInput={(e) => {
          className.value = e.currentTarget.value;
          updateClass(props.classId, className.value);
        }}
      />
      <p class="text-xl w-full">Tags</p>
      <div class="w-full flex flex-col gap-2">
        {tags.value.map((tag, i) => (
          <div class="flex-grow flex">
            <input
              class="input input-bordered flex-grow"
              value={tag.tag}
              onInput={(e) => {
                tags.value[i].tag = e.currentTarget.value;
                tags.value = [...tags.value];
                updateTags(props.classId, tags.value);
              }}
              placeholder="Tag Name"
            />
            <button
              class="text-gray-500 hover:text-black"
              onClick={async () => {
                const req = await fetch(`/api/class/${props.classId}/tag`, {
                  method: "DELETE",
                  body: JSON.stringify({
                    tagId: tag.id,
                  }),
                });
                if (req.ok) {
                  tags.value = tags.value.filter((_, j) => i !== j);
                }
              }}
            >
              <IconX />
            </button>
          </div>
        ))}
        <button
          class="btn btn-primary"
          onClick={async () => {
            const req = await fetch(`/api/class/${props.classId}/tag`, {
              method: "POST",
              body: JSON.stringify([{ tag: "" }]),
            });
            const res = await req.json();
            tags.value = [...tags.value, ...res];
          }}
        >
          New Tag
        </button>
      </div>
      <p class="text-xl w-full">Danger Zone</p>
      <button
        class="btn btn-error w-full"
        onClick={deleteClass}
      >
        Delete Class
      </button>
    </div>
  );
}
