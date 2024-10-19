import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/src/utils/auth";

export async function POST(req: NextRequest) {
  try {
    await logout();
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({
    message: "User logged out.",
    status: 200,
  });
}
