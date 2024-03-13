import { FreshContext } from "$fresh/server.ts";
import type { DashboardState } from "lib/state.ts";
import { getUserClasses } from "db/get_user_classes.ts";
import { bad } from "lib/response.ts";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<DashboardState>,
) {
  const classes = await getUserClasses(ctx.state.user.id);
  if (!classes) return bad();

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
            href="/class/join"
          >
            Join class
          </a>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((course) => (
            <a
              href={`/class/${course.id}`}
              class="rounded-lg px-4 py-2 flex flex-col bg-base-200 hover:bg-base-300"
            >
              <div class="flex items-center justify-between w-full">
                <img
                  class="w-8 h-8 rounded-full"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                    encodeURIComponent(course.name)
                  }`}
                />
                <p class="font-bold text-xl truncate">{course.name}</p>
              </div>
              {course.description && (
                <p class="pl-10 text-right truncate">{course.description}</p>
              )}
              {!course.description && (
                <p class="pl-10 text-right">
                  No description for this course...
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
