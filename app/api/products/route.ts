import { Product } from "@/src/shared/types";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { put } from "@vercel/blob";
import { v4 as uuid } from "uuid";

// fetch all active products
export async function GET(req: NextRequest) {
  const products = await sql`select * from products where active = true;`;

  const formattedProducts: Product[] = products.rows.map(
    (row) =>
      ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        stockQuantity: row.quantity,
        cartQuantity: 0,
        stripeId: row.stripe_id,
        price: row.price / 100,
        priceId: row.price_id,
      } as Product)
  );
  return NextResponse.json({
    products: formattedProducts,
  });
}

// create a product
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("image") as File;
  const name = data.get("name") as unknown as string;
  const price = data.get("price") as unknown as number;
  const description = data.get("description") as unknown as string;
  const stockQuantity = data.get("stockQuantity") as unknown as number;
  const active = data.get("active") as unknown as boolean;
  const stripe = new Stripe(process.env.STRIPE_SK || "");

  console.log({
    name,
    price,
    description,
    stockQuantity,
    active,
  });

  // TODO: file.name is undefined so we aren't sure how to save the image file

  // create stripe product
  const product = await stripe.products.create({
    name,
    description,
    default_price_data: {
      currency: "usd",
      unit_amount: price,
    },
    active,
  });

  // upload image
  const { url } = await put(`/images/products/${file.name}`, file, {
    access: "public",
  });

  // add sql row
  sql`
  INSERT INTO products
  (id, stripe_id, name, description, price, image_url, quantity, active)
  VALUES (${uuid()}, ${product.id}, ${
    product.name
  }, ${description}, ${price}, ${url}, ${stockQuantity}, ${active});
  `;
  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}
