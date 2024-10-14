import { Product } from "@/src/shared/types";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { put } from "@vercel/blob";

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
  const data = await req.json();
  console.log(data);
  const stripe = new Stripe(process.env.STRIPE_SK || "");

  // const product = await stripe.products.create({});

  // upload image
  // convert image to jpg
  // upload to blob storage
  // const { url } = await put("/images/products/${productTitleSlug}.jpg", file, {
  //   access: "public",
  // });

  // add sql row
  // sql`
  //       INSERT INTO products
  //       (id, stripe_id, name, description, price, image_url, quantity, active)
  //       VALUES (${uuid()}, ${product.id}, ${product.name}, ${
  //   product.description
  // }, ${price.unit_amount}, ${product.images[0]}, ${quantity}, ${
  //   product.active
  // });
  //     `;
  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}
