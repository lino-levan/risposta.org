import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Signup(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      <header className="w-screen p-4 fixed flex items-center justify-between bg-base-100">
        <a href="/" className="font-titan-one text-xl uppercase ml-12">
          Risposta
        </a>
      </header>
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="bg-base-200 rounded-lg shadow-md relative max-w-screen-md w-full grid lg:grid-cols-3">
          <div className="flex flex-col gap-4 p-4 justify-center items-center h-full col-span-2">
            <a
              href="/"
              className="font-titan-one text-2xl uppercase text-left w-full"
            >
              Risposta
            </a>
            <h1 className="text-6xl mt-auto pt-32">Sign up</h1>
            <div className="text-lg text-center flex flex-col gap-4">
              <p>We're happy you're here.</p>
              <a
                href="/api/auth/login"
                className="btn btn-primary flex items-center gap-4"
              >
                <GoogleIcon /> Continue with Google
              </a>
            </div>
            <div className="mt-auto w-full text-center pt-32">
              <p className="text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="link"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>

          <div className="h-full bg-base-300 hidden lg:flex justify-center items-center flex-col gap-4 text-center text-gray-500">
            <img src="your-image-url.jpg" alt="Your Image" className="mb-6" />
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
