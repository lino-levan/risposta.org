import { useComputed, useSignal } from "@preact/signals";
import { useMemo } from "preact/hooks";
import MiniSearch from "https://esm.sh/minisearch@v6.3.0";
import type { Tables } from "lib/supabase_types.ts";
import { Multiselect } from "islands/Multiselect.tsx";

export interface PostWithTags {
  postId: number;
  tagString: string[];
}

export function SearchablePostList(
  props: {
    posts: Pick<
      Tables<"expanded_posts">,
      | "id"
      | "title"
      | "content"
      | "upvotes"
      | "downvotes"
      | "created_at"
      | "visibility"
      | "member_id"
    >[];
    classId: number;
    member: {
      id: number;
      role: string;
    };
    classTags: string[];
    postTags: PostWithTags[];
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
  const sortRule = useSignal(
    globalThis?.localStorage?.getItem("sortRule") ?? "recent",
  );
  const selectedTags = useSignal<string[]>([]);

  const sortedFilteredPosts = useComputed(() => {
    //sort for post matching selected tag
    const actualSelectedTags = selectedTags.value;
    const postMatchingCurrentSelectedTag: number[] = [];
    props.postTags.forEach((tag) => {
      const allTagsMatch = actualSelectedTags.every((selectedTag) =>
        tag.tagString.includes(selectedTag)
      );
      if (allTagsMatch) {
        postMatchingCurrentSelectedTag.push(tag.postId);
      }
    });

    const currentFilter = filter.value;
    //filtered here
    const postsToSort = props.posts.filter((post) => {
      if (currentFilter === null) return true;
      return currentFilter.includes(post.id!);
    }).filter((post) => {
      const isAuthor = props.member?.id && post.member_id === props.member.id;
      const isInstructor = props.member?.role === "instructor"; // Corrected condition
      const isInstructorPost = post.visibility === "instructor";
      const isAllowedTag = postMatchingCurrentSelectedTag.includes(
        post.id as number,
      );
      //Permission Test Values
      /*
      console.log("Post ID:", post.id);
      console.log("Is Author:", isAuthor);
      console.log("Is Instructor:", isInstructor);
      console.log("Is Instructor Post:", isInstructorPost);
      console.log("Member ID:", props.member?.id);
      console.log("Member Role:", props.member?.role);
      console.log("Post Member ID:", post.member_id);
      console.log("Post Visibility:", post.visibility);
      console.log("Selected Tags: ", selectedTags);
      console.log("Class Tags: ", props.classTags);
      console.log("---");
      */
      // Only include the post if the user is the author, a teacher, or the post is not intended for instructors
      // and the post is an allowed tag
      return (isAuthor || isInstructor || !isInstructorPost) && isAllowedTag;
    });

    //sorted here
    if (sortRule.value === "votes") {
      return postsToSort.sort((a, b) =>
        (b.upvotes! - b.downvotes!) - (a.upvotes! - a.downvotes!)
      );
    } else {
      return postsToSort.sort((a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      );
    }
  });

  return (
    <>
      <select
        class="select select-bordered"
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
      {props.classTags.length > 0 && (
        <>
          <p class="font-bold">Sort Tags</p>
          <Multiselect selected={selectedTags} options={props.classTags} />
        </>
      )}
      <input
        class="input input-bordered py-4"
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
          class="block py-2 px-3 rounded bg-base-200 hover:bg-base-300"
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
