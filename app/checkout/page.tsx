"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState, ChangeEvent } from "react";

import CheckoutForm from "@/src/blocks/CheckoutForm";
import { useCartContext } from "@/src/context/Cart";
import Spacer from "@/src/blocks/ui/Spacer";
import CartTotalsSummary from "@/src/blocks/CartTotalsSummary";
import CustomInput from "@/src/components/common/CustomInput";
import ContentContainer from "@/src/components/common/ContentContainer";
import CustomButton from "@/src/components/common/CustomButton";
import { parseEmail } from "@/src/utils/parse";
import toast from "@/src/utils/toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>();
  const [customerInput, setCustomerInput] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [cart] = useCartContext();
  const fetchClientSecret = async () => {
    const res = await fetch("/api/get-secret", {
      method: "POST",
      body: JSON.stringify({
        products: cart.cartProducts,
        customerEmail,
      }),
    });
    const jsonRes = await res.json();
    setClientSecret(jsonRes.clientSecret);
  };

  const validateCustomerInput = () => {
    if (parseEmail(customerInput)) setCustomerEmail(customerInput);
    else
      toast(
        "There was a problem validating that email. Please try again, or try a different email.",
        "error"
      );
  };
  useEffect(() => {
    if (customerEmail) fetchClientSecret();
  }, [customerEmail]);
  const stripeOptions = {
    clientSecret,
  };
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <CartTotalsSummary />
      <Spacer size="lg" />
      <ContentContainer>
        <CustomInput
          name="email"
          type="email"
          placeholder="Your Email Address"
          label="Email"
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setCustomerInput(evt.target.value)
          }
        />
        {!customerEmail && (
          <CustomButton
            label="submit"
            onClick={() => validateCustomerInput()}
          />
        )}
      </ContentContainer>
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  );
}
