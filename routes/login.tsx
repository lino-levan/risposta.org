import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Login(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <>
      <header className="w-screen p-4 fixed flex items-center justify-between bg-base-100">
        <a href="/" className="font-titan-one text-xl uppercase ml-12">
          Risposta
        </a>
      </header>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-base-100 p-4">
        <div className="bg-base-200 rounded-lg shadow-md p-4 lg:p-16 flex flex-col items-center gap-4 text-center">
          <a href="/" className="font-titan-one text-2xl uppercase py-8">
            Risposta
          </a>
          <h1 className="text-6xl font-bold">Welcome Back!</h1>
          <p>We missed you. Sign in to continue.</p>
          <a
            href="/api/auth/login"
            className="btn btn-primary"
          >
            <GoogleIcon /> Sign In with Google
          </a>
          <p className="text-gray-500 w-full text-center mt-8">
            Don't have an account?{" "}
            <a href="/signup" className="link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
