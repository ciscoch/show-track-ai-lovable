export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      animals: {
        Row: {
          birth_date: string | null
          breed: string | null
          created_at: string | null
          id: string
          name: string
          organization_id: string | null
          species: string | null
          user_id: string | null
        }
        Insert: {
          birth_date?: string | null
          breed?: string | null
          created_at?: string | null
          id?: string
          name: string
          organization_id?: string | null
          species?: string | null
          user_id?: string | null
        }
        Update: {
          birth_date?: string | null
          breed?: string | null
          created_at?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          species?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "animals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_links: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      judge_insights: {
        Row: {
          created_at: string | null
          id: string
          insight: string
          last_updated: string | null
          region: string | null
          source: string | null
          species: string
          trait: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          insight: string
          last_updated?: string | null
          region?: string | null
          source?: string | null
          species: string
          trait: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          insight?: string
          last_updated?: string | null
          region?: string | null
          source?: string | null
          species?: string
          trait?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      judging_trends: {
        Row: {
          id: string
          metric: string | null
          recorded_at: string | null
          region: string | null
          value: number | null
        }
        Insert: {
          id?: string
          metric?: string | null
          recorded_at?: string | null
          region?: string | null
          value?: number | null
        }
        Update: {
          id?: string
          metric?: string | null
          recorded_at?: string | null
          region?: string | null
          value?: number | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
      show_checklist_items: {
        Row: {
          category: string | null
          completed: boolean | null
          due_date: string | null
          id: string
          label: string | null
          notes: string | null
          show_plan_id: string | null
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          due_date?: string | null
          id?: string
          label?: string | null
          notes?: string | null
          show_plan_id?: string | null
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          due_date?: string | null
          id?: string
          label?: string | null
          notes?: string | null
          show_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "show_checklist_items_show_plan_id_fkey"
            columns: ["show_plan_id"]
            isOneToOne: false
            referencedRelation: "show_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      show_plans: {
        Row: {
          animal_type: string | null
          created_at: string | null
          id: string
          show_date: string | null
          show_name: string | null
          user_id: string | null
        }
        Insert: {
          animal_type?: string | null
          created_at?: string | null
          id?: string
          show_date?: string | null
          show_name?: string | null
          user_id?: string | null
        }
        Update: {
          animal_type?: string | null
          created_at?: string | null
          id?: string
          show_date?: string | null
          show_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_organizations: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: number
          role: string | null
          subscription_tier: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: never
          role?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: never
          role?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_expired_buyer_links: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_linked_users_for_buyer: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          last_updated: string
          animal_count: number
          recent_updates: string[]
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
