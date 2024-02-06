import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

import { bad } from "lib/response.ts";
import { supabase } from "lib/db.ts";

export default async function Dashboard(req: Request) {
  const user = await getUser(req);
  if (!user) return redirect("/login");
  console.log(user);

  // Get member who is opening the page
  const { data, error } = await supabase
    .from("members")
    .select("*, class_id!inner(*)")
    .eq("user_id", user.id);
  if (error) return bad();

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
          {data.map(({ class_id }) => (
            <a
              href={`/class/${class_id.id}`}
              class="border px-4 py-2 flex items-center justify-between hover:bg-gray-100"
            >
              <img
                class="w-8 h-8 rounded-full"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                  encodeURIComponent(class_id.name)
                }`}
              />
              <p>{class_id.name}</p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
