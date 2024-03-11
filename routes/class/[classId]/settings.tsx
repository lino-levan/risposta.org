import { FreshContext } from "$fresh/server.ts";
import type { ClassState } from "lib/state.ts";
import { UpdateClassForm } from "islands/UpdateClass.tsx";
import { Fragment } from "preact";
import { MemberList } from "islands/ClassMemberList.tsx";
import { getClassTags } from "lib/get_class_tags.ts";
import { getAllMembers } from "lib/get_member.ts";

export default async function Dashboard(
  req: Request,
  ctx: FreshContext<ClassState>,
) {
  //check valid access
  if (ctx.state.member.role !== "instructor") return ctx.renderNotFound();

  //fetch all tags
  const tagsData = await getClassTags(ctx.state.class.id);
  if (!tagsData) return ctx.renderNotFound();

  //fetch all members
  const membersData = await getAllMembers(ctx.state.class.id);
  if (!membersData) return ctx.renderNotFound();

  const url = new URL(req.url);
  const activeTab = url.searchParams.get("tab") || "classInfo";

  return (
    <div
      class="tabs tabs-boxed bg-base-100"
      style={{ minWidth: "600px", minHeight: "400px" }}
    >
      <div class="tabs tabs-boxed bg-white shadow">
        <a
          href="?tab=classInfo"
          class={"tab " + (activeTab === "classInfo" ? "tab-active" : "")}
        >
          Settings
        </a>
        <a
          href="?tab=memberManage"
          class={"tab " + (activeTab === "memberManage" ? "tab-active" : "")}
        >
          Manage Members
        </a>
      </div>

      {activeTab === "classInfo" && (
        <Fragment>
          <h1 class="text-2xl pb-4 font-bold w-full">Class Settings</h1>
          <UpdateClassForm
            classId={ctx.state.class.id}
            name={ctx.state.class.name || "Class Name"}
            tags={tagsData}
          />
        </Fragment>
      )}

      {activeTab === "memberManage" && (
        <Fragment>
          <h2 class="text-xl pt-4 pb-2 font-bold w-full">
            Manage Class Members
          </h2>
          <MemberList classId={ctx.state.class.id} members={membersData} />{" "}
          {/*Can't get this warning off*/}
        </Fragment>
      )}
    </div>
  );
}
