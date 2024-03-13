import { assertEquals } from "$std/assert/mod.ts";
import { getReadableTime } from "lib/readable_time.ts";

Deno.test("Get readable time works for 'just now'", () => {
  assertEquals(getReadableTime(new Date().toString()), "just now");
});
