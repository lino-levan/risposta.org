import { getUser } from "lib/get_user.ts";
import { redirect } from "lib/response.ts";

export default async function NoAccess(req: Request) {
  return (
    <>
      <div class="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <p>Sorry, you do not have access to the current class</p>
        <a
          href="/class"
          class="px-4 py-2 rounded border text-center"
        >
          Return to your main page
        </a>
      </div>
    </>
  );
}
