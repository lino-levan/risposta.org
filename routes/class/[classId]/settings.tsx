import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { ClassSettings } from "islands/ClassSettings.tsx";
import { getClassTags } from "lib/get_class_tags.ts";
import { getClassMembers } from "lib/get_class_members.ts";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  //check valid access
  if (ctx.state.member.role !== "instructor") return ctx.renderNotFound();

  //fetch all tags
  const tags = await getClassTags(ctx.state.class.id);
  if (!tags) return ctx.renderNotFound();

  //fetch all members
  const members = await getClassMembers(ctx.state.class.id);
  if (!members) return ctx.renderNotFound();

  return (
    <ClassSettings
      class_id={ctx.state.class.id}
      class_name={ctx.state.class.name}
      tags={tags}
      members={members}
    />
  );
}
