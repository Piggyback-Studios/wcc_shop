import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SK || "");
  const productList = await stripe.products.list();
  return NextResponse.json({
    products: productList.data,
  });
}
