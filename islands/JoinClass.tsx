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

  const handleChange = (event) => {
    setClassId(event.target.value); // Update class ID when input changes
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Class ID"
        value={classId}
        onChange={handleChange}
        class="border rounded px-4 py-2"
      />
      <button
        onClick={handleJoinClass}
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
      >
        Join Class
      </button>
      {message && <p class="mt-4">{message}</p>}
    </div>
  );
}
