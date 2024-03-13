import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface DotMenuProps {
  items: {
    name: string;
    onClick: () => void;
  }[];

  class?: string;
  children: ComponentChildren;
}

/** A button that opens a menu when clicked */
export function DotMenu(props: DotMenuProps) {
  const dotMenuOpen = useSignal(false);

  useEffect(() => {
    const effect = () => {
      dotMenuOpen.value = false;
    };
    document.addEventListener("click", effect);

    return () => {
      document.removeEventListener("click", effect);
    };
  }, []);

  return (
    <button
      class={`${props.class} hover:bg-base-300 rounded-full p-1 relative`}
      onClick={(e) => {
        e.stopPropagation();
        dotMenuOpen.value = !dotMenuOpen.value;
      }}
    >
      {props.children}
      {dotMenuOpen.value && (
        <div
          style={{
            borderRadius: "var(--rounded-btn, 0.5rem)",
            borderColor: "var(--fallback-bc,oklch(var(--bc)/0.2))",
            backgroundColor:
              "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))",
          }}
          class="absolute border shadow w-48 right-0 top-10 p-2 rounded-lg flex flex-col gap-2 bg-base-100 z-10"
        >
          {props.items.map(({ name, onClick }, i) => (
            <>
              <button class="btn btn-ghost" onClick={onClick}>{name}</button>
              {i !== props.items.length - 1 && <div class="border-b" />}
            </>
          ))}
        </div>
      )}
    </button>
  );
}
