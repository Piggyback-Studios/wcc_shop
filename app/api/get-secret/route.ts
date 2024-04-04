import { CartItem } from "@/app/types/cart.types";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SK || "");
  const data = await req.json();
  const { products } = data;
  const total = await products.reduce(
    async (runningTotal: number, current: CartItem) => {
      const resolvedRunningTotal = await runningTotal;
      if (current.quantity) {
        const currentProduct = await stripe.products.retrieve(current.id);
        const currentPrice = await stripe.prices.retrieve(
          currentProduct.default_price as string
        );
        console.log({ name: current.name });
        console.log({ resolvedRunningTotal });
        console.log({ priceInCents: currentPrice.unit_amount });
        console.log({ qty: current.quantity });
        return (runningTotal =
          resolvedRunningTotal +
          current.quantity * (currentPrice.unit_amount || 0));
      } else return 0;
    },
    0
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    stuff: "hahaha",
  });
}
