
export type OrderStatus = 
  | 'Order Received' 
  | 'Store Received' 
  | 'Order Started' 
  | 'Delivery Boy Selected' 
  | 'Invoice Printed' 
  | 'Order Delivered';

export interface Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  gisLocation?: {
    lat: number;
    lng: number;
  };
  storeId: string;
}

export interface Customer {
  id: string;
  phoneNumber: string;
  name: string;
  addresses: Address[];
  paymentMethods: {
    cash: boolean;
    visa: boolean;
    credit: boolean;
  };
}

export interface Store {
  id: string;
  name: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  parentId?: string;
  children?: ProductCategory[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  notes?: string;
  discount?: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  addressId: string;
  deliveryAddress: string;
  storeId: string;
  storeName: string;
  items: OrderItem[];
  totalAmount: number;
  vatAmount?: number;
  deliveryFee?: number;
  status: OrderStatus;
  paymentMethod: 'cash' | 'visa' | 'credit';
  createdAt: string;
  updatedAt: string;
}

export interface OrdersFilter {
  status?: OrderStatus;
  date?: string;
  storeId?: string;
}





/*
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
      addresses: {
        Row: {
          city: string
          created_at: string
          customer_id: string
          gis_location: Json | null
          id: string
          store_id: string
          street: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          customer_id: string
          gis_location?: Json | null
          id?: string
          store_id: string
          street: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          customer_id?: string
          gis_location?: Json | null
          id?: string
          store_id?: string
          street?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_complaints: {
        Row: {
          content: string
          created_at: string
          customer_id: string
          id: string
          resolved: boolean
        }
        Insert: {
          content: string
          created_at?: string
          customer_id: string
          id?: string
          resolved?: boolean
        }
        Update: {
          content?: string
          created_at?: string
          customer_id?: string
          id?: string
          resolved?: boolean
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          id: string
          name: string
          payment_methods: Json
          phone_number: string
          region_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          payment_methods?: Json
          phone_number: string
          region_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          payment_methods?: Json
          phone_number?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "region_setup"
            referencedColumns: ["id"]
          },
        ]
      }
      item_groups: {
        Row: {
          created_at: string
          group_ar_name: string
          group_code: string
          group_eng_name: string
          id: string
          parent_group_id: string | null
          vat_percentage: number
        }
        Insert: {
          created_at?: string
          group_ar_name: string
          group_code: string
          group_eng_name: string
          id?: string
          parent_group_id?: string | null
          vat_percentage?: number
        }
        Update: {
          created_at?: string
          group_ar_name?: string
          group_code?: string
          group_eng_name?: string
          id?: string
          parent_group_id?: string | null
          vat_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_groups_parent_group_id_fkey"
            columns: ["parent_group_id"]
            isOneToOne: false
            referencedRelation: "item_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          created_at: string
          group_id: string
          id: string
          item_ar_name: string
          item_code: string
          item_eng_name: string
          price: number
          uom: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          item_ar_name: string
          item_code: string
          item_eng_name: string
          price: number
          uom: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          item_ar_name?: string
          item_code?: string
          item_eng_name?: string
          price?: number
          uom?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "item_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          order_id: string
          price: number
          product_id: string
          product_name: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id: string
          notes?: string | null
          order_id: string
          price: number
          product_id: string
          product_name: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          order_id?: string
          price?: number
          product_id?: string
          product_name?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_id: string
          created_at: string
          customer_id: string
          customer_name: string
          customer_phone: string
          delivery_address: string
          delivery_fee: number | null
          id: string
          payment_method: string
          status: string
          store_id: string
          store_name: string
          total_amount: number
          updated_at: string
          vat_amount: number | null
        }
        Insert: {
          address_id: string
          created_at?: string
          customer_id: string
          customer_name: string
          customer_phone: string
          delivery_address: string
          delivery_fee?: number | null
          id: string
          payment_method: string
          status: string
          store_id: string
          store_name: string
          total_amount: number
          updated_at?: string
          vat_amount?: number | null
        }
        Update: {
          address_id?: string
          created_at?: string
          customer_id?: string
          customer_name?: string
          customer_phone?: string
          delivery_address?: string
          delivery_fee?: number | null
          id?: string
          payment_method?: string
          status?: string
          store_id?: string
          store_name?: string
          total_amount?: number
          updated_at?: string
          vat_amount?: number | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          icon: string
          id: string
          name: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string
          created_at: string
          description: string
          id: string
          image: string | null
          name: string
          price: number
        }
        Insert: {
          category_id: string
          created_at?: string
          description: string
          id: string
          image?: string | null
          name: string
          price: number
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          image?: string | null
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      region_setup: {
        Row: {
          created_at: string
          delivery_value: number
          id: string
          region_ar_name: string
          region_code: string
          region_eng_name: string
        }
        Insert: {
          created_at?: string
          delivery_value?: number
          id?: string
          region_ar_name: string
          region_code: string
          region_eng_name: string
        }
        Update: {
          created_at?: string
          delivery_value?: number
          id?: string
          region_ar_name?: string
          region_code?: string
          region_eng_name?: string
        }
        Relationships: []
      }
      store_region_links: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          region_id: string
          store_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          region_id: string
          store_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          region_id?: string
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_region_links_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "region_setup"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_region_links_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store_setup"
            referencedColumns: ["id"]
          },
        ]
      }
      store_setup: {
        Row: {
          created_at: string
          id: string
          store_ar_name: string
          store_code: string
          store_eng_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          store_ar_name: string
          store_code: string
          store_eng_name: string
        }
        Update: {
          created_at?: string
          id?: string
          store_ar_name?: string
          store_code?: string
          store_eng_name?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          address: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          address: string
          created_at?: string
          id: string
          name: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      system_users: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          password: string
          user_code: string
          user_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          password: string
          user_code: string
          user_name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          password?: string
          user_code?: string
          user_name?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          allow_item_groups_setup: boolean
          allow_new_customer: boolean
          allow_region_setup: boolean
          allow_store_setup: boolean
          allow_user_setup: boolean
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          allow_item_groups_setup?: boolean
          allow_new_customer?: boolean
          allow_region_setup?: boolean
          allow_store_setup?: boolean
          allow_user_setup?: boolean
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          allow_item_groups_setup?: boolean
          allow_new_customer?: boolean
          allow_region_setup?: boolean
          allow_store_setup?: boolean
          allow_user_setup?: boolean
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_records: {
        Row: {
          created_at: string
          entry_time: string
          exit_time: string | null
          id: string
          license_plate: string
          notes: string | null
          owner_name: string
        }
        Insert: {
          created_at?: string
          entry_time?: string
          exit_time?: string | null
          id?: string
          license_plate: string
          notes?: string | null
          owner_name: string
        }
        Update: {
          created_at?: string
          entry_time?: string
          exit_time?: string | null
          id?: string
          license_plate?: string
          notes?: string | null
          owner_name?: string
        }
        Relationships: []
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
*/