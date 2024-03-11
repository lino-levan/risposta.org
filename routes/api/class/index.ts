import { Handlers } from "$fresh/server.ts";
import { bad, success } from "lib/response.ts";
import { APIState } from "lib/state.ts";
import { insertMember } from "db/insert_member.ts";
import { insertClass } from "db/insert_class.ts";

// TODO(lino-levan): Validate inputs
export const handler: Handlers<unknown, APIState> = {
  async POST(req, ctx) {
    const user = ctx.state.user;
    const { name, description, ai } = await req.json();

    const classroom = await insertClass(name, description, ai);
    if (!classroom) return bad();

    const member = await insertMember(user.id, classroom.id, "instructor");
    if (!member) return bad();

    return success(JSON.stringify(classroom));
  },
};
