import MyIsland from "../islands/my-island.tsx";

export default function Home() {
  return (
    <>
      <nav class="w-screen p-4 shadow fixed flex justify-between items-center">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        <div class="flex gap-4">
          <a href="/signup">Sign Up</a>
          <a href="/login">Log In</a>
        </div>
      </nav>
      <main class="w-screen h-screen flex flex-col justify-center items-center">
        <h1 class="font-titan-one text-8xl text-center uppercase mb-4">Edit Posts</h1>
        <MyIsland />
        <a href="/api/auth/editing" class="mt-4 px-4 py-2 border rounded hover:bg-gray-200 transition-all">
          Click here
        </a>
      </main>
    </>
  );
}