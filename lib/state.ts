import type { Tables } from "lib/supabase_types.ts";

export interface DashboardState {
  user: Tables<"users">;
}

export interface ClassState extends DashboardState {
  class: Tables<"classes">;
  member: Tables<"members">;
}

export interface APIState {
  user: Tables<"users">;
}
