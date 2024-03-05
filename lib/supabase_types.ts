export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      classes: {
        Row: {
          ai: boolean;
          code: string | null;
          created_at: string;
          description: string;
          id: number;
          name: string;
        };
        Insert: {
          ai?: boolean;
          code?: string | null;
          created_at?: string;
          description?: string;
          id?: number;
          name: string;
        };
        Update: {
          ai?: boolean;
          code?: string | null;
          created_at?: string;
          description?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          member_id: number;
          parent_id: number | null;
          post_id: number;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          member_id: number;
          parent_id?: number | null;
          post_id: number;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          member_id?: number;
          parent_id?: number | null;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "comments_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["member_id"];
          },
          {
            foreignKeyName: "comments_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      members: {
        Row: {
          class_id: number;
          created_at: string;
          id: number;
          role: string;
          user_id: number;
        };
        Insert: {
          class_id: number;
          created_at?: string;
          id?: number;
          role: string;
          user_id: number;
        };
        Update: {
          class_id?: number;
          created_at?: string;
          id?: number;
          role?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "members_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "members_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["class_id"];
          },
          {
            foreignKeyName: "members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_tags: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          tag_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: number;
          tag_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_post_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          anonymous: boolean;
          content: string;
          created_at: string;
          faq: boolean;
          id: number;
          member_id: number;
          title: string;
        };
        Insert: {
          anonymous: boolean;
          content: string;
          created_at?: string;
          faq?: boolean;
          id?: number;
          member_id: number;
          title: string;
        };
        Update: {
          anonymous?: boolean;
          content?: string;
          created_at?: string;
          faq?: boolean;
          id?: number;
          member_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["member_id"];
          },
          {
            foreignKeyName: "posts_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "members";
            referencedColumns: ["id"];
          },
        ];
      };
      sessions: {
        Row: {
          created_at: string;
          id: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id: string;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          class_id: number;
          created_at: string;
          id: number;
          tag: string;
        };
        Insert: {
          class_id: number;
          created_at?: string;
          id?: number;
          tag: string;
        };
        Update: {
          class_id?: number;
          created_at?: string;
          id?: number;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_classes_tags_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "classes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_classes_tags_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["class_id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          name: string;
          picture: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          name: string;
          picture: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          name?: string;
          picture?: string;
        };
        Relationships: [];
      };
      votes: {
        Row: {
          comment_id: number | null;
          created_at: string;
          id: number;
          member_id: number;
          post_id: number | null;
          upvote: boolean;
        };
        Insert: {
          comment_id?: number | null;
          created_at?: string;
          id?: number;
          member_id: number;
          post_id?: number | null;
          upvote: boolean;
        };
        Update: {
          comment_id?: number | null;
          created_at?: string;
          id?: number;
          member_id?: number;
          post_id?: number | null;
          upvote?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "votes_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["member_id"];
          },
          {
            foreignKeyName: "votes_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "expanded_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      expanded_posts: {
        Row: {
          anonymous: boolean | null;
          author_email: string | null;
          author_name: string | null;
          author_picture: string | null;
          author_role: string | null;
          class_id: number | null;
          class_name: string | null;
          content: string | null;
          created_at: string | null;
          downvotes: number | null;
          faq: boolean | null;
          id: number | null;
          member_id: number | null;
          title: string | null;
          upvotes: number | null;
          user_id: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & Database["public"]["Tables"]
    & Database["public"]["Views"]
  ) ? (
      & Database["public"]["Tables"]
      & Database["public"]["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
