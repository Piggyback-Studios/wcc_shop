import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const products = sql`select * where status = active from products;`;
  console.log(products);
  return NextResponse.json({
    products: products,
  });
}
