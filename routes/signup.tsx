import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "db/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Signup(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <div class="bg-base-100 min-h-screen flex flex-col">
      <header class="w-screen p-4 fixed flex items-center justify-between bg-base-100">
        <a href="/" class="font-titan-one text-xl uppercase ml-12">
          Risposta
        </a>
      </header>
      <div class="flex-grow flex justify-center items-center p-4">
        <div class="bg-base-200 rounded-lg shadow-md relative max-w-screen-md w-full grid lg:grid-cols-3">
          <div class="flex flex-col gap-4 p-4 justify-center items-center h-full col-span-2">
            <a
              href="/"
              class="font-titan-one text-2xl uppercase text-left w-full"
            >
              Risposta
            </a>
            <h1 class="text-6xl mt-auto pt-32">Sign up</h1>
            <div class="text-lg text-center flex flex-col gap-4">
              <p>We're happy you're here.</p>
              <a
                href="/api/auth/login"
                class="btn btn-primary flex items-center gap-4"
              >
                <GoogleIcon /> Continue with Google
              </a>
            </div>
            <div class="mt-auto w-full text-center pt-32">
              <p class="text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  class="link"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>

          <div class="h-full bg-base-300 hidden lg:flex justify-center items-center flex-col gap-4 text-center text-gray-500">
            <img src="/threads.png" alt="Threads" class="mb-6 p-2" />
            <p>
              Collaborative learning platform
            </p>
            <p>
              Student-instructor interaction
            </p>
            <p>
              Organized forum and course discussions
            </p>
            <p>Plus much more...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
