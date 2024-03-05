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
      <div class="flex flex-col items-center justify-center pt-16 w-screen h-screen bg-white">
        <div class="p-20 bg-green-200 rounded flex flex-col gap-2 shadow-lg">
          <h1 class="font-titan-one text-xl text-black">Welcome to the Dashboard</h1>
          <div class="grid grid-cols-2 gap-2">
            <a
              class="border-green-200 flex-grow px-4 py-2 flex justify-center bg-green-300 hover:bg-green-500 text-black rounded"
              href="/class/create_class"
            >
              Create class
            </a>
            <a
              class="border-green-200 flex-grow px-4 py-2 flex justify-center bg-green-300 hover:bg-green-500 text-black rounded"
              href="/class/join_class"
            >
              Join class
            </a>
          </div>
          {classes.map((course) => (
            <a
              href={`/class/${course.id}`}
              class="border-green-200 px-4 py-2 flex items-center justify-between bg-green-300 hover:bg-green-500 text-black rounded"
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