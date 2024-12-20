import { NextRequest, NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import formData from "form-data";

import db from "@/src/utils/data/db";
import { getSession } from "@/src/utils/auth";

// fetch single order
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const order = await db.order.findFirstOrThrow({
    where: { id: parseInt(id) },
  });
  const orderProducts = await db.orderProducts.findMany({
    where: { orderId: order.id },
  });
  const products: any[] = [];
  for (let i = 0; i < orderProducts.length; i++) {
    const orderProduct = orderProducts[i];
    const dbProduct = await db.product.findFirstOrThrow({
      where: { id: orderProduct.productId || 0 },
    });
    products.push({ ...dbProduct, quantity: orderProduct.quantity });
  }
  return NextResponse.json({ order, products });
}

// edit an order
export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({
      status: 401,
      message: "Unauthorized.",
    });
  try {
    // pull form data
    const form = await req.formData();
    const trackingCode = form.get("trackingCode") as string;
    const order = await db.order.update({
      where: { id: parseInt(id) },
      data: {
        shipped: true,
        shippedDate: new Date(),
        trackingCode,
      },
    });
    const { customerEmail } = await db.order.findFirstOrThrow({
      where: { id: parseInt(id) },
    });
    // email customer that order has been shipped
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
    });
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `Williford Carpentry Collective <mailgun@${process.env
        .MAILGUN_DOMAIN!}>`,
      to: customerEmail,
      subject: `Your Order From Williford Carpentry Collective Has Been Shipped`,
      html: `
        <h1>Order #${order.id}</h1>\n
        <p>Contact Email: willifordcarpentrycollective@piggybackstudios.co</p>\n
        <p>Shipping Code: ${trackingCode}</p>\n
      `,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
  return NextResponse.json({
    status: 200,
    message: "Success!",
  });
}
