import { NextRequest, NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

import { SITE_INFO } from "@/src/shared/data/global.data";
import db from "@/src/utils/data/db";

export async function POST(req: NextRequest) {
  // create order in our db
  console.log(req.body);
  const order = await db.order.create({
    data: {
      paymentId: "1234",
      paid: true,
      shipped: false,
      shippingStreetAddress: "123 Main St.",
      shippingMunicipality: "Colorado Springs",
      shippingZip: "80909",
      shippingState: "CO",
    },
  });
  // email customer that order has been placed
  // const mailgun = new Mailgun(formData);
  // const mg = mailgun.client({
  //   username: "api",
  //   key: process.env.MAILGUN_API_KEY!,
  // });
  // const body = await req.json();
  // const { email, message, name } = body;
  // try {
  //   const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
  //     from: `${name} <mailgun@${process.env.MAILGUN_DOMAIN!}>`,
  //     to: [SITE_INFO.EMAIL_ADDRESS],
  //     subject: `Your Order From Williford Carpentry Collective Has Been Placed`,
  //     html: `
  //       <h1>Contact Form Submission - ${name}</h1>\n
  //       <p>Contact Email: ${email}</p>\n
  //       <p>Message: ${message}</p>\n
  //     `,
  //   });
  //   console.log(msg);
  //   // return Response.json(
  //   //   { message: "Success! Your email was sent.", status: 200 },
  //   //   { status: 200 }
  //   // );
  // } catch (err) {
  //   console.log(err);
  //   return Response.json({ err }, { status: 400 });
  // }

  // // email us that order has been placed
  // try {
  //   const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
  //     from: `${name} <mailgun@${process.env.MAILGUN_DOMAIN!}>`,
  //     to: [SITE_INFO.EMAIL_ADDRESS],
  //     subject: `Williford Carpentry Collective Has Received a New Order`,
  //     html: `
  //       <h1>Contact Form Submission - ${name}</h1>\n
  //       <p>Contact Email: ${email}</p>\n
  //       <p>Message: ${message}</p>\n
  //     `,
  //   });
  //   console.log(msg);
  //   return Response.json(
  //     { message: "Success! Your email was sent.", status: 200 },
  //     { status: 200 }
  //   );
  // } catch (err) {
  //   console.log(err);
  //   return Response.json({ err }, { status: 400 });
  // }
}
