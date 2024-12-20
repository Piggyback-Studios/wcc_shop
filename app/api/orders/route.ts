import { NextRequest, NextResponse } from "next/server";

import db from "@/src/utils/data/db";

// get all orders in db
export async function GET(req: NextRequest) {
  try {
    const orders = await db.order.findMany();
    return NextResponse.json({ orders, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error:
        "There was an error fetching orders from the database. Please try again",
      status: 500,
    });
  }
}
