import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

import { Product } from "@/src/shared/types";

type Products = {
  products: Product[];
};

type ContextType = [
  products: Products,
  setProducts: Dispatch<SetStateAction<Products>>
];

export const ProductsContext = createContext<ContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<Products>({
    products: [],
  });
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used inside the ProductsProvider"
    );
  }
  return context;
};
