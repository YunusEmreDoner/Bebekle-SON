/**
 * Geliştirme akışı
 * -----------------
 * `SKIP_AUTH_FOR_DEV = true` → giriş/onboarding atlanır, doğrudan ana sekmeler.
 * `false` → ilk ekran giriş (AuthWelcome); "Yeni kullanıcıyım" profil akışına gider.
 *
 * Ortam değişkeni (Metro yeniden başlatılmalı):
 *   EXPO_PUBLIC_SKIP_AUTH=1  → geçici olarak girişi atla (içerik çalışması için)
 */

export const SKIP_AUTH_FOR_DEV = false;

export function shouldSkipAuthFlow() {
  const v = process.env.EXPO_PUBLIC_SKIP_AUTH;
  if (v === '1' || v === 'true') return true;
  return SKIP_AUTH_FOR_DEV;
}
