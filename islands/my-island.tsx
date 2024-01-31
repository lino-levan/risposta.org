import { useSignal } from "@preact/signals";

export default function MyIsland() {
  const count = useSignal(0);

  return (
    <div>
      Counter is at {count}.{" "}
      <button onClick={() => (count.value += 1)}>+</button>
    </div>
  );
}
