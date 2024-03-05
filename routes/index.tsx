import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function Home(req: Request) {
  const user = await getUser(req);
  if (user) return redirect("/class");

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="w-screen p-4 shadow fixed flex items-center justify-between bg-green-100">
        <div className="flex items-center max-w-screen-md">
          {/* Adjust width */}
          <a href="/" className="font-titan-one text-xl uppercase ml-12">
            Risposta
          </a>
          <nav className="ml-8">
            <a href="/tab1" className="mx-2 text-gray-700 hover:text-blue-700">
              Tab 1
            </a>
            <a href="/tab2" className="mx-2 text-gray-700 hover:text-blue-700">
              Tab 2
            </a>
            <a href="/tab2" className="mx-2 text-gray-700 hover:text-blue-700">
              Tab 3
            </a>
            <a href="/tab2" className="mx-2 text-gray-700 hover:text-blue-700">
              Tab 4
            </a>
            {/* Add more tabs as needed */}
          </nav>
        </div>
        <div className="mr-4">
          <a
            href="/signup"
            className="mr-2 text-gray-700 hover:text-blue-700 mr-4"
          >
            Sign Up
          </a>
          <a href="/login" className="text-gray-700 hover:text-blue-700 mr-4">
            Log In
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-500 to-blue-400 text-white py-72 px-12 text-center">
        <div className="container mx-auto max-w-screen-md">
          <h1 className="text-7xl font-bold mb-8">Welcome to Risposta</h1>
          <p className="text-2xl mb-10">
            The education platform you've been waiting for.
          </p>
          <div className="flex justify-center space-x-8">
            {/* Adjust the space between buttons */}
            <a
              href="/signup"
              className="btn btn-primary border rounded-lg flex items-center px-8 py-2 text-xl font-semibold text-black bg-white hover:bg-blue-400"
            >
              Continue as Student
            </a>
            <a
              href="/signup"
              className="btn btn-secondary border rounded-lg flex items-center px-8 py-2 text-xl font-semibold text-black bg-white hover:bg-blue-400"
            >
              Continue as Teacher
            </a>
          </div>
        </div>
      </section>

      {/* key features */}
      <section className="py-16 px-8 text-center bg-white">
        <div className="container mx-auto max-w-screen-md">
          {/* Adjust width */}
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <div className="flex justify-between">
            <div className="w-1/3">
              {/* Image 1 */}
              <img src="image1.jpg" alt="Image 1" className="w-full mb-4" />
              <p className="text-lg">Description for Image 1</p>
            </div>
            <div className="w-1/3">
              {/* Image 2 */}
              <img src="image2.jpg" alt="Image 2" className="w-full mb-4" />
              <p className="text-lg">Description for Image 2</p>
            </div>
            <div className="w-1/3">
              {/* Image 3 */}
              <img src="image3.jpg" alt="Image 3" className="w-full mb-4" />
              <p className="text-lg">Description for Image 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 text-center">
        <div className="container mx-auto max-w-screen-md">
          {/* Adjust width */}
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-8">
            Risposta is designed to empower both students and teachers in the
            educational journey. Our platform offers advanced tools for
            collaboration, interactive learning, and seamless communication.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-8 text-center">
        <div className="container mx-auto max-w-screen-md">
          {/* Adjust width */}
          <h2 className="text-3xl font-bold mb-4">Extra tab1</h2>
          <p className="text-lg mb-8">
            Discover the features that make Risposta the perfect choice for your
            educational needs.
          </p>
          {/* Add feature highlights here */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 text-center">
        <div className="container mx-auto max-w-screen-md">
          {/* Adjust width */}
          <h2 className="text-3xl font-bold mb-4">Extra tab2</h2>
          <p className="text-lg mb-8">
            descriptions2
          </p>
          {/* Add testimonials here */}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-green-100 text-gray-700 py-8 px-4 text-center">
        <div className="container mx-auto max-w-screen-md">
          {/* Adjust width */}
          <p>&copy; 2024 Risposta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
