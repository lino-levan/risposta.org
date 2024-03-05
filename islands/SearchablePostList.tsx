import { useComputed, useSignal } from "@preact/signals";
import { useMemo } from "preact/hooks";
import MiniSearch from "https://esm.sh/minisearch@v6.3.0";

export function SearchablePostList(
  props: {
    posts: {
      id: number;
      created_at: string;
      title: string;
      content: string;
      upvotes: number;
      downvotes: number;
    }[];
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

  /*----Original post list
  const filteredPosts = props.posts.filter((item) => {
    if (filter.value === null) {
      return true;
    }
    return filter.value.includes(item.id);
  });
  */
  /*----Updated----*/
  const sortRule = useSignal(
    globalThis?.localStorage?.getItem("sortRule") ?? "recent",
  );

  const sortedFilteredPosts = useComputed(() => {
    const currentFilter = filter.value;
    //filtered here
    const postsToSort = props.posts.filter((post) => {
      if (currentFilter === null) return true;
      return currentFilter.includes(post.id);
    });

    //sorted here
    if (sortRule.value === "votes") {
      return postsToSort.sort((a, b) =>
        (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      );
    } else {
      return postsToSort.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  });

  return (
    <>
      <select
        class="border rounded p-2"
        onChange={(e) => {
          const value = e.currentTarget.value;
          if (value === "recent" || value === "votes") {
            sortRule.value = value;
            localStorage.setItem("sortRule", value);
          }
        }}
      >
        <option value="recent" selected={sortRule.value === "recent"}>
          By Recent
        </option>
        <option value="votes" selected={sortRule.value === "votes"}>
          By High Votes
        </option>
      </select>
      <input
        class="w-full border-green-200 rounded p-2 bg-white text-black"
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
      {sortedFilteredPosts.value.map((item) => (
        <a
          href={`/class/${props.classId}/post/${item.id}`}
          class="block py-2 px-3 rounded bg-green-300 hover:bg-green-500 text-black"
        >
          <h2 class="text-xl">{item.title}</h2>
          <p class="text-sm text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {item.content}
          </p>
        </a>
      ))}
      {props.posts.length === 0 && (
        <p class="text-sm text-black">No posts yet...</p>
      )}
      {props.posts.length !== 0 && sortedFilteredPosts.value.length === 0 && (
        <p class="text-sm text-gray-500">No posts matching search...</p>
      )}
    </>
  );
}