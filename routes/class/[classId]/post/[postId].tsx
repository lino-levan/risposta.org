import { RouteContext } from "$fresh/server.ts";
import { getUser } from "lib/get_user.ts";
import { redirect, unauthorized } from "lib/response.ts";
import { supabase } from "lib/db.ts";
import { Vote } from "islands/Vote.tsx";
import { bad } from "lib/response.ts";

export default async function Dashboard(req: Request, ctx: RouteContext) {
  // TODO(lino-levan): Clean up
  const user = await getUser(req);
  if (!user) return redirect("/login");
  const { data: postData, error } = await supabase.from("posts").select("*").eq(
    "id",
    ctx.params.postId,
  );
  if (error) throw ":(";
  const post = postData[0];

  //(Matt) - Pulling comments from supabase?? Waiting for comment functionality.
  /*
  const { data} = await supabase
  .from('posts')
  .select(`
    *,
    member_id!inner(*),
    comments:comments!inner(*)
  `)
  .eq('member_id.class_id', 10);

  if (error) {
  console.error('Error: ', error);
} else {
  console.log('Data: ', data);
}
  */

  const { count: upvoteCount } = await supabase.from("votes").select("*", {
    count: "exact",
  }).eq("upvote", true).eq("post_id", ctx.params.postId);
  const { count: downvoteCount } = await supabase.from("votes").select("*", {
    count: "exact",
  }).eq("upvote", false).eq("post_id", ctx.params.postId);
  const votes = (upvoteCount ?? 0) - (downvoteCount ?? 0);

  // Get member who is opening the page
  const { data: memberData, error: memberError } = await supabase.from(
    "members",
  ).select("*").eq("user_id", user.id).eq("class_id", ctx.params.classId);
  if (memberError) return unauthorized();
  const member = memberData[0];

  // Checked the voted state
  const { data } = await supabase.from("votes").select("*").eq(
    "member_id",
    member.id,
  ).eq("post_id", ctx.params.postId);
  const voted = data === null || data.length === 0
    ? 0
    : (data[0].upvote ? 1 : -1);

  return (
    <div class="w-full h-full p-4 flex flex-col gap-2">
      <div class="bg-white p-4 rounded">
        <div class="flex items-center gap-4">
          <Vote votes={votes} voted={voted} postId={post.id} />
          <div class="flex flex-col">
            <h2 class="text-zinc-400 text-xs">
              Posted by Lino Le Van 7 hours ago
            </h2>
            <h1 class="font-bold text-3xl">{post.title}</h1>
            <div class="flex gap-2 pt-2">
              <p class="text-xs bg-black text-white px-2 rounded">Lab 1</p>
              <p class="text-xs bg-black text-white px-2 rounded">Lab 2</p>
            </div>
          </div>
        </div>
        <p class="pl-8">{post.content}</p>
      </div>
    </div>
  );
}
