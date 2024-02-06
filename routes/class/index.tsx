import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Dashboard(req: Request) {
  //Dummy items
  const items = Array(15).fill(0).map((_, i) => `Question ${i + 1}`);

  return (
    <>
      <div class="flex flex-col items-center justify-center pt-16 w-screen h-screen bg-gray-100">
        <div class="p-20 bg-white rounded flex flex-col gap-2">
          <h1 class="text-2xl font-bold">Welcome to the Dashboard</h1>
          <a
            class="border px-4 py-2 flex gap-2"
            href="/class/create_class"
          >
            Create class as Instructor
          </a>
          <a
            class="border px-4 py-2 flex gap-2"
            href="/class/join_class"
          >
            Join class as Student (not implemented)
          </a>
        </div>
      </div>
    </>
  );
}
/*
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <>
      <header class="w-screen p-4 shadow fixed flex gap-4">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <div class="ml-auto" />
        <a href="/signup">Sign Up</a>
        <a href="/login">Log In</a>
      </header>
      <div class="w-screen h-screen flex flex-col justify-center items-center">
        <h1 class="font-titan-one text-8xl text-center uppercase">Risposta</h1>
        <p class="text-center">
          The education platform you've been waiting for.
        </p>
      </div>
    </>
  );
}
*/
