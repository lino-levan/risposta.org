import { useSignal } from "@preact/signals";
import { debounce } from "$std/async/debounce.ts";
import IconX from "icons/x.tsx";
import type { Tables } from "lib/supabase_types.ts";

export interface ClassTagsProps {
  classId: number;
  tags: Tables<"tags">[];
}

const updateTags = debounce(
  async (
    classId: number,
    tags: Tables<"tags">[],
  ) => {
    await fetch(`/api/class/${classId}/tag`, {
      method: "POST",
      body: JSON.stringify(tags),
    });
  },
  500,
);

export function ClassTags(props: ClassTagsProps) {
  const tags = useSignal(props.tags);

  return (
    <div class="w-full flex flex-col gap-2">
      <p class="text-xl w-full">Tags</p>
      {tags.value.map((tag, i) => (
        <div class="flex-grow flex">
          <input
            class="input input-bordered flex-grow"
            value={tag.tag}
            onInput={(e) => {
              tags.value[i].tag = e.currentTarget.value;
              tags.value = [...tags.value];
              updateTags(props.classId, tags.value);
            }}
            placeholder="Tag Name"
          />
          <button
            class="text-gray-500 hover:text-black"
            onClick={async () => {
              const req = await fetch(`/api/class/${props.classId}/tag`, {
                method: "DELETE",
                body: JSON.stringify({
                  tag_id: tag.id,
                }),
              });
              if (req.ok) {
                tags.value = tags.value.filter((_, j) => i !== j);
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
          const req = await fetch(`/api/class/${props.classId}/tag`, {
            method: "POST",
            body: JSON.stringify([{ tag: "" }]),
          });
          const res = await req.json();
          tags.value = [...tags.value, ...res];
        }}
      >
        New Tag
      </button>
    </div>
  );
}
