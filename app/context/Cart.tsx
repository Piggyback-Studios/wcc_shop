import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

type CartItem = {
  productId: string;
  price: string;
  quantity: number;
};

type ContextType = [
  cart: CartItem[],
  setCart: Dispatch<SetStateAction<CartItem[]>>
];

export const CartContext = createContext<ContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<CartItem[]>([]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside the ThemeProvider");
  }
  return context;
};
