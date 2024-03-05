import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="w-screen p-4 fixed flex items-center justify-between bg-green-100 z-10">
        <div className="flex items-center max-w-screen-md">
          <a href="/" className="font-titan-one text-xl uppercase ml-12">
            Risposta
          </a>
        </div>
        <div className="mr-4 flex gap-4">
          <a
            href="/signup"
            className="text-gray-700 hover:text-gray-500"
          >
            Sign Up
          </a>
          <a href="/login" className="text-gray-700 hover:text-gray-500">
            Log In
          </a>
        </div>
      </header>

      <section className="bg-green-100 text-green-800 py-72 px-12 text-center lg:text-left w-screen overflow-hidden relative">
        <div className="container max-w-screen-md">
          <h1 className="text-6xl font-bold mb-8">Welcome to Risposta</h1>
          <p className="text-2xl mb-10">
            The education platform you've been waiting for.
          </p>
          <div className="flex space-x-8 justify-center lg:justify-start">
            <a
              href="/signup"
              className="rounded-lg flex items-center px-8 py-2 text-xl font-semibold text-black bg-white hover:bg-gray-300"
            >
              Continue as Student
            </a>
            <a
              href="/signup"
              className="rounded-lg flex items-center px-8 py-2 text-xl font-semibold text-black bg-white hover:bg-gray-300"
            >
              Continue as Teacher
            </a>
          </div>
        </div>
        <img
          src="/screenshot.png"
          class="hidden lg:block absolute h-[600px] rounded-lg shadow-lg left-2/3 top-24"
        />
      </section>

      <section className="py-16 px-8 text-center bg-white">
        <div className="container mx-auto max-w-screen-md">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <div className="flex justify-between">
            <div className="w-1/3">
              <img src="image1.jpg" alt="Image 1" className="w-full mb-4" />
              <p className="text-lg">Description for Image 1</p>
            </div>
            <div className="w-1/3">
              <img src="image2.jpg" alt="Image 2" className="w-full mb-4" />
              <p className="text-lg">Description for Image 2</p>
            </div>
            <div className="w-1/3">
              <img src="image3.jpg" alt="Image 3" className="w-full mb-4" />
              <p className="text-lg">Description for Image 3</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 text-center">
        <div className="container mx-auto max-w-screen-md">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-8">
            Risposta is designed to empower both students and teachers in the
            educational journey. Our platform offers advanced tools for
            collaboration, interactive learning, and seamless communication.
          </p>
        </div>
      </section>
      <footer className="bg-green-100 text-gray-700 py-8 px-4 text-center">
        <div className="container mx-auto max-w-screen-md">
          <p>© 2024 Risposta Authors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
