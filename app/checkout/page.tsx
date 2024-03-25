"use client";

import styles from "./page.module.css";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Home() {
  const stripeOptions = {
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <main className={styles.main}>
      <Elements stripe={stripePromise} options={stripeOptions}>
        <CheckoutForm />
      </Elements>
    </main>
  );
}
