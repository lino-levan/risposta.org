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

export function UpdateClassForm(props: UpdataClassProps) {
  const className = useSignal("");
  const tags = useSignal(props.tags);
  const loading = useSignal(false);

  const updateClass = async () => {
    if (!className.value.trim()) {
      alert("Class name cannot be empty!");
      return;
    }
    loading.value = true;
    const req = await fetch(`/api/class/${props.classId}/rename`, {
      method: "POST",
      body: JSON.stringify({
        name: className.value,
      }),
    });
    if (req.ok) {
      location.href = `/class/${props.classId}`;
    }
  };

  const deleteClass = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this class?\nThis action cannot be reverted.",
    );
    if (confirmation) {
      loading.value = true;
      const req = await fetch(`/api/class/${props.classId}/delete_class`, {
        method: "POST",
      });
      if (req.ok) {
        location.href = "/";
      }
    }
  };

  return (
    <div class="flex gap-2 flex-col items-center">
      <p class="text-xl w-full">Name</p>
      <div class="w-full flex gap-2">
        <input
          class="border p-2 rounded flex-grow"
          value={className.value}
          onInput={(e) => className.value = e.currentTarget.value}
          placeholder={props.name}
          disabled={loading.value}
        />
        <button
          class="bg-blue-500 text-white p-2 rounded"
          onClick={updateClass}
          disabled={loading.value}
        >
          {loading.value ? "Updating..." : "Update"}
        </button>
      </div>
      <p class="text-xl w-full">Tags</p>
      <div class="w-full flex flex-col gap-2">
        {tags.value.map((tag, i) => (
          <div class="border rounded flex-grow flex">
            <input
              class="p-2 rounded flex-grow"
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
          class="w-max rounded px-4 py-2 border"
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
        class="bg-red-500 text-white p-2 rounded w-full"
        onClick={deleteClass}
        disabled={loading.value}
      >
        Delete Class
      </button>
    </div>
  );
}
