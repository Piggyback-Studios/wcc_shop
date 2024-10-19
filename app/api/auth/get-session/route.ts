import { NextRequest, NextResponse } from "next/server";
import { getSession, logout } from "@/src/utils/auth";

export async function POST(req: NextRequest) {
  const unauthResponse = NextResponse.json({
    message: "Unauthorized. Try again.",
    status: 401,
  });
  let response: NextResponse = unauthResponse;
  try {
    await getSession();
  } catch (err) {
    console.log(err);
  }
  return response;
}
