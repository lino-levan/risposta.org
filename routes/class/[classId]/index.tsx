import { RouteContext } from "$fresh/server.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  return (
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-green-200 to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h1 class="text-2xl font-bold mb-4">
          Welcome to the class
        </h1>
        <p class="text-gray-500 font-titan-one">This is the dashboard.</p>
      </div>
    </div>
  );
}
