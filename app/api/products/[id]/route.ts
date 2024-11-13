import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

import { Product } from "@/src/shared/types";
import db from "@/src/utils/data/db";

// fetch single product by id
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findFirstOrThrow({
    where: { id: parseInt(id) },
  });
  const formattedProduct: Product = {
    ...product,
    id: product.id.toString(),
    cartQuantity: 0,
    stockQuantity: product.quantity,
  };
  return NextResponse.json({
    product: formattedProduct,
  });
}
