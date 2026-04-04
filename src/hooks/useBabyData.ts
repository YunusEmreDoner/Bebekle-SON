import { useCallback, useEffect, useState } from 'react';

import * as babyService from '../api/babyService';
import type { User } from '@supabase/supabase-js';

type BabyRow = Record<string, unknown>;

/** Oturumdaki kullanıcıya bağlı bebek listesi (şema hazır olunca `babyService` doldurulur). */
export function useBabyData(user: User | null) {
  const [babies, setBabies] = useState<BabyRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!user?.id) {
      setBabies(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await babyService.fetchBabiesByUserId(user.id);
      if (err) setError(err instanceof Error ? err : new Error(String(err)));
      setBabies((data as BabyRow[] | null) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { babies, loading, error, refresh };
}
