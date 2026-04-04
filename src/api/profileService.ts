import { supabase } from './supabaseClient';

export async function markOnboardingComplete(userId: string) {
  return supabase.from('profiles').update({ onboarding_completed: true }).eq('id', userId);
}

export async function fetchMyProfile() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { data: null, error: userError ?? new Error('Oturum yok') };
  }
  return supabase.from('profiles').select('*').eq('id', userData.user.id).maybeSingle();
}
