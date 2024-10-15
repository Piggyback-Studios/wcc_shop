import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { rows } = await sql`select * from adminUsers where email=${email}`;
  console.log({ rows });
  // TODO: check password against password_hash
  return NextResponse.json({ message: "Success!", status: 200 });
}
