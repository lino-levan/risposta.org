import { useSignal } from "@preact/signals";
import { useMemo } from "preact/hooks";
import MiniSearch from "https://esm.sh/minisearch@v6.3.0";

export function SearchablePostList(
  props: {
    posts: { id: number; title: string; content: string }[];
    classId: number;
  },
) {
  const miniSearchMemo = useMemo(
    () => {
      const miniSearch = new MiniSearch({
        fields: ["title", "content"],
        storeFields: ["id"],
        searchOptions: {
          boost: { title: 2 },
          fuzzy: 0.2,
        },
      });
      miniSearch.addAll(props.posts);
      return miniSearch;
    },
    [props.posts],
  );

  const filter = useSignal<number[] | null>(null);

  const filteredPosts = props.posts.filter((item) => {
    if (filter.value === null) {
      return true;
    }
    return filter.value.includes(item.id);
  });

  return (
    <>
      <input
        class="w-full border rounded p-2"
        placeholder="Search for..."
        onInput={(e) => {
          const value = e.currentTarget.value.trim();
          if (value === "") {
            filter.value = null;
            return;
          }
          filter.value = miniSearchMemo.search(value).map(({ id }) => id);
        }}
      >
      </input>
      {filteredPosts.map((item) => (
        <a
          href={`/class/${props.classId}/post/${item.id}`}
          class="block py-2 px-3 rounded hover:bg-gray-100"
        >
          <h2 class="text-xl">{item.title}</h2>
          <p class="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.content}
          </p>
        </a>
      ))}
      {props.posts.length === 0 && (
        <p class="text-sm text-gray-500">No posts yet...</p>
      )}
      {props.posts.length !== 0 && filteredPosts.length === 0 && (
        <p class="text-sm text-gray-500">No posts matching search...</p>
      )}
    </>
  );
}
