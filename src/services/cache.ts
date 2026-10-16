/**
 * Client-side caching and persistence utility for fast, responsive storefront performance.
 */

const CACHE_PREFIX = 'korakagaz_store_';

export const storageCache = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!item) return defaultValue;
      const parsed = JSON.parse(item);
      // Optional TTL check
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return defaultValue;
      }
      return parsed.value !== undefined ? parsed.value : parsed;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T, ttlMs?: number): void {
    try {
      const payload = ttlMs 
        ? { value, expiry: Date.now() + ttlMs } 
        : { value };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(payload));
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } catch {
      // ignore
    }
  }
};
