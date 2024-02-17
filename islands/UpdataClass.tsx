import { useSignal } from "@preact/signals";

export interface UpdataClassProps {
  classId: string;
  name: string;
}

export function UpdataClassForm(props: UpdataClassProps) {
  const className = useSignal("");
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
    <div class="flex flex-col items-center">
      <div class="w-full">
        <input
          class="border p-2"
          value={className.value}
          onInput={(e) => className.value = e.currentTarget.value}
          placeholder={props.name}
          disabled={loading.value}
        />
        <button
          class="mt-4 bg-blue-500 text-white p-2 rounded"
          onClick={updateClass}
          disabled={loading.value}
        >
          {loading.value ? "Updating..." : "Update Class Name"}
        </button>
      </div>
      <div class="mt-28 w-full">
        <button
          class="bg-red-500 text-white p-2 rounded w-full"
          onClick={deleteClass}
          disabled={loading.value}
        >
          Delete Class
        </button>
      </div>
    </div>
  );
}
