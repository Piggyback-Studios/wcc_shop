import { NextRequest, NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

import { SITE_INFO } from "@/src/shared/data/global.data";
import db from "@/src/utils/data/db";

export async function POST(req: NextRequest) {
  const reqJson = await req.json();
  const orderId = parseInt(reqJson.data.object.metadata.internal_order_id);
  await db.order.update({
    where: { id: orderId },
    data: {
      paymentId: reqJson.data.object.id,
      paid: true,
      orderDate: new Date(),
      shippingName: reqJson.data.object.shipping.name,
      shippingStreetAddress: reqJson.data.object.shipping.address.line1,
      shippingCountry: reqJson.data.object.shipping.address.country,
      shippingCity: reqJson.data.object.shipping.address.city,
      shippingState: reqJson.data.object.shipping.address.state,
      shippingPostalCode: reqJson.data.object.shipping.address.postal_code,
    },
  });
  const order = await db.order.findUniqueOrThrow({
    where: { id: orderId },
    include: {
      orderProducts: true,
    },
  });
  const ordersHtml = `
    ${order.orderProducts.map(async (orderProduct) => {
      const fullProduct = await db.product.findFirstOrThrow({
        where: { id: orderProduct.id },
      });
      return `
        <p>${fullProduct.name} - ${orderProduct.quantity}</p>\n
      `;
    })}
    <p>Total: $${reqJson.data.object.amount}</p>
  `;
  // email customer that order has been placed
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY!,
  });
  await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `<mailgun@${process.env.MAILGUN_DOMAIN!}>`,
    to: order.customerEmail,
    subject: `Your Order From Williford Carpentry Collective Has Been Placed`,
    html: `
        <h1>Your Order - #${order.id}</h1>\n
        ${ordersHtml}
        <p>Thank you for your order!</p>
      `,
  });
  // email us that order has been placed
  await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `<mailgun@${process.env.MAILGUN_DOMAIN!}>`,
    to: SITE_INFO.EMAIL_ADDRESS,
    subject: `Williford Carpentry Collective Has Received a New Order`,
    html: `
        <h1>Online Order - #${order.id}</h1>\n
        ${ordersHtml}
      `,
  });
  return Response.json(
    { message: "Success! Your email was sent.", status: 200 },
    { status: 200 }
  );
}
