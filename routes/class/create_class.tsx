import CreateClassForm from "../../islands/CreateClass.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function createClass(req: Request) {
  return (
    <>
      <div class="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <h1>Create a New Class</h1>
        <CreateClassForm />
      </div>
    </>
  );
}
