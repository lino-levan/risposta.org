// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_auth_callback from "./routes/api/auth/callback.ts";
import * as $api_auth_login from "./routes/api/auth/login.ts";
import * as $api_auth_logout from "./routes/api/auth/logout.ts";
import * as $api_class_id_comment from "./routes/api/class/[id]/comment.ts";
import * as $api_class_id_delete_class from "./routes/api/class/[id]/delete_class.ts";
import * as $api_class_id_faq_add from "./routes/api/class/[id]/faq/add.ts";
import * as $api_class_id_faq_remove from "./routes/api/class/[id]/faq/remove.ts";
import * as $api_class_id_post from "./routes/api/class/[id]/post.ts";
import * as $api_class_id_rename from "./routes/api/class/[id]/rename.ts";
import * as $api_class_create_class from "./routes/api/class/create_class.ts";
import * as $api_class_join_class from "./routes/api/class/join_class.ts";
import * as $api_comments_id_vote from "./routes/api/comments/[id]/vote.ts";
import * as $api_posts_id_delete from "./routes/api/posts/[id]/delete.ts";
import * as $api_posts_id_edit from "./routes/api/posts/[id]/edit.ts";
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
import * as $class_create_class from "./routes/class/create_class.tsx";
import * as $class_index from "./routes/class/index.tsx";
import * as $class_join_class from "./routes/class/join_class.tsx";
import * as $class_no_access from "./routes/class/no_access.tsx";
import * as $class_user from "./routes/class/user.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $signup from "./routes/signup.tsx";
import * as $CommentVote from "./islands/CommentVote.tsx";
import * as $CreateClass from "./islands/CreateClass.tsx";
import * as $FAQ_AddToFAQ from "./islands/FAQ/AddToFAQ.tsx";
import * as $FAQ_RemoveFromFAQ from "./islands/FAQ/RemoveFromFAQ.tsx";
import * as $JoinClass from "./islands/JoinClass.tsx";
import * as $PostComment from "./islands/PostComment.tsx";
import * as $PostQuestion from "./islands/PostQuestion.tsx";
import * as $SearchablePostList from "./islands/SearchablePostList.tsx";
import * as $UpdataClass from "./islands/UpdataClass.tsx";
import * as $Vote from "./islands/Vote.tsx";
import * as $delete from "./islands/delete.tsx";
import * as $edit from "./islands/edit.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/auth/callback.ts": $api_auth_callback,
    "./routes/api/auth/login.ts": $api_auth_login,
    "./routes/api/auth/logout.ts": $api_auth_logout,
    "./routes/api/class/[id]/comment.ts": $api_class_id_comment,
    "./routes/api/class/[id]/delete_class.ts": $api_class_id_delete_class,
    "./routes/api/class/[id]/faq/add.ts": $api_class_id_faq_add,
    "./routes/api/class/[id]/faq/remove.ts": $api_class_id_faq_remove,
    "./routes/api/class/[id]/post.ts": $api_class_id_post,
    "./routes/api/class/[id]/rename.ts": $api_class_id_rename,
    "./routes/api/class/create_class.ts": $api_class_create_class,
    "./routes/api/class/join_class.ts": $api_class_join_class,
    "./routes/api/comments/[id]/vote.ts": $api_comments_id_vote,
    "./routes/api/posts/[id]/delete.ts": $api_posts_id_delete,
    "./routes/api/posts/[id]/edit.ts": $api_posts_id_edit,
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
    "./routes/class/create_class.tsx": $class_create_class,
    "./routes/class/index.tsx": $class_index,
    "./routes/class/join_class.tsx": $class_join_class,
    "./routes/class/no_access.tsx": $class_no_access,
    "./routes/class/user.tsx": $class_user,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/signup.tsx": $signup,
  },
  islands: {
    "./islands/CommentVote.tsx": $CommentVote,
    "./islands/CreateClass.tsx": $CreateClass,
    "./islands/FAQ/AddToFAQ.tsx": $FAQ_AddToFAQ,
    "./islands/FAQ/RemoveFromFAQ.tsx": $FAQ_RemoveFromFAQ,
    "./islands/JoinClass.tsx": $JoinClass,
    "./islands/PostComment.tsx": $PostComment,
    "./islands/PostQuestion.tsx": $PostQuestion,
    "./islands/SearchablePostList.tsx": $SearchablePostList,
    "./islands/UpdataClass.tsx": $UpdataClass,
    "./islands/Vote.tsx": $Vote,
    "./islands/delete.tsx": $delete,
    "./islands/edit.tsx": $edit,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
