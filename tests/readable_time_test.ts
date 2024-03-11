import { assertEquals } from "https://deno.land/std@0.218.2/assert/assert_equals.ts";
import { getReadableTime } from "lib/readable_time.ts";

Deno.test("Get readable time works for 'just now'", () => {
  assertEquals(getReadableTime(new Date().toString()), "just now");
});
