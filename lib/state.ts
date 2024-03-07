import type { Database } from "lib/supabase_types.ts";

export interface DashboardState {
  user: Database["public"]["Tables"]["users"]["Row"];
}

export interface ClassState extends DashboardState {
  class: Database["public"]["Tables"]["classes"]["Row"];
  member: Database["public"]["Tables"]["members"]["Row"];
}

export interface PostState extends ClassState {
  post: Database["public"]["Tables"]["posts"]["Row"];
}

export interface APIState {
  user: Database["public"]["Tables"]["users"]["Row"];
}
