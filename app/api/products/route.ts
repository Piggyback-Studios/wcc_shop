import { Product } from "@/src/shared/types";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { put } from "@vercel/blob";
import { v4 as uuid } from "uuid";

// export const config = {
//   api: {
//     bodyParser: false, // Disable the default body parser
//   },
// };

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
        active: row.active,
      } as Product)
  );
  return NextResponse.json({
    products: formattedProducts,
  });
}

// create a product
export async function POST(req: NextRequest) {
  try {
    // pull form data
    const form = await req.formData();
    const image = form.get("image") as File;
    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const price = form.get("price") as unknown as number;
    const stockQuantity = form.get("stockQuantity") as unknown as number;
    const active = (form.get("active") as unknown as boolean) || false;

    // create stripe product
    const stripe = new Stripe(process.env.STRIPE_SK!);
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
    const imageFp = `/images/products/${image.name}`;
    const { url } = await put(imageFp, image, {
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

    const { rows } =
      await sql`SELECT stripe_id, price FROM products WHERE id=${productId}`;

    // edit stripe price + product
    const stripe = new Stripe(process.env.STRIPE_SK!);
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: priceAmt,
    });
    const product = await stripe.products.update(rows[0].stripe_id, {
      name,
      description,
      default_price: price.id,
      active,
    });

    // edit uploaded image
    const imageFp = `/images/products/${image.name}`;
    const { url } = await put(imageFp, image, {
      access: "public",
    });

    // modify sql row
    sql`
    UPDATE products
    SET name=${name}, description=${description}, price=${priceAmt}, image_url=${url}, quantity=${stockQuantity}, active=${active}
    WHERE id=${productId}
    ;
    `;
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}
