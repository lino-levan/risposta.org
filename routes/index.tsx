import { getUser } from "db/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <>
      <header class="w-screen p-4 fixed flex items-center justify-between bg-base-100 z-10">
        <div class="flex items-center max-w-screen-md">
          <a href="/" class="font-titan-one text-xl uppercase ml-12">
            Risposta
          </a>
        </div>
        <div class="mr-4 flex gap-4">
          <a href="/login" class="btn btn-secondary">
            Log In
          </a>
          <a
            href="/signup"
            class="btn btn-primary"
          >
            Sign Up
          </a>
        </div>
      </header>

      <section class="bg-base-100 text-primary py-72 px-12 text-center lg:text-left w-screen overflow-hidden relative">
        <div class="container max-w-screen-md">
          <h1 class="text-6xl font-bold mb-8">Welcome to Risposta</h1>
          <p class="text-2xl mb-10">
            The education platform you've been waiting for.
          </p>
          <div class="flex space-x-8 justify-center lg:justify-start">
            <a
              href="/signup"
              class="btn"
            >
              Continue as Student
            </a>
            <a
              href="/signup"
              class="btn"
            >
              Continue as Instructor
            </a>
          </div>
        </div>
        <img
          src="/screenshot.png"
          class="hidden lg:block absolute h-[600px] rounded-lg shadow-lg left-2/3 top-24"
        />
      </section>

      <section class="py-16 px-8 text-center bg-base-200">
        <div class="container mx-auto max-w-screen-md">
          <h2 class="text-3xl font-bold mb-4">Key Features</h2>
          <div class="grid grid-cols-3 gap-3">
            <img
              src="/google.png"
              alt="Image 1"
              class="w-full mb-4 rounded-lg"
            />
            <img
              src="/theme.png"
              alt="Image 2"
              class="w-full mb-4 rounded-lg"
            />
            <img
              src="/threads.png"
              alt="Image 3"
              class="w-full mb-4 rounded-lg"
            />
            <p class="text-lg">Sign in with Google!</p>
            <p class="text-lg">Choose any theme you like!</p>
            <p class="text-lg">Create threads and get AI responses!</p>
          </div>
        </div>
      </section>

      <section class="py-16 px-8 text-center bg-base-100">
        <div class="container mx-auto max-w-screen-md">
          <h2 class="text-3xl font-bold mb-4">About Us</h2>
          <p class="text-lg mb-8">
            Risposta is designed to empower both students and instructors in the
            educational journey. Our platform offers advanced tools for
            collaboration, interactive learning, and seamless communication.
          </p>
        </div>
      </section>
      <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© 2024 Risposta Authors. All rights reserved.</p>
        </aside>
      </footer>
    </>
  );
}
