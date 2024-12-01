import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { put } from "@vercel/blob";

import { Product } from "@/src/shared/types";
import { getSession } from "@/src/utils/auth";
import db from "@/src/utils/data/db";
import { parseBool } from "@/src/utils/parse";

// MASTER TODO MVP LIST
// TODO: protect all necessary backend endpoints with session auth
// TODO: finish order confirmation page
// TODO: protect webhook by verifying secret passed from stripe
// TODO: fix display of totals
// TODO: add shipping cost to checkout

// testing 
// TODO: write tests for api endpoints and block-level components (playwright for e2e and integration testing and cypress for component testing)
// TODO: test extensively in browserstack and fix all bugs

// fetch all products
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const adminList = searchParams.get("adminList");
  if (adminList) {
    const products = await db.product.findMany();
    const formattedProducts: Product[] = products.map(
      ({
        id,
        name,
        description,
        imageUrl,
        quantity,
        stripeId,
        price,
        priceId,
        active,
      }) =>
        ({
          id,
          name,
          description,
          imageUrl,
          stockQuantity: quantity,
          cartQuantity: 0,
          stripeId,
          price: price / 100,
          priceId,
          active,
        } as unknown as Product)
    );
    return NextResponse.json({
      products: formattedProducts,
    });
  } else {
    const products = await db.product.findMany({ where: { active: true } });
    const formattedProducts: Product[] = products.map(
      ({
        id,
        name,
        description,
        imageUrl,
        quantity,
        stripeId,
        price,
        priceId,
        active,
      }) =>
        ({
          id,
          name,
          description,
          imageUrl,
          stockQuantity: quantity,
          cartQuantity: 0,
          stripeId,
          price: price / 100,
          priceId,
          active,
        } as unknown as Product)
    );
    return NextResponse.json({
      products: formattedProducts,
    });
  }
}

// create a product
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({
      status: 401,
      message: "Unauthorized.",
    });
  try {
    // pull form data
    const form = await req.formData();
    const image = form.get("image") as File;
    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const price = form.get("price") as unknown as number;
    const stockQuantity = form.get("stockQuantity") as unknown as string;
    const active = (form.get("active") as unknown as boolean) || false;

    const priceInt = Math.ceil(price * 100);

    // create stripe product
    const stripe = new Stripe(process.env.STRIPE_SK!);
    const product = await stripe.products.create({
      name,
      description,
      default_price_data: {
        currency: "usd",
        unit_amount: priceInt,
      },
      active,
    });

    // upload image
    const imageFp = `/images/products/${image.name}`;
    const { url } = await put(imageFp, image, {
      access: "public",
    });

    // update db
    await db.product.create({
      data: {
        name: product.name,
        stripeId: product.id,
        description: description,
        price: priceInt,
        imageUrl: url,
        priceId: product.default_price as string,
        quantity: parseInt(stockQuantity),
        active: parseBool(active.toString()),
      },
    });
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}

// edit a product
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({
      status: 401,
      message: "Unauthorized.",
    });
  try {
    // pull form data
    const form = await req.formData();
    const image = form.get("image") as File;
    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const priceAmt = form.get("price") as unknown as number;
    const stockQuantity = form.get("stockQuantity") as unknown as number;
    const active = (form.get("active") as unknown as boolean) || false;
    const productId = form.get("id") as string;

    const priceInt = Math.ceil(priceAmt * 100);

    const { stripeId } = await db.product.findFirstOrThrow({
      where: { id: parseInt(productId) },
    });

    // edit stripe price + product
    const stripe = new Stripe(process.env.STRIPE_SK!);
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: priceInt,
      product: stripeId,
    });
    await stripe.products.update(stripeId, {
      name,
      description,
      default_price: price.id,
      active,
    });

    if (image) {
      // edit uploaded image
      const imageFp = `/images/products/${image.name}`;
      const { url } = await put(imageFp, image, {
        access: "public",
      });
      await db.product.update({
        where: { id: parseInt(productId) },
        data: {
          name,
          description,
          price: priceInt,
          imageUrl: url,
          quantity: parseInt(stockQuantity.toString()),
          active: parseBool(active.toString()),
        },
      });
    } else {
      await db.product.update({
        where: { id: parseInt(productId) },
        data: {
          name,
          description,
          price: priceInt,
          // idk why I have to do this - for some reason prisma sees these values as strings. need to look into it.
          quantity: parseInt(stockQuantity.toString()),
          active: parseBool(active.toString()),
        },
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}
