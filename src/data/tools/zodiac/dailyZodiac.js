import { getWesternZodiacSign } from './zodiacHelper';

/**
 * Annenin doğum tarihi — backend gelene kadar burayı güncelle.
 * Sonra profil/context’ten okunacak.
 */
export const MOCK_MOTHER_BIRTH = { month: 7, day: 15 };

/**
 * Günlük burç içeriği (DB tek kayıt döndüğünde bu yapıyı doldurursun).
 * signKey ile eşleşen alan varsa kullanılır; yoksa `default` + sign bilgisi gösterilir.
 */
const CONTENT_BY_SIGN = {
  default: {
    headline: '',
    mainText: '',
    love: '',
    mood: '',
    careTip: '',
    luckyNumber: '',
    luckyColor: '',
  },
};

export function getDailyZodiacPayload(motherBirth = MOCK_MOTHER_BIRTH) {
  const sign = getWesternZodiacSign(motherBirth.month, motherBirth.day);
  const base = CONTENT_BY_SIGN.default || {};
  const extra = CONTENT_BY_SIGN[sign.key] || {};
  const content = { ...base, ...extra };
  return { sign, content };
}
