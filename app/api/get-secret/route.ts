import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SK || "");
  // calculate total with given product ids and quantities here
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: "usd",
  });
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    stuff: "hahaha",
  });
}
