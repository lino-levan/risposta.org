import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Login(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <>
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
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-bl from-blue-500 to-green-500">
        <div className="h-3/5 w-2/6 bg-white rounded-lg shadow-md p-16 flex flex-col items-center relative">
          {/* New text element */}
          <a href="/" className="font-titan-one text-2xl uppercase mt-0 mb-6">
            Risposta
          </a>
          <div className="text-center mb-4">
            <h1 className="text-6xl font-bold mb-4">Welcome Back!</h1>
            <p>We missed you. Sign in to continue.</p>
          </div>
          <a
            href="/api/auth/login"
            className="px-4 py-2 border rounded flex items-center gap-4 bg-green-700 text-white hover:bg-blue-500 transition-all mt-8"
          >
            <GoogleIcon /> Sign In with Google
          </a>
          {/* "Don't have an account?" link */}
          <div className="absolute bottom-12 left-0 w-full text-center mt-4">
            <p className="text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
