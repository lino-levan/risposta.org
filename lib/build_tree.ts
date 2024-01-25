// Code we did live in the TA session for building the comment tree
// Relatively bing chilling

let posts: {
  id: number;
  comment: string;
  parent_id: number | null;
}[] = [
  {
    id: 0,
    comment: "hello",
    parent_id: null,
  },
];

for (let i = 0; i < 3000; i++) {
  const lastPostId = posts[posts.length - 1].id;
  posts.push({
    id: lastPostId + 1,
    comment: "hello" + i,
    parent_id: lastPostId,
  });
}

type CommentForest = {
  comment: string;
  children: CommentForest;
}[];

function buildTree(postList: typeof posts, id?: number): CommentForest {
  // base case - handle the root
  if (id === undefined) {
    const root: CommentForest = [];
    for (const post of postList) {
      if (post.parent_id === null) {
        root.push({
          comment: post.comment,
          children: buildTree(postList, post.id),
        });
      }
    }
    return root;
  }

  const list: CommentForest = [];

  for (const post of postList) {
    if (post.parent_id === id) {
      list.push({
        comment: post.comment,
        children: buildTree(postList, post.id),
      });
    }
  }

  return list;
}

console.time("buildTree");
buildTree(posts);
console.timeEnd("buildTree");
