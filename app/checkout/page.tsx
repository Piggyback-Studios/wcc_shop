"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import CheckoutForm from "@/src/blocks/CheckoutForm";
import { useCartContext } from "@/src/context/Cart";
import Spacer from "@/src/blocks/ui/Spacer";
import CartTotalsSummary from "@/src/blocks/CartTotalsSummary";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>();
  const [cart] = useCartContext();
  const fetchClientSecret = async () => {
    console.log(cart.cartProducts);
    const res = await fetch("/api/get-secret", {
      method: "POST",
      body: JSON.stringify({
        products: cart.cartProducts,
      }),
    });
    console.log({ res });
    const jsonRes = await res.json();
    console.log({ jsonRes });
    setClientSecret(jsonRes.clientSecret);
  };
  useEffect(() => {
    fetchClientSecret();
  }, []);
  const stripeOptions = {
    clientSecret,
  };
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <CartTotalsSummary />
      <Spacer size="lg" />
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
}
