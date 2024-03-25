import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  // calculate total with given product ids here
  const stripe = new Stripe(process.env.STRIPE_SK || "");
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: "usd",
  });
  console.log(paymentIntent.client_secret);
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    stuff: "hahaha",
  });
}
