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
      bookings: {
        Row: {
          check_in_date: string
          check_out_date: string
          created_at: string | null
          guest_id: number | null
          id: number
          last_updated: string | null
          number_of_guests: number | null
          payment_status: string | null
          room_id: number | null
          special_requests: string | null
          status: string
          total_amount: number
        }
        Insert: {
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          guest_id?: number | null
          id?: number
          last_updated?: string | null
          number_of_guests?: number | null
          payment_status?: string | null
          room_id?: number | null
          special_requests?: string | null
          status?: string
          total_amount: number
        }
        Update: {
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          guest_id?: number | null
          id?: number
          last_updated?: string | null
          number_of_guests?: number | null
          payment_status?: string | null
          room_id?: number | null
          special_requests?: string | null
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      charges: {
        Row: {
          amount: number
          booking_id: number | null
          category: string
          created_at: string | null
          date: string
          description: string
          id: number
          last_updated: string | null
          notes: string | null
          status: string
        }
        Insert: {
          amount: number
          booking_id?: number | null
          category: string
          created_at?: string | null
          date?: string
          description: string
          id?: number
          last_updated?: string | null
          notes?: string | null
          status?: string
        }
        Update: {
          amount?: number
          booking_id?: number | null
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: number
          last_updated?: string | null
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "charges_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string
          id: number
          last_name: string
          last_updated: string | null
          passport_number: string | null
          phone_number: string | null
          special_requests: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name: string
          id?: number
          last_name: string
          last_updated?: string | null
          passport_number?: string | null
          phone_number?: string | null
          special_requests?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          id?: number
          last_name?: string
          last_updated?: string | null
          passport_number?: string | null
          phone_number?: string | null
          special_requests?: string | null
        }
        Relationships: []
      }
      maintenance_requests: {
        Row: {
          actual_cost: number | null
          assigned_to_id: number | null
          completed_at: string | null
          created_at: string | null
          description: string
          estimated_cost: number | null
          id: number
          last_updated: string | null
          priority: string
          resolution_notes: string | null
          room_id: number | null
          status: string
          title: string
        }
        Insert: {
          actual_cost?: number | null
          assigned_to_id?: number | null
          completed_at?: string | null
          created_at?: string | null
          description: string
          estimated_cost?: number | null
          id?: number
          last_updated?: string | null
          priority: string
          resolution_notes?: string | null
          room_id?: number | null
          status?: string
          title: string
        }
        Update: {
          actual_cost?: number | null
          assigned_to_id?: number | null
          completed_at?: string | null
          created_at?: string | null
          description?: string
          estimated_cost?: number | null
          id?: number
          last_updated?: string | null
          priority?: string
          resolution_notes?: string | null
          room_id?: number | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: number | null
          card_last_four: string | null
          card_type: string | null
          created_at: string | null
          id: number
          last_updated: string | null
          notes: string | null
          payment_date: string
          payment_method: string
          processed_at: string | null
          reference: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: number | null
          card_last_four?: string | null
          card_type?: string | null
          created_at?: string | null
          id?: number
          last_updated?: string | null
          notes?: string | null
          payment_date?: string
          payment_method: string
          processed_at?: string | null
          reference?: string | null
          status?: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: number | null
          card_last_four?: string | null
          card_type?: string | null
          created_at?: string | null
          id?: number
          last_updated?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string
          processed_at?: string | null
          reference?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      room_types: {
        Row: {
          base_rate: number
          bed_count: number
          bed_type: string | null
          created_at: string | null
          description: string | null
          has_balcony: boolean | null
          has_ocean_view: boolean | null
          id: number
          is_active: boolean | null
          max_occupancy: number
          name: string
          updated_at: string | null
        }
        Insert: {
          base_rate: number
          bed_count: number
          bed_type?: string | null
          created_at?: string | null
          description?: string | null
          has_balcony?: boolean | null
          has_ocean_view?: boolean | null
          id?: number
          is_active?: boolean | null
          max_occupancy: number
          name: string
          updated_at?: string | null
        }
        Update: {
          base_rate?: number
          bed_count?: number
          bed_type?: string | null
          created_at?: string | null
          description?: string | null
          has_balcony?: boolean | null
          has_ocean_view?: boolean | null
          id?: number
          is_active?: boolean | null
          max_occupancy?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rooms: {
        Row: {
          capacity: number
          created_at: string | null
          description: string | null
          floor: number
          has_balcony: boolean | null
          has_ocean_view: boolean | null
          id: number
          last_updated: string | null
          room_number: string
          room_type_id: number | null
          status: string
        }
        Insert: {
          capacity: number
          created_at?: string | null
          description?: string | null
          floor: number
          has_balcony?: boolean | null
          has_ocean_view?: boolean | null
          id?: number
          last_updated?: string | null
          room_number: string
          room_type_id?: number | null
          status?: string
        }
        Update: {
          capacity?: number
          created_at?: string | null
          description?: string | null
          floor?: number
          has_balcony?: boolean | null
          has_ocean_view?: boolean | null
          id?: number
          last_updated?: string | null
          room_number?: string
          room_type_id?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
