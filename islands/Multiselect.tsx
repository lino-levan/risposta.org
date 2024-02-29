import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import IconCheck from "icons/check.tsx";
import IconX from "icons/x.tsx";

interface MultiselectProps {
  options: string[];
  selected: Signal<string[]>;
}

export function Multiselect({ selected, options }: MultiselectProps) {
  const open = useSignal(false);

  useEffect(() => {
    const effect = () => {
      open.value = false;
    };
    document.addEventListener("click", effect);

    return () => {
      document.removeEventListener("click", effect);
    };
  }, []);

  return (
    <button
      class="border rounded px-4 py-2 relative w-48"
      onClick={(e) => {
        e.stopPropagation();
        open.value = !open.value;
      }}
    >
      {selected.value.length === 0 && "None Selected"}
      {selected.value.map((value) => (
        <div class="text-xs bg-black text-white pl-2 pr-1 py-1 rounded w-min flex gap-1">
          {value}
          <button
            class="text-gray-500 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              selected.value = selected.value.filter((val) => val !== value);
            }}
          >
            <IconX class="w-4 h-4" />
          </button>
        </div>
      ))}
      {open.value && (
        <div class="absolute bg-white w-48 left-0 top-10 shadow px-2 py-2 border rounded flex flex-col">
          {options.map((option) => (
            <button
              class="px-2 w-full bg-black bg-opacity-0 hover:bg-opacity-5 rounded flex"
              onClick={(e) => {
                e.stopPropagation();
                if (selected.value.includes(option)) {
                  selected.value = selected.value.filter((val) =>
                    val !== option
                  );
                } else {
                  selected.value = [...selected.value, option];
                }
              }}
            >
              {option}
              {selected.value.includes(option) && <IconCheck class="ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </button>
  );
}
