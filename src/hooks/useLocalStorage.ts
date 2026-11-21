'use client';
import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook that syncs a value with localStorage.
 *
 * Key fix for hydration:
 * - The initial `useState` ALWAYS uses `initialValue` (same on server + client first render).
 * - After mount, a `useEffect` reads from localStorage and updates state.
 * - This prevents SSR/client HTML mismatches.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Always start with initialValue to keep SSR + first client render in sync
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // After mount (client only), hydrate from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error('useLocalStorage error reading key', key, error);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            console.error('useLocalStorage error setting key', key, error);
          }
          return valueToStore;
        });
      } catch (error) {
        console.error('useLocalStorage error in setValue', key, error);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
