import { Product } from "@/src/shared/types";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { put } from "@vercel/blob";
import { v4 as uuid } from "uuid";
import formidable, { File } from "formidable";

import { parseForm } from "@/src/utils/forms";
import { IncomingMessage } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  try {
    const { fields, files } = await parseForm(
      req as unknown as IncomingMessage
    );

    console.log(fields);
    console.log(files);

    const file = files.image as unknown as File;
    const name = fields.name?.join(" ")!;
    const description = fields.description?.join(" ")!;
    const unit_amount = fields.price as unknown as number;
    const active = fields.active as unknown as boolean;
    const stockQuantity = fields.stockQuantity as unknown as number;

    // create stripe product
    const stripe = new Stripe(process.env.STRIPE_SK!);
    const product = await stripe.products.create({
      name,
      description,
      default_price_data: {
        currency: "usd",
        unit_amount,
      },
      active,
    });

    // upload image
    const { url } = await put(
      `/images/products/${file.originalFilename}`,
      file.toString(),
      {
        access: "public",
      }
    );

    // add sql row
    sql`
  INSERT INTO products
  (id, stripe_id, name, description, price, image_url, quantity, active)
  VALUES (${uuid()}, ${product.id}, ${
      product.name
    }, ${description}, ${unit_amount}, ${url}, ${stockQuantity}, ${active});
  `;
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}
