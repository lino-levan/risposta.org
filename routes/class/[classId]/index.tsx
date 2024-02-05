import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";
import { RouteContext } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { bad } from "lib/response.ts";
import { getClass } from "lib/get_class.ts";
import { getMembership } from "lib/membership.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  const user = await getUser(req);
  if (!user) return redirect("/login");

  //Defining supabase data
  /*
  const { data: postData, error: postError } = await supabase.from(
    "posts",
  ).select("*").eq("id", postId);
  if (postError || postData.length === 0 || postData.length > 1) return bad();
  const post = postData[0];
    */

  const { data, error } = await supabase
    .from("posts")
    .select("*, member_id!inner(*)")
    .eq("member_id.class_id", 10);

  if (error) return bad();
  //console.log(data, error);

  //Dummy items
  //const items = Array(15).fill(0).map((_, i) => `Question ${i + 1}`);

  //get current user member state
  const member = await getMembership(user.id, ctx.params.classId);
  console.log("In class:", member);
  if (!member) return redirect("./no_access");

  const classData = await getClass(ctx.params.classId);

  return (
    <>
      <header class="bg-green-300 text-white shadow w-full py-4 px-6 flex items-center justify-between">
        <a href="/" class="font-titan-one text-xl uppercase">Risposta</a>
        {member.role === "teacher" && (
          <a
            href={`/class/${ctx.params.classId}/setting`}
          >
            Manage Class
          </a>
        )}
        <a
          href="/dashboard/user"
          class="flex items-center gap-2 p-2 hover:bg-green-500 rounded transition-colors duration-200"
        >
          <img class="w-8 h-8 rounded-full" src={user.picture} />
          <span>{user.name}</span>
        </a>
      </header>
      <div class="flex">
        <aside class="bg-green-200 w-64 p-4 overflow-y-auto h-screen">
          <h2 class="font-titan-one text-xl uppercase">Question Board</h2>
          <a
            href={`/class/${ctx.params.classId}/create`}
            class=" font-titan-one block py-6 px-3 text-xl rounded hover:bg-green-300 border-2 border-white mb-4 mt-2"
          >
            Create Post
          </a>
          <ul class="mt-4">
            {data.map((item, index) => (
              <li key={index} class="border-b border-white w-3/4 mx-auto">
                <a
                  href={`/class/${item.member_id}/post/${item.id}`}
                  class="block py-6 px-3 text-xl rounded hover:bg-green-300"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <main class="flex-1 bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="absolute inset-0 bg-gradient-to-r from-green-200 to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <h1 class="text-2xl font-bold mb-4">
                Welcome to {classData?.name}
              </h1>
              <p class="text-gray-500 font-titan-one">This is the dashboard.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
