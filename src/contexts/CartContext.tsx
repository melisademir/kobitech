import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CatalogProduct } from "@/data/catalog-products";

interface CartContextType {
  items: CatalogProduct[];
  addItem: (p: CatalogProduct) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "digitalhub-cart";

const loadCart = (): CatalogProduct[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CatalogProduct[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (p: CatalogProduct) => {
    setItems(prev => prev.find(i => i.id === p.id) ? prev : [...prev, p]);
  };
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setItems([]);
  const isInCart = (id: string) => items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isInCart, count: items.length }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
