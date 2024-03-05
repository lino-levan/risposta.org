import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/db.ts";
import { getUser } from "lib/get_user.ts";
import { getClassTags } from "lib/get_class_tags.ts";
import { getMembership } from "lib/get_member.ts";
import { bad, success, unauthorized } from "lib/response.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    // TODO(lino-levan): Validate input
    const classId = parseInt(ctx.params.id);
    const { title, content, tags, anonymous }: {
      title: string;
      content: string;
      tags: string[];
      anonymous: boolean;
    } = await req
      .json();

    // get user for request
    const user = await getUser(req);
    if (!user) return unauthorized();

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
