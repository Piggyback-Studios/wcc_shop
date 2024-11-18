import { NextRequest } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

import { SITE_INFO } from "@/src/shared/data/global.data";

export async function POST(req: NextRequest) {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY!,
  });

  const body = await req.json();
  const { email, message, name } = body;

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `${name} <mailgun@${process.env.MAILGUN_DOMAIN!}>`,
      to: SITE_INFO.EMAIL_ADDRESS,
      subject: `Williford Carpentry Collective Contact Form Submission - Project Inquiry from ${name}`,
      html: `
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
