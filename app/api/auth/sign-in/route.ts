import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const unauthResponse = NextResponse.json({
    message: "Unauthorized. Try again.",
    status: 401,
  });
  let response: NextResponse = unauthResponse;
  try {
    const { email, password } = await req.json();
    const { rows } = await sql`select * from adminUsers where email=${email}`;
    const { password: storedHash, adminLevel, firstName, lastName } = rows[0];
    const result = await bcrypt.compare(password, storedHash);
    switch (result) {
      case true:
        response = NextResponse.json({
          message: "Success!",
          status: 200,
          userInfo: { adminLevel, firstName, lastName },
        });
      default:
        return response;
    }
  } catch (err) {
    console.log(err);
  }
  return response;
}
