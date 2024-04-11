import { CartItem } from "@/app/types/cart.types";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

interface IMetadata {
  [k: string]: string;
}

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
        return (runningTotal =
          resolvedRunningTotal +
          current.quantity * (currentPrice.unit_amount || 0));
      } else return 0;
    },
    0
  );
  const metadata: IMetadata = {};
  products.forEach((product: CartItem) => {
    metadata[product.id] = `${product.name} - Quantity: ${product.quantity}`;
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
