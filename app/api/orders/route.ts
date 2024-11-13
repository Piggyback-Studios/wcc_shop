import { NextRequest, NextResponse } from "next/server";
import db from "@/src/utils/data/db";

export async function GET(req: NextRequest) {
  // get all orders in db
  const orders = await db.order.findMany();
  return NextResponse.json({ orders });
}
