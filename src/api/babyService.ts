import { supabase } from './supabaseClient';

import type { User } from '@supabase/supabase-js';

export async function fetchBabiesByUserId(userId: string) {
  return supabase.from('babies').select('*').eq('user_id', userId).order('created_at', { ascending: true });
}

export async function fetchPregnancyDueDateForUser(userId: string) {
  const { data: profile, error: pErr } = await supabase
    .from('profiles')
    .select('active_baby_id')
    .eq('id', userId)
    .maybeSingle();

  if (pErr) return { babyId: null as string | null, dueDateYmd: null as string | null, error: pErr };
  if (!profile?.active_baby_id) {
    return { babyId: null, dueDateYmd: null, error: null };
  }

  const { data: baby, error: bErr } = await supabase
    .from('babies')
    .select('id, due_date, status')
    .eq('id', profile.active_baby_id)
    .maybeSingle();

  if (bErr) return { babyId: null, dueDateYmd: null, error: bErr };
  if (!baby || baby.status !== 'pregnancy' || !baby.due_date) {
    return { babyId: null, dueDateYmd: null, error: null };
  }

  return { babyId: baby.id, dueDateYmd: baby.due_date, error: null };
}

export async function createPregnancyBaby(userId: string, dueDateYmd: string) {
  const { data: baby, error: insertError } = await supabase
    .from('babies')
    .insert({
      user_id: userId,
      status: 'pregnancy',
      due_date: dueDateYmd,
      birth_date: null,
    })
    .select('id')
    .single();

  if (insertError) return { error: insertError };

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ active_baby_id: baby.id })
    .eq('id', userId);

  return { error: profileError };
}

export async function updateBabyDueDate(babyId: string, dueDateYmd: string) {
  return supabase.from('babies').update({ due_date: dueDateYmd }).eq('id', babyId);
}

/** E-posta onayı sonrası ilk giriş: metadata’da due date varsa ve bebek yoksa kayıt oluşturur. */
export async function ensurePregnancyBabyFromMetadata(user: User) {
  const due = user.user_metadata?.pregnancy_due_date;
  const stage = user.user_metadata?.journey_stage;
  if (stage !== 'pregnancy' || typeof due !== 'string' || !due) {
    return { error: null };
  }

  const { babyId, error: fetchErr } = await fetchPregnancyDueDateForUser(user.id);
  if (fetchErr) return { error: fetchErr };
  if (babyId) return { error: null };

  return createPregnancyBaby(user.id, due);
}
