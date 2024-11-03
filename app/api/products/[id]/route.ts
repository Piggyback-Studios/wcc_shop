import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

import { Product } from "@/src/shared/types";

// fetch single product by id
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await sql`SELECT * FROM products WHERE id=${id};`;
  const formattedProduct: Product = product.rows.map(
    (row: any) =>
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
  )[0];
  return NextResponse.json({
    product: formattedProduct,
  });
}
