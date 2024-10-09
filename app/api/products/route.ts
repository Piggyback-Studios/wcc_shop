import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const products = await sql`select * from products where active = true;`;
  console.log(products.rows);
  return NextResponse.json({
    products: products.rows,
  });
}
