import { assertNotEquals } from "$std/assert/mod.ts";
import { insertClass } from "db/insert_class.ts";
import { getClass } from "db/get_class.ts";
import { updateClass } from "db/update_class.ts";
import { assertEquals } from "$fresh/src/dev/deps.ts";
import { deleteClass } from "db/delete_class.ts";

Deno.test("Able to create, get, update, and delete a class", async () => {
  // Create a class
  const classroom = await insertClass(
    "Test Class",
    "This is a test class",
    true,
  );
  assertNotEquals(classroom, null);

  // Get the class
  const classroomFromDB = await getClass(classroom!.id);
  assertEquals(classroom, classroomFromDB);

  // Update the class
  const updatedClassroom = await updateClass(
    classroom!.id,
    "Updated Test Class",
    "This is an updated test class",
    false,
  );
  assertNotEquals(updatedClassroom, null);

  // Delete the class
  const deletedClassroom = await deleteClass(classroom!.id);
  assertEquals(deletedClassroom, true);
});
