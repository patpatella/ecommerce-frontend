import { useState } from "react";
import { CartContext, type CartItem } from "./CartContext";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === item.id && p.selectedVariant === item.selectedVariant
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity = (copy[idx].quantity ?? 1) + 1;
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (item: CartItem) =>
    setItems((prev) =>
      prev.filter(
        (p) => !(p.id === item.id && p.selectedVariant === item.selectedVariant)
      )
    );

  const clearCart = () => setItems([]);

  const updateQuantity = (item: CartItem, quantity: number) =>
    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id && p.selectedVariant === item.selectedVariant
          ? { ...p, quantity }
          : p
      )
    );

  const updateVariant = (item: CartItem, variant: string) =>
    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id && p.selectedVariant === item.selectedVariant
          ? { ...p, selectedVariant: variant }
          : p
      )
    );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, updateQuantity, updateVariant }}
    >
      {children}
    </CartContext.Provider>
  );
};
