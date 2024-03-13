import { getUser } from "db/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <>
      <header className="w-screen p-4 fixed flex items-center justify-between bg-base-100 z-10">
        <div className="flex items-center max-w-screen-md">
          <a href="/" className="font-titan-one text-xl uppercase ml-12">
            Risposta
          </a>
        </div>
        <div className="mr-4 flex gap-4">
          <a href="/login" className="btn btn-secondary">
            Log In
          </a>
          <a
            href="/signup"
            className="btn btn-primary"
          >
            Sign Up
          </a>
        </div>
      </header>

      <section className="bg-base-100 text-primary py-72 px-12 text-center lg:text-left w-screen overflow-hidden relative">
        <div className="container max-w-screen-md">
          <h1 className="text-6xl font-bold mb-8">Welcome to Risposta</h1>
          <p className="text-2xl mb-10">
            The education platform you've been waiting for.
          </p>
          <div className="flex space-x-8 justify-center lg:justify-start">
            <a
              href="/signup"
              className="btn"
            >
              Continue as Student
            </a>
            <a
              href="/signup"
              className="btn"
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

      <section className="py-16 px-8 text-center bg-base-200">
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

      <section className="py-16 px-8 text-center bg-base-100">
        <div className="container mx-auto max-w-screen-md">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-8">
            Risposta is designed to empower both students and instructors in the
            educational journey. Our platform offers advanced tools for
            collaboration, interactive learning, and seamless communication.
          </p>
        </div>
      </section>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© 2024 Risposta Authors. All rights reserved.</p>
        </aside>
      </footer>
    </>
  );
}
