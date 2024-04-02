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

type Cart = {
  cartItems: CartItem[];
  totalCartItemsQuantity: number;
};

type ContextType = [cart: Cart, setCart: Dispatch<SetStateAction<Cart>>];

export const CartContext = createContext<ContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<Cart>({ cartItems: [], totalCartItemsQuantity: 0 });
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside the ThemeProvider");
  }
  return context;
};
