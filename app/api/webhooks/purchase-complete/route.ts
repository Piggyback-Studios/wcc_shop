import { NextRequest, NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

import { SITE_INFO } from "@/src/shared/data/global.data";
import db from "@/src/utils/data/db";

export async function POST(req: NextRequest) {
  // create order in our db
  const reqJson = await req.json();
  const order = await db.order.update({
    where: { id: parseInt(reqJson.data.object.metadata.internal_order_id) },
    data: {
      paymentId: "1234",
      paid: true,
      orderDate: new Date(),
      shippingName: reqJson.data.object.shipping.name,
      shippingStreetAddress: reqJson.data.object.shipping.address.line1,
      shippingCountry: reqJson.data.object.shipping.address.country,
      shippingCity: reqJson.data.object.shipping.address.city,
      shippingState: reqJson.data.object.shipping.address.state,
      shippingPostalCode: reqJson.data.object.shipping.address.postalCode,
    },
  });
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
      `,
  });
  // email us that order has been placed
  await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `<mailgun@${process.env.MAILGUN_DOMAIN!}>`,
    to: [SITE_INFO.EMAIL_ADDRESS],
    subject: `Williford Carpentry Collective Has Received a New Order`,
    html: `
        <h1>Online Order - #${order.id}</h1>\n
      `,
  });
  return Response.json(
    { message: "Success! Your email was sent.", status: 200 },
    { status: 200 }
  );
}
