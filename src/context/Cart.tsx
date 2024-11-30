import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { Product } from "@/src/shared/types";

type Cart = {
  cartProducts: Product[];
};

type ContextType = [cart: Cart, setCart: Dispatch<SetStateAction<Cart>>];

export const CartContext = createContext<ContextType | undefined>(undefined);

const fetchLocalCart = () => {
  if (localStorage.getItem('wcc_cart')) return JSON.parse(localStorage.getItem('wcc_cart') || '')
  else return []
}

export const updateLocalCart = (products: Product[]) => {
  localStorage.setItem("wcc_cart", JSON.stringify(products))
}

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [localCartState, setLocalCartState] = useState<Product[]>([])
  useEffect(() => {
    const localSavedCartOrEmpty = fetchLocalCart();
    console.log({localSavedCartOrEmpty})
   setLocalCartState(localSavedCartOrEmpty)
  }, [])
  const [value, setValue] = useState<Cart>({
    cartProducts: localCartState,
  });
  useEffect(() => {
    setValue({cartProducts: localCartState})
  }, [localCartState])
  return <CartContext.Provider value={[value, setValue]}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside the CartProvider");
  }
  return context;
};
