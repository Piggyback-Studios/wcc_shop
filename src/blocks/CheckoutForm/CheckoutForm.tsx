"use client";

import ContentContainer from "@/src/components/common/ContentContainer";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.SyntheticEvent) => {
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
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <section>
      <ContentContainer>
        <div>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <AddressElement options={{ mode: "shipping" }} />
            <button disabled={!stripe}>Submit</button>
          </form>
        </div>
      </ContentContainer>
    </section>
  );
};

export default CheckoutForm;