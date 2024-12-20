import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

import { Product } from "@/src/shared/types";
import db from "@/src/utils/data/db";
import { randomIntFromInterval } from "@/src/utils/numbers";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SK || "");
  const data = await req.json();
  const { products, customerEmail } = data;
  const dbProducts = await db.product.findMany({
    where: { id: { in: products.map((product: Product) => product.id) } },
  });
  const order = await db.order.create({
    data: {
      paid: false,
      shipped: false,
      customerEmail: customerEmail,
    },
  });
  await db.orderProducts.createMany({
    data: dbProducts.map((product) => ({
      productId: product.id,
      quantity: randomIntFromInterval(1, 6),
      orderId: order.id,
    })),
  });
  const total = await products.reduce(
    async (runningTotal: number, current: Product) => {
      const resolvedRunningTotal = await runningTotal;
      if (current.cartQuantity) {
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
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    metadata: {
      internal_order_id: order.id,
    },
  });
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
