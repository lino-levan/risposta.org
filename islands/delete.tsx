import { useSignal } from "@preact/signals";

export interface DeletePostProps {
  postId: number;
  classId: string;
  userId: number;
  postCreatorId: number;
}

export function DeletePost(props: DeletePostProps) {
  const deletePost = async () => {
    const req = await fetch(`/api/posts/${props.postId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (req.ok) {
      console.log("Post deleted successfully");
      location.href = `/class/${props.classId}`;
    } else {
      alert("Failed to delete post");
    }
  };
  const isUserPostCreator = props.userId == props.postCreatorId;
  if (!isUserPostCreator) {
    return <div>You do not have permission to edit this post</div>;
  }
  return (
    <div class="rounded px-4 py-2 flex flex-col gap-4 bg-white p-4 shadow-lg mb-4">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-max"
        onClick={deletePost}
      >
        Delete Post
      </button>
    </div>
  );
}

