import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import IconDotsVertical from "icons/dots-vertical.tsx";

interface DotMenuProps {
  items: {
    name: string;
    onClick: () => void;
  }[];
}

export function DotMenu({ items }: DotMenuProps) {
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
      class="ml-auto hover:bg-base-300 rounded-full p-1 relative"
      onClick={(e) => {
        e.stopPropagation();
        dotMenuOpen.value = !dotMenuOpen.value;
      }}
    >
      <IconDotsVertical />
      {dotMenuOpen.value && (
        <div
          style={{
            borderRadius: "var(--rounded-btn, 0.5rem)",
            borderColor: "var(--fallback-bc,oklch(var(--bc)/0.2))",
            backgroundColor:
              "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))",
          }}
          class="absolute border shadow w-48 right-0 top-10 p-2 rounded-lg flex flex-col gap-2 bg-base-100"
        >
          {items.map(({ name, onClick }, i) => (
            <>
              <button class="btn btn-ghost" onClick={onClick}>{name}</button>
              {i !== items.length - 1 && <div class="border-b" />}
            </>
          ))}
        </div>
      )}
    </button>
  );
}
