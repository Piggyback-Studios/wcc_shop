import { Product, Metadata } from "@/src/shared/types";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SK || "");
  const data = await req.json();
  const { products } = data;
  console.log({ products });
  const total = await products.reduce(
    async (runningTotal: number, current: Product) => {
      const resolvedRunningTotal = await runningTotal;
      if (current.cartQuantity) {
        // console.log({ current });
        const currentProduct = await stripe.products.retrieve(current.stripeId);
        const currentPrice = await stripe.prices.retrieve(
          currentProduct.default_price as string
        );
        return (runningTotal =
          resolvedRunningTotal +
          current.cartQuantity * (currentPrice.unit_amount || 0));
      } else return 0;
    },
    0
  );
  const metadata: Metadata = {};
  products.forEach((product: Product) => {
    metadata[
      product.stripeId
    ] = `${product.name} - Quantity: ${product.cartQuantity}`;
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    metadata,
  });
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
