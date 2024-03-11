import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { ClassTabs } from "islands/ClassTabs.tsx";
import { getClassTags } from "db/get_class_tags.ts";
import { getClassMembers } from "db/get_class_members.ts";
import { getClassInvites } from "db/get_class_invites.ts";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  //check valid access
  if (ctx.state.member.role !== "instructor") return ctx.renderNotFound();

  const [invites, tags, members] = await Promise.all([
    getClassInvites(ctx.state.class.id),
    getClassTags(ctx.state.class.id),
    getClassMembers(ctx.state.class.id),
  ]);
  if (!invites || !tags || !members) return ctx.renderNotFound();

  return (
    <ClassTabs
      class_id={ctx.state.class.id}
      class_name={ctx.state.class.name}
      class_description={ctx.state.class.description}
      class_ai={ctx.state.class.ai}
      invites={invites.map((invite) => invite.code)}
      members={members}
      tags={tags}
    />
  );
}
