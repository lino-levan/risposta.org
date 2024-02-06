import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Dashboard(req: Request) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  //Dummy items
  const items = Array(15).fill(0).map((_, i) => `Question ${i + 1}`);

  return (
    <>
      <header class="bg-green-300 text-white shadow w-full py-4 px-6 flex items-center justify-between">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <a
          href="/dashboard/user"
          class="flex items-center gap-2 p-2 hover:bg-green-500 rounded transition-colors duration-200"
        >
          <img class="w-8 h-8 rounded-full" src={user.picture} />
          <span>{user.name}</span>
        </a>
      </header>
      <div class="flex">
        <aside class="bg-green-200 w-64 p-4 overflow-y-auto h-screen">
          <h2 class="font-bold text-xl mb-4">Sidebar</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  class="block py-6 px-3 text-xl rounded hover:bg-green-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <main class="flex-1 bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="absolute inset-0 bg-gradient-to-r from-green-200 to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <h1 class="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
              <p class="text-gray-500">
                This is the dashboard. You can add more components or
                information here as needed.
                <a
                  class="border px-4 py-2 flex gap-2"
                  href="/dashboard/create_class"
                >
                  Create class as Instructor
                </a>
                <a
                  class="border px-4 py-2 flex gap-2"
                  href="/dashboard/join_class"
                >
                  Join class as Student (not implemented)
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
/*
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/dashboard");

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
