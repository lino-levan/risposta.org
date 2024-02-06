import { RouteContext } from "$fresh/server.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  return (
    <div class="bg-white p-20 rounded">
      <h1 class="text-2xl font-bold mb-4">
        Welcome to the class
      </h1>
      <p class="text-gray-500">This is the dashboard.</p>
    </div>
  );
}
