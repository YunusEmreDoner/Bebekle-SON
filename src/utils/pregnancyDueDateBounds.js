/** Hamilelik tahmini doğum: bugünden (dahil) en fazla 9 ay sonrası (dahil). */

export function getPregnancyDueDateMinimumDate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getPregnancyDueDateMaximumDate() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setMonth(d.getMonth() + 9);
  return d;
}

/** Yerel takvim günü → YYYY-MM-DD (Postgres `date`). */
export function toLocalYmd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** YYYY-MM-DD → yerel gece yarısı Date (saat dilimi kayması olmaması için). */
export function parseYmdToLocalDate(ymd) {
  if (!ymd || typeof ymd !== 'string') return new Date();
  const parts = ymd.split('-').map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return new Date();
  const [y, m, d] = parts;
  return new Date(y, m - 1, d);
}

/** Seçilen tarihi [min, max] aralığına sıkıştır. */
export function clampDueDateToPregnancyBounds(date, min = getPregnancyDueDateMinimumDate(), max = getPregnancyDueDateMaximumDate()) {
  const t = date.getTime();
  if (t < min.getTime()) return new Date(min);
  if (t > max.getTime()) return new Date(max);
  return date;
}
