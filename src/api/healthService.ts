/**
 * Sağlık / ölçüm kayıtları (kilo, uyku, aşı vb.).
 * Tablolar `database.ts` ile tanımlandığında burada `supabase.from(...)` kullanın.
 */
export async function fetchHealthEntriesByBabyId(_babyId: string) {
  void _babyId;
  return { data: null as unknown[] | null, error: null as Error | null };
}
