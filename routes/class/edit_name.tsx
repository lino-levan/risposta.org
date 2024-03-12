import CreateClassForm from "islands/EditUsername.tsx";

export default function EditName(req: Request) {
  return (
    <div class="flex flex-col items-center justify-center pt-16 w-screen h-screen bg-base-100">
      <div class="p-20 bg-base-200 rounded-lg flex flex-col gap-2">
        <h1 class="text-2xl font-bold">Enter a new Name</h1>
        <CreateClassForm />
      </div>
    </div>
  );
}
