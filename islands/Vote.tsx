import { useSignal } from "@preact/signals";
import ArrowUp from "icons/arrow-big-up.tsx";
import ArrowUpFilled from "icons/arrow-big-up-filled.tsx";

export interface VoteProps {
  postId: number;
  /** 0 if no vote, -1 if downvote, 1 if upvote */
  voted: number;
  votes: number;
}

export function Vote(props: VoteProps) {
  const votes = useSignal(props.votes);
  const voted = useSignal(props.voted);

  return (
    <div class="flex items-center flex-col w-4">
      <button
        class="hover:bg-gray-100 rounded"
        onClick={async () => {
          if (voted.value !== 1) {
            // if upvoted, effective vote total goes down by 2
            if (voted.value === -1) {
              votes.value += 2;
            } else {
              votes.value++;
            }
            voted.value = 1;
            const req = await fetch(`/api/posts/${props.postId}/vote`, {
              method: "POST",
              body: JSON.stringify({
                vote: 1,
              }),
            });
          } else {
            voted.value = 0;
            votes.value--;
            const req = await fetch(`/api/posts/${props.postId}/vote`, {
              method: "POST",
              body: JSON.stringify({
                vote: 0,
              }),
            });
          }
          //update total vote count in posts
          const req = await fetch(`/api/posts/${props.postId}/post_vote_cnt`, {
            method: "POST",
            body: JSON.stringify({
              vote_cnt: votes.value,
            }),
          });
        }}
      >
        {voted.value === 1 ? <ArrowUpFilled /> : <ArrowUp />}
      </button>
      <p>{votes}</p>
      <button
        class="hover:bg-gray-100 rounded"
        onClick={async () => {
          if (voted.value !== -1) {
            // if upvoted, effective vote total goes down by 2
            if (voted.value === 1) {
              votes.value -= 2;
            } else {
              votes.value--;
            }
            voted.value = -1;
            const req = await fetch(`/api/posts/${props.postId}/vote`, {
              method: "POST",
              body: JSON.stringify({
                vote: -1,
              }),
            });
          } else {
            voted.value = 0;
            votes.value++;
            const req = await fetch(`/api/posts/${props.postId}/vote`, {
              method: "POST",
              body: JSON.stringify({
                vote: 0,
              }),
            });
          }
          //update total vote count in posts
          const req = await fetch(`/api/posts/${props.postId}/post_vote_cnt`, {
            method: "POST",
            body: JSON.stringify({
              vote_cnt: votes,
            }),
          });
        }}
      >
        {voted.value === -1
          ? <ArrowUpFilled class="rotate-180" />
          : <ArrowUp class="rotate-180" />}
      </button>
    </div>
  );
}
