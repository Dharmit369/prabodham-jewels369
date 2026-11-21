'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 * Wishlist hook – stores an array of product IDs in localStorage.
 * Provides helpers to add, remove, toggle and query the wishlist.
 */
export function useWishlist() {
  // persisted array of product IDs (strings)
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);

  const addToWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted };
}
