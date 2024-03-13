import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <header class="w-screen p-4 fixed flex items-center justify-between bg-base-100 z-10">
        <div class="flex items-center max-w-screen-md">
          <a href="/" class="font-titan-one text-xl uppercase ml-12">
            Risposta
          </a>
        </div>
      </header>
      <div class="px-4 pt-16 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">404 - Page not found</h1>
          <p class="my-4">
            The page you were looking for doesn't exist.
          </p>
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
