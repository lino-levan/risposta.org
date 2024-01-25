import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase_types.ts";

export const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_KEY")!,
);
