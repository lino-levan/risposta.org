import { useSignal } from "@preact/signals";
import IconX from "icons/x.tsx";

export interface UpdataClassProps {
  classId: number;
  name: string;
}

export function UpdateClassForm(props: UpdataClassProps) {
  const className = useSignal("");
  const tags = useSignal<string[]>([]);
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
              value={tag}
              onInput={(e) => {
                tags.value[i] = e.currentTarget.value;
                tags.value = [...tags.value];
              }}
              placeholder="Tag Name"
            />
            <button
              class="text-gray-500 hover:text-black"
              onClick={() => {
                tags.value = tags.value.filter((_, j) => i !== j);
              }}
            >
              <IconX />
            </button>
          </div>
        ))}
        <button
          class="w-max rounded px-4 py-2 border"
          onClick={() => {
            tags.value = [...tags.value, ""];
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
