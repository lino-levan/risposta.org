// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_auth_callback from "./routes/api/auth/callback.ts";
import * as $api_auth_login from "./routes/api/auth/login.ts";
import * as $api_auth_logout from "./routes/api/auth/logout.ts";
import * as $api_class_id_post from "./routes/api/class/[id]/post.ts";
import * as $api_posts_id_delete from "./routes/api/posts/[id]/delete.ts";
import * as $api_posts_id_edit from "./routes/api/posts/[id]/edit.ts";
import * as $api_posts_id_vote from "./routes/api/posts/[id]/vote.ts";
import * as $class_classId_create from "./routes/class/[classId]/create.tsx";
import * as $class_classId_index from "./routes/class/[classId]/index.tsx";
import * as $class_classId_post_postId_ from "./routes/class/[classId]/post/[postId].tsx";
import * as $dashboard_index from "./routes/dashboard/index.tsx";
import * as $dashboard_user from "./routes/dashboard/user.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $signup from "./routes/signup.tsx";
import * as $PostQuestion from "./islands/PostQuestion.tsx";
import * as $edit from "./islands/edit.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/auth/callback.ts": $api_auth_callback,
    "./routes/api/auth/login.ts": $api_auth_login,
    "./routes/api/auth/logout.ts": $api_auth_logout,
    "./routes/api/class/[id]/post.ts": $api_class_id_post,
    "./routes/api/posts/[id]/delete.ts": $api_posts_id_delete,
    "./routes/api/posts/[id]/edit.ts": $api_posts_id_edit,
    "./routes/api/posts/[id]/vote.ts": $api_posts_id_vote,
    "./routes/class/[classId]/create.tsx": $class_classId_create,
    "./routes/class/[classId]/index.tsx": $class_classId_index,
    "./routes/class/[classId]/post/[postId].tsx": $class_classId_post_postId_,
    "./routes/dashboard/index.tsx": $dashboard_index,
    "./routes/dashboard/user.tsx": $dashboard_user,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/signup.tsx": $signup,
  },
  islands: {
    "./islands/PostQuestion.tsx": $PostQuestion,
    "./islands/edit.tsx": $edit,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
