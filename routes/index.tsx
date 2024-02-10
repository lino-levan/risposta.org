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
