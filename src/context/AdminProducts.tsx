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

export const AdminProductsContext = createContext<ContextType | undefined>(
  undefined
);

export const AdminProductsProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<Products>({
    products: [],
  });
  return (
    <AdminProductsContext.Provider value={value}>
      {children}
    </AdminProductsContext.Provider>
  );
};

export const useAdminProductsContext = () => {
  const context = useContext(AdminProductsContext);
  if (!context) {
    throw new Error(
      "useAdminProductsContext must be used inside the ProductsProvider"
    );
  }
  return context;
};
