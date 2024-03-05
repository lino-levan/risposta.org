import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Signup(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <div className="bg-green-300 min-h-screen flex flex-col">
      <header className="w-screen p-4 shadow fixed flex items-center justify-between bg-green-100">
        <a href="/" className="font-titan-one text-xl uppercase ml-12">
          Risposta
        </a>
      </header>

      <div className="flex-grow flex justify-center items-center p-4">
        <div className="max-w-screen-md w-full bg-white rounded-lg shadow-md p-16 py-48 relative">
          <div className="flex flex-col gap-2 items-center h-full">
            <h1 className="text-6xl text-center">Sign up</h1>
            <p className="text-lg text-center">
              We're happy you're here.
            </p>
            <a
              href="/api/auth/login"
              className="px-4 py-2 border rounded flex items-center gap-4 w-max hover:bg-gray-200 transition-all"
            >
              <GoogleIcon /> Continue with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
