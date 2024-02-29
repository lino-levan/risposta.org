import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { getClass } from "lib/get_class.ts";
import { getMembership } from "lib/get_member.ts";
import { getClassTags } from "lib/get_class_tags.ts";

export async function handler(
  _: Request,
  ctx: FreshContext<ClassState>,
) {
  const classId = parseInt(ctx.params.classId);

  //not a member of this class
  const member = await getMembership(ctx.state.user.id, classId);
  if (!member) return ctx.renderNotFound();
  ctx.state.member = member;

  const classRes = await getClass(classId);
  if (!classRes) return ctx.renderNotFound();
  ctx.state.class = classRes;

  const tagsRes = await getClassTags(classId);
  if (!tagsRes) return ctx.renderNotFound();
  ctx.state.tags = tagsRes;

  return await ctx.next();
}
