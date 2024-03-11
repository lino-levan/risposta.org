import { useSignal } from "@preact/signals";
import IconX from "icons/x.tsx";
import IconCopy from "icons/copy.tsx";
import IconCopyCheck from "icons/copy-check.tsx";

export interface ClassInviteProps {
  classId: number;
  invites: string[];
}

export function ClassInvites(props: ClassInviteProps) {
  const invites = useSignal(props.invites);
  const copied = useSignal<number | null>(null);

  const baseUrl = `${location?.protocol}//${location?.host}`;

  return (
    <div class="w-full flex flex-col gap-2">
      <p class="text-xl w-full">Invites</p>
      {invites.value.map((code, i) => (
        <div class="flex-grow flex gap-2">
          <p class="flex-grow border rounded p-2">{baseUrl}/join/{code}</p>
          <button
            class="text-gray-500 hover:text-black"
            onClick={async () => {
              await navigator.clipboard.writeText(`${baseUrl}/join/${code}`);
              copied.value = i;
            }}
          >
            {copied.value === i ? <IconCopyCheck /> : <IconCopy />}
          </button>
          <button
            class="text-gray-500 hover:text-black"
            onClick={async () => {
              const req = await fetch(`/api/invites/${code}`, {
                method: "DELETE",
              });
              if (req.ok) {
                invites.value = invites.value.filter((_, j) => i !== j);
              }
            }}
          >
            <IconX />
          </button>
        </div>
      ))}
      <button
        class="btn btn-primary"
        onClick={async () => {
          const req = await fetch(`/api/class/${props.classId}/invite`, {
            method: "POST",
          });
          const res = await req.text();
          invites.value = [...invites.value, res];
        }}
      >
        New Invite
      </button>
    </div>
  );
}
