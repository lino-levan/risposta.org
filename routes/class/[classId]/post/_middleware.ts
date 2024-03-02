import { FreshContext } from "$fresh/server.ts";
import type { PostState } from "lib/state.ts";
import { supabase } from "lib/db.ts";

export async function handler(
  _: Request,
  ctx: FreshContext<PostState>,
) {
  const { data: postData, error } = await supabase.from("expanded_posts").select("*").eq(
    "id",
    ctx.params.postId,
  ).eq("class_id", ctx.params.classId);
  if (error || !postData || postData.length === 0) return ctx.renderNotFound();
  ctx.state.post = postData[0];
  return await ctx.next();
}
