import { createContext } from "react";
import type { Product } from "../App";

export type CartItem = Product & { quantity?: number; selectedVariant?: string };

export const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  updateVariant: (item: CartItem, variant: string) => void;
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  updateVariant: () => {},
});
