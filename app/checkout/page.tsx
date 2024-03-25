"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>();
  const fetchClientSecret = async () => {
    const res = await fetch("/api/get-secret");
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
    <main className={styles.main}>
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
}
