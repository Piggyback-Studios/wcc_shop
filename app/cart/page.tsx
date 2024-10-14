"use client";

import CartSummary from "@/src/blocks/CartSummary";
import CartTotalsSummary from "@/src/blocks/CartTotalsSummary";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Cart() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Spacer size="lg" />
      <CartTotalsSummary />
      <Spacer size="lg" />
      <CartSummary />
      <Spacer size="lg" />
    </main>
  );
}
