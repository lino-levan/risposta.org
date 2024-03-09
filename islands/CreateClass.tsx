import { useState } from "preact/hooks";

export default function CreateClassForm() {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [enableAI, setEnableAI] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const classData = { name: className, description, enableAI };

    try {
      const response = await fetch("/api/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error("Failed to create class");
      }

      const newClass = await response.json();
      window.location.href = `/class/${newClass.id}`;
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error creating class");
    }
    console.log("Creating class:", className, description);
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <div>
        <label for="className" class="block mb-2">Class Name</label>
        <input
          id="className"
          type="text"
          class="input input-bordered w-full"
          value={className}
          onInput={(e) => setClassName(e.currentTarget.value)}
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label for="description" class="block mb-2">Description</label>
        <textarea
          id="description"
          class="textarea textarea-bordered w-full"
          value={description}
          onInput={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div>
        <label for="enableGPT" class="flex items-center gap-2">
          <input
            id="enableGPT"
            type="checkbox"
            class="checkbox"
            checked={enableAI}
            onChange={(e) => setEnableAI(e.currentTarget.checked)}
          />
          Enable AI features
        </label>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
      >
        Create Class
      </button>
      {message && <p class="mt-4">{message}</p>}
    </form>
  );
}
