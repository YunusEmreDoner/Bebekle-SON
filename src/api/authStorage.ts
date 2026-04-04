import { Platform } from 'react-native';

/** Supabase `auth.storage` ile uyumlu arayüz */
export type AuthSessionStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

function webLocalStorage(): AuthSessionStorage {
  return {
    getItem(key) {
      try {
        if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
          const ls = (globalThis as unknown as { localStorage?: Storage }).localStorage;
          return Promise.resolve(ls?.getItem(key) ?? null);
        }
      } catch {
        /* ignore */
      }
      return Promise.resolve(null);
    },
    setItem(key, value) {
      try {
        (globalThis as unknown as { localStorage?: Storage }).localStorage?.setItem(key, value);
      } catch {
        /* ignore */
      }
      return Promise.resolve();
    },
    removeItem(key) {
      try {
        (globalThis as unknown as { localStorage?: Storage }).localStorage?.removeItem(key);
      } catch {
        /* ignore */
      }
      return Promise.resolve();
    },
  };
}

function memoryStorage(): AuthSessionStorage {
  const map = new Map<string, string>();
  return {
    getItem: (key) => Promise.resolve(map.get(key) ?? null),
    setItem: (key, value) => {
      map.set(key, value);
      return Promise.resolve();
    },
    removeItem: (key) => {
      map.delete(key);
      return Promise.resolve();
    },
  };
}

function wrapWithFallback(
  inner: AuthSessionStorage,
  fallback: AuthSessionStorage,
  label: string
): AuthSessionStorage {
  let useFallback = false;
  const tryOp = async <T>(primary: () => Promise<T>, fb: () => Promise<T>): Promise<T> => {
    if (useFallback) return fb();
    try {
      return await primary();
    } catch (e) {
      useFallback = true;
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.warn(
          `[supabase] ${label} kullanılamıyor; oturum geçici olarak bellekte tutuluyor. Geliştirme build / Expo Go sürümünü kontrol edin.`,
          e
        );
      }
      return fb();
    }
  };
  return {
    getItem: (key) => tryOp(() => inner.getItem(key), () => fallback.getItem(key)),
    setItem: (key, value) =>
      tryOp(() => inner.setItem(key, value), () => fallback.setItem(key, value)),
    removeItem: (key) => tryOp(() => inner.removeItem(key), () => fallback.removeItem(key)),
  };
}

/**
 * Web: localStorage. Native: AsyncStorage; native modül yoksa veya hata verirse bellek (kalıcı değil).
 */
export function createSupabaseAuthStorage(): AuthSessionStorage {
  if (Platform.OS === 'web') {
    return webLocalStorage();
  }

  // require: bazı ortamlarda top-level import native modülü erken yükleyebilir
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const AsyncStorage = require('@react-native-async-storage/async-storage')
    .default as AuthSessionStorage;

  return wrapWithFallback(AsyncStorage, memoryStorage(), 'AsyncStorage');
}
