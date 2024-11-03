"use client";

import { PropsWithChildren } from "react";

import { CartProvider } from "@/src/context/Cart";
import { SidebarProvider } from "@/src/context/Sidebar";
import { TotalsProvider } from "@/src/context/Totals";

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <CartProvider>
      <TotalsProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </TotalsProvider>
    </CartProvider>
  );
};

export default ProviderWrapper;
