import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import IconCheck from "icons/check.tsx";
import IconX from "icons/x.tsx";

interface MultiselectProps {
  options: string[];
  selected: Signal<string[]>;
}

/** A multiselect component */
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
      class="border px-1 py-2 relative w-full"
      style={{
        borderRadius: "var(--rounded-btn, 0.5rem)",
        borderColor: "var(--fallback-bc,oklch(var(--bc)/0.2))",
        backgroundColor:
          "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))",
      }}
      onClick={(e) => {
        e.stopPropagation();
        open.value = !open.value;
      }}
    >
      {selected.value.length === 0 && <p class="py-[2px]">None Selected</p>}
      {selected.value.map((value) => (
        <span class="text-xs bg-black text-white pl-2 pr-1 py-1 rounded w-max inline-flex gap-1 m-[2px]">
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
        </span>
      ))}
      {open.value && (
        <div class="absolute bg-white w-48 left-0 top-10 shadow px-2 py-2 border rounded flex flex-col gap-1">
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
