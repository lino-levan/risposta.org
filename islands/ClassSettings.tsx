import { useSignal } from "@preact/signals";
import { debounce } from "$std/async/debounce.ts";

export interface ClassSettingsProps {
  classId: number;
  name: string;
  description: string;
  ai: boolean;
}

const updateClass = debounce(
  async (classId: number, name: string, description: string, ai: boolean) => {
    if (!name.trim()) {
      alert("Class name cannot be empty!");
      return;
    }
    await fetch(`/api/class/${classId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        description,
        ai,
      }),
    });
  },
  200,
);

export function ClassSettings(props: ClassSettingsProps) {
  const className = useSignal(props.name);
  const classDescription = useSignal(props.description);
  const classAI = useSignal(props.ai);

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
          updateClass(
            props.classId,
            className.value,
            classDescription.value,
            classAI.value,
          );
        }}
      />
      <p class="text-xl w-full">Description</p>
      <textarea
        class="textarea textarea-bordered w-full"
        value={classDescription.value}
        placeholder="Your class description..."
        onInput={(e) => {
          classDescription.value = e.currentTarget.value;
          updateClass(
            props.classId,
            className.value,
            classDescription.value,
            classAI.value,
          );
        }}
      />
      <p class="text-xl w-full">AI Features</p>
      <label for="enableGPT" class="flex items-center gap-2 w-full">
        <input
          id="enableGPT"
          type="checkbox"
          class="checkbox"
          checked={classAI}
          onChange={(e) => {
            classAI.value = e.currentTarget.checked;
            updateClass(
              props.classId,
              className.value,
              classDescription.value,
              classAI.value,
            );
          }}
        />
        Enable Classroom AI
      </label>
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
