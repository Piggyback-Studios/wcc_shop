import { NextRequest, NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import formData from "form-data";

import db from "@/src/utils/data/db";
import { getSession } from "@/src/utils/auth";
import { SITE_INFO } from "@/src/shared/data/global.data";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // fetch single order
  // email customer that order has shipped
  const order = db.order.findFirstOrThrow({ where: { id: parseInt(id) } });
  return NextResponse.json({ order });
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
    await db.order.update({
      where: { id: parseInt(id) },
      data: {
        shipped: true,
        shippedDate: new Date(),
      },
    });
    const {} = db.order.findFirstOrThrow({ where: { id: parseInt(id) } });
    // email customer that order has been shipped
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY!,
    });
    const body = await req.json();
    const { email, message, name } = body;
    const customerMsg = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `${name} <mailgun@${process.env.MAILGUN_DOMAIN!}>`,
      to: [SITE_INFO.EMAIL_ADDRESS],
      subject: `Your Order From Williford Carpentry Collective Has Been Shipped`,
      html: `
        <h1>Contact Form Submission - ${name}</h1>\n
        <p>Contact Email: ${email}</p>\n
        <p>Message: ${message}</p>\n
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
