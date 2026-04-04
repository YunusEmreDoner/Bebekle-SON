import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { signIn as signInApi, signOut as signOutApi, signUp as signUpApi } from '../api/authService';
import { supabase } from '../api/supabaseClient';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSession(data.session ?? null);
        setLoading(false);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback((email: string, password: string) => signInApi(email, password), []);
  const signUp = useCallback(
    (email: string, password: string, options?: { data?: Record<string, unknown> }) =>
      signUpApi(email, password, options),
    []
  );
  const signOut = useCallback(() => signOutApi(), []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
