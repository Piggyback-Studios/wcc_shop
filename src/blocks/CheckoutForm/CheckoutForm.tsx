"use client";

import ContentContainer from "@/src/components/common/ContentContainer";
import CustomButton from "@/src/components/common/CustomButton";
import toast from "@/src/utils/toast";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [submitLabel, setSubmitLabel] = useState<string>("Submit");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setDisabled(true);
    setSubmitLabel("Submitting...");
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      // confirmParams: {
      //   // return_url: "/order-complete",
      // },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      toast(
        "There was an error processing your payment. Please check your payment information and try again.",
        "error"
      );
      setSubmitLabel("Try Again");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      if (result.paymentIntent.status === "succeeded") {
        // redirect to order complete page here
        router.push("/order-complete");
      }
    }
    setDisabled(false);
  };

  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement options={{ mode: "shipping" }} className="mb-8" />
          <CustomButton disabled={!stripe || disabled} label={submitLabel} />
        </form>
      </ContentContainer>
    </section>
  );
};

export default CheckoutForm;
