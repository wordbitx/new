import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem, OrderSummary } from '@/types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  orderSummary: OrderSummary | null;
  currentOrderNumber: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getOrderSummary: () => OrderSummary;
  setOrderSummary: (summary: OrderSummary | null) => void;
  setCurrentOrderNumber: (orderNumber: string | null) => void;
}

const TAX_RATE = 0.08;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      orderSummary: null,
      currentOrderNumber: null,

      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },

      removeFromCart: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isCartOpen: !state.isCartOpen }));
      },

      setCartOpen: (open: boolean) => {
        set({ isCartOpen: open });
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getOrderSummary: () => {
        const items = get().items;
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;
        return {
          items,
          subtotal: Number(subtotal.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          total: Number(total.toFixed(2)),
        };
      },

      setOrderSummary: (summary: OrderSummary | null) => {
        set({ orderSummary: summary });
      },

      setCurrentOrderNumber: (orderNumber: string | null) => {
        set({ currentOrderNumber: orderNumber });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const generateOrderNumber = () => {
  const prefix = 'ORD';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}`;
};
