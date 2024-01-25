import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase_types.ts";

// Avoid erroring in the build step
if (!Deno.env.get("BUILD")) {
  if (!Deno.env.get("SUPABASE_URL")) {
    throw "No SUPABASE_URL in your .env";
  }

  if (!Deno.env.get("SUPABASE_KEY")) {
    throw "No SUPABASE_KEY in your .env";
  }
}

// Gigaweird hack to make the build step work
export const supabase =
  (Deno.env.get("BUILD") ? undefined : createClient<Database>(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_KEY")!,
  ))!;
