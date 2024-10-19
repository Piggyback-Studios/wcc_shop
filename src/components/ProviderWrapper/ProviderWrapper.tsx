"use client";

import { PropsWithChildren } from "react";

import { CartProvider } from "@/src/context/Cart";
import { SidebarProvider } from "@/src/context/Sidebar";

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <CartProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </CartProvider>
  );
};

export default ProviderWrapper;
