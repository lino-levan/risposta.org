import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Signup(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <div className="bg-green-300 min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="w-screen p-4 shadow fixed flex items-center justify-between bg-green-100">
        <a href="/" className="font-titan-one text-xl uppercase ml-12">
          Risposta
        </a>
        <div className="mr-4">
          <a href="/" className="mr-2 text-gray-700 hover:text-blue-700 mr-4">
            Back to Home
          </a>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex-grow flex justify-center items-center">
        <div
          className="w-3/5 bg-white rounded-lg shadow-md p-16 relative"
          style={{ height: "70vh" }}
        >
          {/* Add the link here */}
          <a
            href="/"
            className="font-titan-one text-3xl uppercase absolute top-5 left-10"
          >
            Risposta
          </a>

          {/* Content aligned to the middle of the left 2/3 part */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center items-center w-2/3 h-full">
            <h1 className="text-6xl mb-17">Sign up</h1>
            <p className="text-lg text-center mb-28">
              We're happy you're here.
            </p>
            <a
              href="/api/auth/login"
              className="px-4 py-2 border rounded flex items-center gap-4 hover:bg-gray-200 transition-all absolute bottom-1/2 transform translate-y-1/2"
            >
              <GoogleIcon /> Continue with Google
            </a>
          </div>

          {/* Grey area */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gray-200">
          </div>
        </div>
      </div>
    </div>
  );
}
