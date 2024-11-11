"use client";

import { PropsWithChildren } from "react";

import { CartProvider } from "@/src/context/Cart";
import { SidebarProvider } from "@/src/context/Sidebar";
import { TotalsProvider } from "@/src/context/Totals";
import { ProductsProvider } from "@/src/context/Products";
import { AdminProductsProvider } from "@/src/context/AdminProducts";

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ProductsProvider>
      <AdminProductsProvider>
        <CartProvider>
          <TotalsProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </TotalsProvider>
        </CartProvider>
      </AdminProductsProvider>
    </ProductsProvider>
  );
};

export default ProviderWrapper;
