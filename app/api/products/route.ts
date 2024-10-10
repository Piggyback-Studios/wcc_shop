import { Product } from "@/src/shared/types";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

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
