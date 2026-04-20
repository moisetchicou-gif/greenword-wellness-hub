import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCartOpen: () => void;
  setIsOpen: (v: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

// IDs des offres "sur rendez-vous uniquement" qui ne peuvent pas être ajoutées au panier.
// Doit rester synchronisé avec src/data/offers.ts.
const BOOKING_ONLY_IDS = new Set<number>([1001, 1002]);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const MAX_QUANTITY = 50;
  const MAX_CART_ITEMS = 30;

  const addItem = (item: Omit<CartItem, "quantity">) => {
    // Garde-fou : les offres spéciales (Scanner QRMA, Magic Detoxin Pad)
    // sont uniquement disponibles via réservation et ne doivent jamais
    // arriver dans le panier, même via un appel direct au hook.
    if (BOOKING_ONLY_IDS.has(item.id)) {
      toast({
        title: "Sur réservation uniquement",
        description: `${item.name} se réserve directement avec notre équipe — pas d'ajout au panier.`,
      });
      return;
    }

    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        if (existing.quantity >= MAX_QUANTITY) return prev;
        return prev.map((i) => i.id === item.id ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i);
      }
      if (prev.length >= MAX_CART_ITEMS) return prev;
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) return removeItem(id);
    const safeQty = Math.min(Math.max(1, Math.floor(qty)), MAX_QUANTITY);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: safeQty } : i));
  };
  const clearCart = () => setItems([]);
  const toggleCartOpen = () => setIsOpen((v) => !v);
  const total = items.reduce((s, i) => s + i.priceNum * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, toggleCartOpen, setIsOpen, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
