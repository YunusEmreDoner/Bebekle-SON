/**
 * Şema kaynağı: `supabase/migrations/`. Güncellemek için:
 * `npx supabase gen types typescript --project-id <ref> > src/types/database.ts`
 */
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
      profiles: {
        Row: {
          id: string;
          display_name: string;
          role: 'mother' | 'father' | 'caregiver' | 'other' | null;
          journey_stage: 'pregnancy' | 'born' | null;
          active_baby_id: string | null;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          role?: 'mother' | 'father' | 'caregiver' | 'other' | null;
          journey_stage?: 'pregnancy' | 'born' | null;
          active_baby_id?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          role?: 'mother' | 'father' | 'caregiver' | 'other' | null;
          journey_stage?: 'pregnancy' | 'born' | null;
          active_baby_id?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      babies: {
        Row: {
          id: string;
          user_id: string;
          status: 'pregnancy' | 'born';
          name: string | null;
          due_date: string | null;
          birth_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status: 'pregnancy' | 'born';
          name?: string | null;
          due_date?: string | null;
          birth_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: 'pregnancy' | 'born';
          name?: string | null;
          due_date?: string | null;
          birth_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
