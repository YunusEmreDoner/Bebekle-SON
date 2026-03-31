/** Batı burcu (tropik) — ay 1–12, gün 1–31 */
export function getWesternZodiacSign(month, day) {
  const d = month * 100 + day;
  if (d >= 1222 || d <= 119) {
    return { key: 'capricorn', label: 'Oğlak', dateRange: '22 Ara – 19 Oca' };
  }
  if (d >= 120 && d <= 218) {
    return { key: 'aquarius', label: 'Kova', dateRange: '20 Oca – 18 Şub' };
  }
  if (d >= 219 && d <= 320) {
    return { key: 'pisces', label: 'Balık', dateRange: '19 Şub – 20 Mar' };
  }
  if (d >= 321 && d <= 419) {
    return { key: 'aries', label: 'Koç', dateRange: '21 Mar – 19 Nis' };
  }
  if (d >= 420 && d <= 520) {
    return { key: 'taurus', label: 'Boğa', dateRange: '20 Nis – 20 May' };
  }
  if (d >= 521 && d <= 620) {
    return { key: 'gemini', label: 'İkizler', dateRange: '21 May – 20 Haz' };
  }
  if (d >= 621 && d <= 722) {
    return { key: 'cancer', label: 'Yengeç', dateRange: '21 Haz – 22 Tem' };
  }
  if (d >= 723 && d <= 822) {
    return { key: 'leo', label: 'Aslan', dateRange: '23 Tem – 22 Ağu' };
  }
  if (d >= 823 && d <= 922) {
    return { key: 'virgo', label: 'Başak', dateRange: '23 Ağu – 22 Eyl' };
  }
  if (d >= 923 && d <= 1022) {
    return { key: 'libra', label: 'Terazi', dateRange: '23 Eyl – 22 Eki' };
  }
  if (d >= 1023 && d <= 1121) {
    return { key: 'scorpio', label: 'Akrep', dateRange: '23 Eki – 21 Kas' };
  }
  if (d >= 1122 && d <= 1221) {
    return { key: 'sagittarius', label: 'Yay', dateRange: '22 Kas – 21 Ara' };
  }
  return { key: 'capricorn', label: 'Oğlak', dateRange: '22 Ara – 19 Oca' };
}
