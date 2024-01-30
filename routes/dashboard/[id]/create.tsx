import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/redirect.ts";

export default async function Dashboard(req: Request) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  return (
    <>
      <header class="w-screen py-2 px-4 shadow fixed flex items-center gap-4">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <div class="ml-auto" />
        <a
          href="/dashboard/user"
          class="w-40 flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded group"
        >
          <p>{user.name}</p>
          <img class="w-8 h-8 rounded-full" src={user.picture} />
        </a>
      </header>
      <div class="w-screen h-screen flex flex-col justify-center items-center">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <p class="font-bold w-36">Post To</p>
            <select class="border rounded px-4 py-2">
              <option value="everyone">Entire Class</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <div class="flex items-center gap-4">
            <p class="font-bold w-36">Tags</p>
            <select class="border rounded px-4 py-2 flex flex-row">
              <option value="lab1">lab1</option>
              <option value="lab2">lab2</option>
              <option value="lab3">lab3</option>
            </select>
          </div>
          <div class="flex items-center gap-4">
            <p class="font-bold w-36">Title</p>
            <input class="border rounded px-4 py-2 w-96" />
          </div>
          <div class="flex items-center gap-4">
            <p class="font-bold w-36">Details</p>
            <textarea class="border rounded px-4 py-2 w-96" />
          </div>
          <div class="flex items-center gap-4">
            <p class="font-bold w-36">Show my name as</p>
            <select class="border rounded px-4 py-2 flex flex-row">
              <option value="lab1">Lino</option>
              <option value="lab2">Anonymous to Classmates</option>
              <option value="lab3">Anonymous to Everyone</option>
            </select>
          </div>
          <div class="flex items-center gap-4 pl-40">
            <button class="rounded px-4 py-2 border">Post</button>
            <button class="rounded px-4 py-2 border">Save Draft</button>
            <button class="rounded px-4 py-2 border">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
