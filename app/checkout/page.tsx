"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import CheckoutForm from "@/src/blocks/CheckoutForm";
import { useCartContext } from "@/src/context/Cart";
import Spacer from "@/src/blocks/ui/Spacer";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>();
  const [cart] = useCartContext();
  const fetchClientSecret = async () => {
    const res = await fetch("/api/get-secret", {
      method: "POST",
      body: JSON.stringify({
        products: cart.cartProducts,
      }),
    });
    const jsonRes = await res.json();
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
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
}
