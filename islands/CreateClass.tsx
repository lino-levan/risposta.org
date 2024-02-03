import { useState } from "preact/hooks";

export default function CreateClassForm() {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const classData = { name: className };

    try {
      const response = await fetch("/api/class/create_class", {
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
      //console.log("New class data:", newClass);
      //console.log("New class data:", newClass.id);
      window.location.href = `/class/${newClass.id}`;
    } 
    catch (error) {
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
          class="border p-2 rounded w-full"
          value={className}
          onInput={(e) => setClassName(e.currentTarget.value)}
          required
        />
      </div>
      <div>
        <label for="description" class="block mb-2">Description</label>
        <textarea
          id="description"
          class="border p-2 rounded w-full"
          value={description}
          onInput={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Class
      </button>
      {message && <p class="mt-4">{message}</p>}
    </form>
  );
}
