import { useState } from "preact/hooks";

export default function CreateUserForm() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(""); // State to store the new username

  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/user/editname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUsername: username }), // Sending the new username to create
      });

      if (!response.ok) {
        throw new Error("Failed to change user name");
      }

      // Redirect to a success page after successful creation
      window.location.href = `/class/user`;
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error changing username");
    }
  };

  return (
    <div class="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter New Username"
        value={username}
        onChange={(e) => {
          setUsername(e.currentTarget.value);
        }}
        class="input input-bordered w-full"
      />
      <button
        onClick={handleCreateUser}
        class="btn btn-primary"
      >
        Change Name
      </button>

      <a className="btn btn-primary" href="/class/user">Cancel</a>

      {message && <p class="text-error">{message}</p>}
    </div>
  );
}
