import { Handlers } from "$fresh/server.ts";
import { insertPost } from "db/insert_post.ts";
import { insertPostTags } from "db/insert_post_tags.ts";
import { getClassTags } from "db/get_class_tags.ts";
import { getMembership } from "db/get_member.ts";
import { bad, success } from "lib/response.ts";
import { generateResponse } from "lib/ai.ts";
import { APIState } from "lib/state.ts";
import { z } from "zod";
import { getClass } from "db/get_class.ts";

const postSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  tags: z.string().array(),
  anonymous: z.boolean(),
  visibility: z.string(),
});

export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const classId = parseInt(ctx.params.id);
    const user = ctx.state.user;

    const result = postSchema.safeParse(await req.json());
    if (!result.success) return bad(result.error.toString());
    const { title, content, tags, anonymous, visibility } = result.data;

    const member = await getMembership(user.id, classId);
    if (!member) return ctx.renderNotFound();

    const classTags = await getClassTags(classId);
    if (!classTags) return bad();

    // validate tags
    for (const tag of tags) {
      const classHasTag = classTags.filter((t) => t.tag === tag).length > 0;
      if (!classHasTag) {
        return bad();
      }
    }

    const classroom = await getClass(classId);
    if (!classroom) return bad();

    let ai_answer = null;

    if (classroom.ai) {
      ai_answer = await generateResponse(content);
    }

    // post question
    const post = await insertPost(
      member.id,
      content,
      title,
      anonymous,
      visibility,
      ai_answer,
    );
    if (!post) return bad();

    const postTags = await insertPostTags(tags.map((tag) => (
      {
        post_id: post.id,
        tag_id: classTags.find((t) => t.tag === tag)!.id,
      }
    )));
    if (!postTags) return bad();

    // success :)
    return success(post.id.toString());
  },
};
