import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          college?: string;
          headline?: string;
          bio?: string;
          cover_image_url?: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          college?: string;
          headline?: string;
          bio?: string;
          cover_image_url?: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          college?: string;
          headline?: string;
          bio?: string;
          cover_image_url?: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          organization: string;
          location?: string;
          start_date: string;
          end_date?: string;
          logo_url?: string;
          summary?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          organization: string;
          location?: string;
          start_date: string;
          end_date?: string;
          logo_url?: string;
          summary?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          organization?: string;
          location?: string;
          start_date?: string;
          end_date?: string;
          logo_url?: string;
          summary?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          profile_id: string;
          name: string;
          value: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          name: string;
          value: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          name?: string;
          value?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      social_links: {
        Row: {
          id: string;
          profile_id: string;
          platform: string;
          url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          platform: string;
          url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          platform?: string;
          url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      endorsements: {
        Row: {
          id: string;
          profile_id: string;
          name: string;
          title?: string;
          avatar_url?: string;
          text: string;
          keywords?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          name: string;
          title?: string;
          avatar_url?: string;
          text: string;
          keywords?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          name?: string;
          title?: string;
          avatar_url?: string;
          text?: string;
          keywords?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
