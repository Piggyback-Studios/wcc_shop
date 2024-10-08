"use client";

import CartSummary from "@/src/blocks/CartSummary";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Cart() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <CartSummary />
      <Spacer size="lg" />
    </main>
  );
}
