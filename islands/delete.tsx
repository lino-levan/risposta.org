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
    <div class="flex flex-col">
      <button
        class="bg-red-500 text-white p-2 rounded"
        onClick={deletePost}
      >
        Delete Post
      </button>
    </div>
  );
}
