import { useSignal } from "@preact/signals";

export interface EditPostProps {
  postId: number;
  initialTitle: string;
  initialContent: string;
  classId: string;
  userId: number;
  postCreatorId: number;
}

export function EditPost(props: EditPostProps) {
  const title = useSignal(props.initialTitle);
  const content = useSignal(props.initialContent);
  const loading = useSignal(false);
  const isEditing = useSignal(false);
  const updatePost = async () => {
    if (!title.value.trim() || !content.value.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }
    loading.value = true;
    const req = await fetch(`/api/posts/${props.postId}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
    });
    if (req.ok) {
      console.log("Post updated successfully");
      location.href = `/class/${props.classId}/post/${props.postId}`;
    } else {
      alert("Failed to update the post. Please try again.");
    }
    loading.value = false;
  };
  const isUserPostCreator = props.userId == props.postCreatorId;
  if (!isUserPostCreator) {
    return <div>You do not have permission to edit this post</div>;
  }

  return (
    <div class="rounded px-4 py-2 flex flex-col gap-4 bg-white p-4 shadow-lg mb-4">
      {!isEditing.value && (
        <button
          class="bg-green-400 hover:bg-green-800 text-white font-bold py-1 px-2 rounded w-max"
          onClick={() => isEditing.value = true}
        >
          Click to Edit
        </button>
      )}
      {isEditing.value && (
        <>
          <input
            class="border rounded px-4 py-2 w-96 h-12 resize-none"
            value={title.value}
            onInput={(e) => title.value = e.currentTarget.value}
            placeholder="Post Title"
            disabled={loading.value}
          />
          <textarea
            class="border rounded px-4 py-2 w-96 h-12 resize-none"
            value={content.value}
            onInput={(e) => content.value = e.currentTarget.value}
            placeholder="Post Content"
            rows={4}
            disabled={loading.value}
          >
          </textarea>
          <button
            class="bg-green-400 hover:bg-green-800 text-white font-bold py-1 px-2 rounded w-max"
            onClick={updatePost}
            disabled={loading.value}
          >
            {loading.value ? "Updating..." : "Update Post"}
          </button>
        </>
      )}
    </div>
  );
}