import { createClient } from '@supabase/supabase-js';

import { createSupabaseAuthStorage } from './authStorage';
import type { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const isPlaceholder =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('YOUR_PROJECT_REF') ||
  supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY');

if (__DEV__ && isPlaceholder) {
  console.warn(
    '[supabase] EXPO_PUBLIC_SUPABASE_URL ve EXPO_PUBLIC_SUPABASE_ANON_KEY için kök dizindeki .env dosyasını doldurun; ardından Metro’yu yeniden başlatın.'
  );
}

/** Tekil Supabase istemcisi. Web: localStorage; native: AsyncStorage (hata olursa geçici bellek). */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createSupabaseAuthStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
