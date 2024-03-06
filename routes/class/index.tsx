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
    <div class="flex flex-col items-center px-4 pt-16 w-screen h-screen bg-base-100">
      <div class="max-w-screen-lg w-full flex flex-col gap-4">
        <h1 class="text-4xl font-bold">Classes</h1>
        <div class="flex gap-2">
          <a
            class="btn"
            href="/class/create"
          >
            Create class
          </a>
          <a
            class="btn"
            href="/class/join_class"
          >
            Join class
          </a>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((course) => (
            <a
              href={`/class/${course.id}`}
              class="rounded-lg px-4 py-2 flex flex-col bg-base-200 hover:shadow-lgrounded"
            >
              <div class="flex items-center justify-between w-full">
                <img
                  class="w-8 h-8 rounded-full"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                    encodeURIComponent(course.name)
                  }`}
                />
                <p class="font-bold text-xl">{course.name}</p>
              </div>
              {course.description && (
                <p class="pl-8 text-right">{course.description}</p>
              )}
              {!course.description && (
                <p class="pl-8 text-right">No description for this course...</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
