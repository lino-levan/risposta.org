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

  return (
    <div class="flex flex-col items-center justify-center">
      New class name here
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
        {loading.value ? "Updating..." : "Update Class"}
      </button>
    </div>
  );
}
