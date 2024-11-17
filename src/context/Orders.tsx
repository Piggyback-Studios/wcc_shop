import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

import { Order } from "@/src/shared/types";

type Orders = {
  orders: Order[];
};

type ContextType = [
  orders: Orders,
  setOrders: Dispatch<SetStateAction<Orders>>
];

export const OrdersContext = createContext<ContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<Orders>({
    orders: [],
  });
  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrdersContext must be used inside the OrdersProvider");
  }
  return context;
};
