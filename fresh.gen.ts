// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_middleware from "./routes/api/_middleware.ts";
import * as $api_auth_callback from "./routes/api/auth/callback.ts";
import * as $api_auth_login from "./routes/api/auth/login.ts";
import * as $api_auth_logout from "./routes/api/auth/logout.ts";
import * as $api_class_id_index from "./routes/api/class/[id]/index.ts";
import * as $api_class_id_post from "./routes/api/class/[id]/post.ts";
import * as $api_class_id_tag from "./routes/api/class/[id]/tag.ts";
import * as $api_class_index from "./routes/api/class/index.ts";
import * as $api_class_join from "./routes/api/class/join.ts";
import * as $api_comments_id_index from "./routes/api/comments/[id]/index.ts";
import * as $api_comments_id_vote from "./routes/api/comments/[id]/vote.ts";
import * as $api_posts_id_comment from "./routes/api/posts/[id]/comment.ts";
import * as $api_posts_id_index from "./routes/api/posts/[id]/index.ts";
import * as $api_posts_id_pin from "./routes/api/posts/[id]/pin.ts";
import * as $api_posts_id_vote from "./routes/api/posts/[id]/vote.ts";
import * as $class_classId_layout from "./routes/class/[classId]/_layout.tsx";
import * as $class_classId_middleware from "./routes/class/[classId]/_middleware.ts";
import * as $class_classId_create from "./routes/class/[classId]/create.tsx";
import * as $class_classId_index from "./routes/class/[classId]/index.tsx";
import * as $class_classId_post_postId_ from "./routes/class/[classId]/post/[postId].tsx";
import * as $class_classId_post_middleware from "./routes/class/[classId]/post/_middleware.ts";
import * as $class_classId_settings from "./routes/class/[classId]/settings.tsx";
import * as $class_layout from "./routes/class/_layout.tsx";
import * as $class_middleware from "./routes/class/_middleware.ts";
import * as $class_create from "./routes/class/create.tsx";
import * as $class_index from "./routes/class/index.tsx";
import * as $class_join_class from "./routes/class/join_class.tsx";
import * as $class_user from "./routes/class/user.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $signup from "./routes/signup.tsx";
import * as $Comment from "./islands/Comment.tsx";
import * as $CommentVote from "./islands/CommentVote.tsx";
import * as $CreateClass from "./islands/CreateClass.tsx";
import * as $CreateComment from "./islands/CreateComment.tsx";
import * as $CreatePost from "./islands/CreatePost.tsx";
import * as $JoinClass from "./islands/JoinClass.tsx";
import * as $Multiselect from "./islands/Multiselect.tsx";
import * as $Post from "./islands/Post.tsx";
import * as $SearchablePostList from "./islands/SearchablePostList.tsx";
import * as $Themes from "./islands/Themes.tsx";
import * as $UpdateClass from "./islands/UpdateClass.tsx";
import * as $Vote from "./islands/Vote.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/_middleware.ts": $api_middleware,
    "./routes/api/auth/callback.ts": $api_auth_callback,
    "./routes/api/auth/login.ts": $api_auth_login,
    "./routes/api/auth/logout.ts": $api_auth_logout,
    "./routes/api/class/[id]/index.ts": $api_class_id_index,
    "./routes/api/class/[id]/post.ts": $api_class_id_post,
    "./routes/api/class/[id]/tag.ts": $api_class_id_tag,
    "./routes/api/class/index.ts": $api_class_index,
    "./routes/api/class/join.ts": $api_class_join,
    "./routes/api/comments/[id]/index.ts": $api_comments_id_index,
    "./routes/api/comments/[id]/vote.ts": $api_comments_id_vote,
    "./routes/api/posts/[id]/comment.ts": $api_posts_id_comment,
    "./routes/api/posts/[id]/index.ts": $api_posts_id_index,
    "./routes/api/posts/[id]/pin.ts": $api_posts_id_pin,
    "./routes/api/posts/[id]/vote.ts": $api_posts_id_vote,
    "./routes/class/[classId]/_layout.tsx": $class_classId_layout,
    "./routes/class/[classId]/_middleware.ts": $class_classId_middleware,
    "./routes/class/[classId]/create.tsx": $class_classId_create,
    "./routes/class/[classId]/index.tsx": $class_classId_index,
    "./routes/class/[classId]/post/[postId].tsx": $class_classId_post_postId_,
    "./routes/class/[classId]/post/_middleware.ts":
      $class_classId_post_middleware,
    "./routes/class/[classId]/settings.tsx": $class_classId_settings,
    "./routes/class/_layout.tsx": $class_layout,
    "./routes/class/_middleware.ts": $class_middleware,
    "./routes/class/create.tsx": $class_create,
    "./routes/class/index.tsx": $class_index,
    "./routes/class/join_class.tsx": $class_join_class,
    "./routes/class/user.tsx": $class_user,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/signup.tsx": $signup,
  },
  islands: {
    "./islands/Comment.tsx": $Comment,
    "./islands/CommentVote.tsx": $CommentVote,
    "./islands/CreateClass.tsx": $CreateClass,
    "./islands/CreateComment.tsx": $CreateComment,
    "./islands/CreatePost.tsx": $CreatePost,
    "./islands/JoinClass.tsx": $JoinClass,
    "./islands/Multiselect.tsx": $Multiselect,
    "./islands/Post.tsx": $Post,
    "./islands/SearchablePostList.tsx": $SearchablePostList,
    "./islands/Themes.tsx": $Themes,
    "./islands/UpdateClass.tsx": $UpdateClass,
    "./islands/Vote.tsx": $Vote,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
