"use client";

import { PropsWithChildren } from "react";

import { CartProvider } from "@/src/context/Cart";
import { SidebarProvider } from "@/src/context/Sidebar";
import { TotalsProvider } from "@/src/context/Totals";
import { ProductsProvider } from "@/src/context/Products";
import { AdminProductsProvider } from "@/src/context/AdminProducts";
import { OrdersProvider } from "@/src/context/Orders";

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ProductsProvider>
      <AdminProductsProvider>
        <OrdersProvider>
          <CartProvider>
            <TotalsProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </TotalsProvider>
          </CartProvider>
        </OrdersProvider>
      </AdminProductsProvider>
    </ProductsProvider>
  );
};

export default ProviderWrapper;
