import { Database } from "lib/supabase_types.ts";

export interface DashboardState {
  user: Database["public"]["Tables"]["users"]["Row"];
}

export interface ClassState extends DashboardState {
  class: Database["public"]["Tables"]["classes"]["Row"];
  member: Database["public"]["Tables"]["members"]["Row"];
  tags: Database["public"]["Tables"]["tags"]["Row"][];
}

export interface PostState extends ClassState {
  post: Database["public"]["Tables"]["posts"]["Row"];
}
