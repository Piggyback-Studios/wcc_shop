"use client";

import { PropsWithChildren } from "react";

import { CartProvider } from "@/src/context/Cart";

const ProviderWrapper = ({ children }: PropsWithChildren) => {
  return <CartProvider>{children}</CartProvider>;
};

export default ProviderWrapper;
