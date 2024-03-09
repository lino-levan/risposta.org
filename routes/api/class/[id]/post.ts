import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getClassTags } from "lib/get_class_tags.ts";
import { getMembership } from "lib/get_member.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { z } from "zod";

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

    // post question
    const { error: postError, data: post } = await supabase.from("posts")
      .insert({
        member_id: member.id,
        content,
        title,
        anonymous,
        visibility,
      }).select().single();
    if (postError) return bad();

    const { error: tagsError } = await supabase.from("post_tags").insert(
      tags.map((tag) => (
        {
          post_id: post.id,
          tag_id: classTags.find((t) => t.tag === tag)!.id,
        }
      )),
    ).select();
    if (tagsError) return bad();

    // success :)
    return success();
  },
};
