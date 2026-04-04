/** GG.AA.YYYY (TR sık kullanılan kısa tarih). */
export function formatShortDate(d) {
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}
