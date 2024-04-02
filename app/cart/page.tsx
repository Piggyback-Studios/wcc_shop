"use client";

import ProviderWrapper from "../components/ProviderWrapper";
import Navbar from "../components/Navbar";
import CartSummary from "../components/CartSummary";

export default function Cart() {
  return (
    <ProviderWrapper>
      <Navbar />
      <main className="content_wrapper">
        <CartSummary />
      </main>
    </ProviderWrapper>
  );
}
