"use client";

import { PropsWithChildren } from "react";

import { CartProvider } from "@/src/context/Cart";
import { SidebarProvider } from "@/src/context/Sidebar";
import { TotalsProvider } from "@/src/context/Totals";
import { ProductsProvider } from "@/src/context/Products";

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <TotalsProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </TotalsProvider>
      </CartProvider>
    </ProductsProvider>
  );
};

export default ProviderWrapper;
