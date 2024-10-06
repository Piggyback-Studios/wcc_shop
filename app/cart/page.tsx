"use client";

import CartSummary from "@/src/blocks/CartSummary";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Cart() {
  return (
    <>
      <Spacer size="lg" />
      <CartSummary />
      <Spacer size="lg" />
    </>
  );
}
