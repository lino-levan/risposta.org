import { bad } from "lib/response.ts";
import type { ClassMember } from "lib/get_class_members.ts";

export interface ClassMembersProps {
  classId: number;
  members: ClassMember[];
}

function groupMembersByRole(members: ClassMember[]) {
  return members.reduce(
    (acc: Record<string, ClassMember[]>, member) => {
      const roleGroup = acc[member.role] || [];
      roleGroup.push(member);
      acc[member.role] = roleGroup;
      return acc;
    },
    {},
  );
}

export function ClassMembers(props: ClassMembersProps) {
  const members = props.members;

  const groupedMembers = groupMembersByRole(members);

  const handleAction = async (
    memberId: number,
    action: "remove" | "makeTA" | "removeTA",
  ) => {
    let method = "";
    let body = {};

    switch (action) {
      case "remove":
        //remove from class
        method = "DELETE";
        body = { id: memberId };
        break;
      case "makeTA":
      case "removeTA": {
        //change TA/student role
        method = "PATCH";
        const role = action === "makeTA" ? "TA" : "student";
        console.log("role of switch to: ", role);
        body = { id: memberId, role: role };
        break;
      }
      default:
        return;
    }

    const response = await fetch("/api/class/[id]/member", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      //refresh page when succeed
      window.location.reload();
    } else {
      return bad();
    }
  };

  return (
    <div class="flex flex-col gap-4">
      <p class="text-xl w-full">Members</p>
      {Object.entries(groupedMembers).map(([role, members]) => (
        <div key={role} class="card bg-base-100 border">
          <div class="card-body">
            <h2 class="card-title capitalize">{role} ({members.length})</h2>
            <div class="divider"></div> {/* Divider for visual separation */}
            <div class="flex flex-wrap gap-4 justify-start">
              {members.map((member) => (
                <div
                  key={member.id}
                  class="dropdown dropdown-end border bg-base-200 rounded-badge"
                >
                  <div tabindex={0} class="flex gap-4 items-center p-2">
                    <img
                      src={member.user_id.picture}
                      alt="Profile Picture"
                      class="w-10 h-10 rounded-full"
                    />
                    <p class="w-max">{member.user_id.name}</p>
                  </div>
                  <ul
                    tabindex={0}
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    style={{ zIndex: 50 }}
                  >
                    <li>
                      <a onClick={() => handleAction(member.id, "remove")}>
                        Remove from Class
                      </a>
                    </li>
                    {role !== "TA" && role !== "instructor" && (
                      <li>
                        <a onClick={() => handleAction(member.id, "makeTA")}>
                          Make TA
                        </a>
                      </li>
                    )}
                    {role === "TA" && (
                      <li>
                        <a onClick={() => handleAction(member.id, "removeTA")}>
                          Remove TA Role
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
