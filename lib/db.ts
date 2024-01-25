import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase_types.ts";
import { noRunOnBuild } from "./build.ts";

noRunOnBuild(() => {
  if (!Deno.env.get("SUPABASE_URL")) {
    throw "No SUPABASE_URL in your .env";
  }

  if (!Deno.env.get("SUPABASE_KEY")) {
    throw "No SUPABASE_KEY in your .env";
  }
});

// Gigaweird hack to make the build step work
export const supabase = noRunOnBuild(() =>
  createClient<Database>(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_KEY")!,
  )
)!;
