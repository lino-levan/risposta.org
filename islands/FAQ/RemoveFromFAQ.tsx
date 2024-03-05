import { useSignal } from "@preact/signals";

export interface RemoveFromFAQProps {
  postId: number;
  classId: string;
}

export function RemoveFromFAQ(props: RemoveFromFAQProps) {
  const loading = useSignal(false);

  return (
    <button
      class="btn btn-error"
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
