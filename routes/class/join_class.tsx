import CreateClassForm from "islands/JoinClass.tsx";

export default function CreateClass(req: Request) {
  return (
    <div class="flex flex-col items-center justify-center pt-16 w-screen h-screen bg-gray-100">
      <div class="p-20 bg-white rounded flex flex-col gap-2">
        <h1 class="text-2xl font-bold">Enter a Class Code</h1>
        <CreateClassForm />
      </div>
    </div>
  );
}
