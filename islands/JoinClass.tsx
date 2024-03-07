import { useState } from "preact/hooks";

export default function CreateClassForm() {
  const [message, setMessage] = useState("");
  const [classId, setClassId] = useState(""); // State to store the class ID

  const handleJoinClass = async () => {
    try {
      const response = await fetch("/api/class/join_class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class_id: classId }), // Sending the class ID to join
      });

      if (!response.ok) {
        throw new Error("Failed to join class");
      }

      // Redirect to the class page after successful join
      window.location.href = `/class`;
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error joining class");
    }
  };

  return (
    <div class="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter Class ID"
        value={classId}
        onChange={(e) => {
          setClassId(e.currentTarget.value);
        }}
        class="input input-bordered w-full"
      />
      <button
        onClick={handleJoinClass}
        class="btn btn-primary"
      >
        Join Class
      </button>
      {message && <p class="text-error">{message}</p>}
    </div>
  );
}
