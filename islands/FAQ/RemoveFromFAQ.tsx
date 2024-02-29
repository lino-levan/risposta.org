import { useSignal } from "@preact/signals";

export interface RemoveFromFAQProps {
  postId: number;
  classId: string;
}

export function RemoveFromFAQ(props: RemoveFromFAQProps) {
  const loading = useSignal(false);

  return (
    <button
      class="px-4 py-2 rounded border text-center hover:bg-gray-100"
      disabled={loading}
      onClick={async () => {
        loading.value = true;
        const req = await fetch(`/api/class/${props.postId}/faq/remove`, {
          method: "POST",
        });
        if (req.ok) {
          location.href = `/class/${props.classId}`;
        }
      }}
    >
      Remove
    </button>
  );
}
