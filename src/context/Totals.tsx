import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

type Totals = {
  totalCartProductsQuantity: number;
  cartSubtotal: number;
  cartTotal: number;
  shippingAmount: number;
  taxesAmount: number;
};

type ContextType = [
  totals: Totals,
  setTotals: Dispatch<SetStateAction<Totals>>
];

export const TotalsContext = createContext<ContextType | undefined>(undefined);

export const TotalsProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useState<Totals>({
    totalCartProductsQuantity: 0,
    cartSubtotal: 0,
    shippingAmount: 0,
    taxesAmount: 0,
    cartTotal: 0,
  });
  return (
    <TotalsContext.Provider value={value}>{children}</TotalsContext.Provider>
  );
};

export const useTotalsContext = () => {
  const context = useContext(TotalsContext);
  if (!context) {
    throw new Error("useTotalsContext must be used inside the TotalsProvider");
  }
  return context;
};
