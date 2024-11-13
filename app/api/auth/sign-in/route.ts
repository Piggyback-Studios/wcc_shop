import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { login } from "@/src/utils/auth";
import db from "@/src/utils/data/db";

export async function POST(req: NextRequest) {
  const unauthResponse = NextResponse.json({
    message: "Unauthorized. Try again.",
    status: 401,
  });
  let response: NextResponse = unauthResponse;
  try {
    const { email, password } = await req.json();
    const {
      password: storedPassword,
      firstName,
      lastName,
      userTypeId,
    } = await db.user.findFirstOrThrow({
      where: { email },
    });
    const { userType } = await db.userType.findFirstOrThrow({
      where: { id: userTypeId },
    });
    const result = await bcrypt.compare(password, storedPassword);
    switch (result) {
      case true:
        const emailStr = email as string;
        const session = await login({ email: emailStr });
        response = NextResponse.json({
          message: "Success!",
          status: 200,
          userInfo: { type: userType, firstName, lastName },
          session,
        });
      default:
        return response;
    }
  } catch (err) {
    console.log(err);
  }
  return response;
}
