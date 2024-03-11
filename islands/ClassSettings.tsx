import { useSignal } from "@preact/signals";
import { Database } from "lib/supabase_types.ts";
import { MemberList } from "islands/ClassMemberList.tsx";
import type { ClassMember } from "lib/get_class_members.ts";
import { UpdateClassForm } from "islands/UpdateClass.tsx";

interface ClassSettings {
  class_id: number;
  class_name: string;
  tags: Database["public"]["Tables"]["tags"]["Row"][];
  members: ClassMember[];
}

export function ClassSettings(props: ClassSettings) {
  const activeTab = useSignal("class");

  return (
    <div class="h-full w-full max-w-screen-md flex flex-col gap-4 p-4">
      <div class="tabs tabs-boxed shadow">
        <button
          onClick={() => activeTab.value = "class"}
          class={"tab " + (activeTab.value === "class" ? "tab-active" : "")}
        >
          Settings
        </button>
        <button
          onClick={() => activeTab.value = "members"}
          class={"tab " + (activeTab.value === "members" ? "tab-active" : "")}
        >
          Manage Members
        </button>
      </div>

      {activeTab.value === "class" && (
        <>
          <h1 class="text-xl font-bold">Class Settings</h1>
          <UpdateClassForm
            classId={props.class_id}
            name={props.class_name || "Class Name"}
            tags={props.tags}
          />
        </>
      )}

      {activeTab.value === "members" && (
        <>
          <h2 class="text-xl font-bold">
            Manage Class Members
          </h2>
          <MemberList classId={props.class_id} members={props.members} />
        </>
      )}
    </div>
  );
}
