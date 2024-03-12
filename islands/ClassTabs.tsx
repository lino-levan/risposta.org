import { useSignal } from "@preact/signals";
import type { Tables } from "lib/supabase_types.ts";
import type { ClassMember } from "db/get_class_members.ts";
import { ClassMembers } from "islands/ClassMembers.tsx";
import { ClassSettings } from "islands/ClassSettings.tsx";
import { ClassInvites } from "islands/ClassInvites.tsx";
import { ClassTags } from "islands/ClassTags.tsx";

interface ClassTabsProps {
  class_id: number;
  class_name: string;
  class_description: string;
  class_ai: boolean;
  tags: Tables<"tags">[];
  members: ClassMember[];
  invites: string[];
}

export function ClassTabs(props: ClassTabsProps) {
  const activeTab = useSignal("Settings");

  return (
    <div class="h-full w-full max-w-screen-md flex flex-col gap-4 p-4 overflow-y-auto">
      <div class="tabs tabs-boxed shadow">
        <button
          onClick={() => activeTab.value = "Settings"}
          class={"tab " + (activeTab.value === "Settings" ? "tab-active" : "")}
        >
          Settings
        </button>
        <button
          onClick={() => activeTab.value = "Tags"}
          class={"tab " + (activeTab.value === "Tags" ? "tab-active" : "")}
        >
          Tags
        </button>
        <button
          onClick={() => activeTab.value = "Invites"}
          class={"tab " + (activeTab.value === "Invites" ? "tab-active" : "")}
        >
          Invites
        </button>
        <button
          onClick={() => activeTab.value = "Members"}
          class={"tab " + (activeTab.value === "Members" ? "tab-active" : "")}
        >
          Members
        </button>
      </div>

      {activeTab.value === "Settings" && (
        <ClassSettings
          classId={props.class_id}
          name={props.class_name}
          description={props.class_description}
          ai={props.class_ai}
        />
      )}

      {activeTab.value === "Tags" && (
        <ClassTags
          classId={props.class_id}
          tags={props.tags}
        />
      )}

      {activeTab.value === "Invites" && (
        <>
          <ClassInvites
            classId={props.class_id}
            invites={props.invites}
          />
        </>
      )}

      {activeTab.value === "Members" && (
        <ClassMembers classId={props.class_id} members={props.members} />
      )}
    </div>
  );
}
