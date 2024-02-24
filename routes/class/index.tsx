import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";
import { Tables } from "lib/supabase_types.ts";
import { bad } from "lib/response.ts";
import { supabase } from "lib/db.ts";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  // Get member who is opening the page
  const { data, error } = await supabase
    .from("members")
    .select("*, class_id!inner(*)")
    .eq("user_id", ctx.state.user.id);
  if (error) return bad();

  // This spooky code exists to extract classes from our join
  // We have to convince typescript that this is okay, we know it's okay
  const classes = data.map((row) => row.class_id) as unknown as Tables<
    "classes"
  >[];

  return (
    <>
      <div class="flex flex-col items-center justify-center pt-16 w-screen h-screen bg-gray-100">
        <div class="p-20 bg-white rounded flex flex-col gap-2">
          <h1 class="text-2xl font-bold">Welcome to the Dashboard</h1>
          <div class="grid grid-cols-2 gap-2">
            <a
              class="border flex-grow px-4 py-2 flex justify-center hover:bg-gray-100"
              href="/class/create_class"
            >
              Create class
            </a>
            <a
              class="border flex-grow px-4 py-2 flex justify-center hover:bg-gray-100"
              href="/class/join_class"
            >
              Join class
            </a>
          </div>
          {classes.map((course) => (
            <a
              href={`/class/${course.id}`}
              class="border px-4 py-2 flex items-center justify-between hover:bg-gray-100"
            >
              <img
                class="w-8 h-8 rounded-full"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                  encodeURIComponent(course.name)
                }`}
              />
              <p>{course.name}</p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
