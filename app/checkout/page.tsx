"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import CheckoutForm from "../components/CheckoutForm";
import { useCartContext } from "../context/Cart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>();
  const [cart] = useCartContext();
  const fetchClientSecret = async () => {
    const res = await fetch("/api/get-secret", {
      method: "POST",
      body: JSON.stringify({
        products: cart.cartItems,
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
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
