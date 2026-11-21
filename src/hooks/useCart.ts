'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/types/product';
import { products } from '@/data/products';

type CartItem = {
  productId: string;
  quantity: number;
};

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { productId, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  // Skip cart entries whose product no longer exists (e.g. old IDs saved in localStorage)
  const cartItems = cart.flatMap((ci) => {
    const prod = products.find((p) => p.id === ci.productId);
    return prod ? [{ ...ci, product: prod as Product }] : [];
  });

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartItems, subtotal };
}
