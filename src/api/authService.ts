import type { AuthResponse } from '@supabase/supabase-js';

import { supabase } from './supabaseClient';

export type { AuthResponse };

/** E-posta + şifre ile kayıt. `options.data` kullanıcı metadata’sı (ör. display_name) için kullanılabilir. */
export async function signUp(
  email: string,
  password: string,
  options?: { data?: Record<string, unknown> }
): Promise<AuthResponse> {
  return supabase.auth.signUp({
    email,
    password,
    options: options?.data ? { data: options.data } : undefined,
  });
}

/** E-posta + şifre ile giriş. */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signInWithPassword({ email, password });
}

/** Oturumu kapatır ve yerel oturumu temizler. */
export async function signOut(): Promise<{ error: AuthResponse['error'] }> {
  return supabase.auth.signOut();
}
