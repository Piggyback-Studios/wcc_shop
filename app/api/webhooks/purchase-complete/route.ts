import { NextRequest, NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

import { SITE_INFO } from "@/src/shared/data/global.data";

export async function POST(req: NextRequest) {
  console.log(req);
  // email customer that order has been placed
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY!,
  });

  const body = await req.json();
  const { email, message, name } = body;

  //   email customer that order has been placed
  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `${name} <mailgun@${process.env.MAILGUN_DOMAIN!}>`,
      to: [SITE_INFO.EMAIL_ADDRESS],
      subject: `Your Order From Williford Carpentry Collective Has Been Placed`,
      html: `
    //   TODO: go through items here
        <h1>Contact Form Submission - ${name}</h1>\n
        <p>Contact Email: ${email}</p>\n
        <p>Message: ${message}</p>\n
      `,
    });
    console.log(msg);
    // return Response.json(
    //   { message: "Success! Your email was sent.", status: 200 },
    //   { status: 200 }
    // );
  } catch (err) {
    console.log(err);
    return Response.json({ err }, { status: 400 });
  }

  // email us that order has been placed
  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `${name} <mailgun@${process.env.MAILGUN_DOMAIN!}>`,
      to: [SITE_INFO.EMAIL_ADDRESS],
      subject: `Williford Carpentry Collective Has Received a New Order`,
      html: `
    //   TODO: go through items here
        <h1>Contact Form Submission - ${name}</h1>\n
        <p>Contact Email: ${email}</p>\n
        <p>Message: ${message}</p>\n
      `,
    });
    console.log(msg);
    return Response.json(
      { message: "Success! Your email was sent.", status: 200 },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ err }, { status: 400 });
  }
}
