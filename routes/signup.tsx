import GoogleIcon from "icons/brand-google-filled.tsx";
import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Signup(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  // Define the login endpoint
  const loginEndpoint = "/api/auth/login";

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
            className="font-titan-one text-2xl uppercase absolute top-5 left-10"
          >
            Risposta
          </a>

          {/* Content aligned to the middle of the left 2/3 part */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center items-center w-2/3 h-full">
            <h1 className="text-6xl mb-4">Sign up</h1>
            {/* Container for text and button */}
            <div className="text-lg text-center mb-10">
              {/* Apply grey color to the text */}
              <p className="text-gray-600">We're happy you're here.</p>
              {/* Continue with Google button */}
              <a
                href="/api/auth/login"
                className="bg-green-700 text-white px-4 py-2 border rounded flex items-center gap-4 hover:bg-blue-400 transition-all mt-2"
              >
                <GoogleIcon /> Continue with Google
              </a>
              <div className="absolute bottom-0 left-0 w-full text-center mb-6">
                <p className="text-gray-500 mb-4">Already have an account?</p>
                {/* Link the Log in button to the login endpoint */}
                <a href="/login" className="bg-gray-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                  Log in
                </a>
              </div>
            </div>
          </div>

          {/* Grey area */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gray-200 flex justify-center items-center flex-col">
            {/* Image */}
            <img src="your-image-url.jpg" alt="Your Image" className="mb-6" />

            {/* Descriptions */}
            <div className="text-center">
              <p className="text-gray-500 mb-4">Collaborative learning platform</p>
              <p className="text-gray-500 mb-4">Student-instructor interaction</p>
              <p className="text-gray-500 mb-4">Organized forum and course discussions</p>
              <p className="text-gray-500 mb-4">Plus much more...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
