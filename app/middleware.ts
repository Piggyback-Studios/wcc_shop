import { NextRequest } from "next/server";
import { updateSession } from "@/src/utils/auth";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
