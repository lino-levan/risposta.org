import { FreshContext } from "$fresh/server.ts";
import { Database } from "lib/supabase_types.ts";
import type { DashboardState } from "lib/state.ts";
import IconX from "icons/x.tsx";

interface UserDetail {
  name: string;
  picture: string;
}

export interface MemberListProps {
  classId: number;
  members: (Database["public"]["Tables"]["members"]["Row"] & {
    user_id: UserDetail;
  })[];
}

function groupMembersByRole(
  members: Database["public"]["Tables"]["members"]["Row"][],
) {
  return members.reduce(
    (
      acc: Record<string, Database["public"]["Tables"]["members"]["Row"][]>,
      member,
    ) => {
      (acc[member.role] = acc[member.role] || []).push(member);
      return acc;
    },
    {},
  );
}

export function MemberList(
  props: MemberListProps,
  ctx: FreshContext<DashboardState>,
) {
  const members = props.members;

  const groupedMembers = groupMembersByRole(members);
  const handleAction = async (
    memberId: number,
    action: "remove" | "makeTA" | "removeTA",
  ) => {
    console.log(`Action: ${action}, Member ID: ${memberId}`);
  };

  return (
    <div>
      {Object.entries(groupedMembers).map(([role, members]) => (
        <div key={role}>
          <h3>{`${role} (${members.length})`}</h3>
          <ul>
            {members.map((member) => (
              <div key={member.id} class="flex items-center gap-4">
                {/* Render user's picture and name */}
                <img
                  src={member.user_id.picture}
                  alt="Profile Picture"
                  class="w-6 h-6 rounded-full"
                />
                <p>{member.user_id.name}</p>
                <div>
                  <button
                    onClick={() =>
                      handleAction(member.id, "remove")}
                  >
                    Remove from Class
                  </button>
                  {role !== "TA" && role !== "teacher" && (
                    <button onClick={() => handleAction(member.id, "makeTA")}>
                      /Make TA
                    </button>
                  )}
                  {role === "TA" && (
                    <button onClick={() => handleAction(member.id, "removeTA")}>
                      Remove TA Role
                    </button>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}