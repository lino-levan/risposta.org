import { Database } from "lib/supabase_types.ts";

export interface DashboardState {
  user: Database["public"]["Tables"]["users"]["Row"];
}

export interface ClassState extends DashboardState {
  class: Database["public"]["Tables"]["classes"]["Row"];
  member: Database["public"]["Tables"]["members"]["Row"];
}
