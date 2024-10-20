"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Define a secret key for JWT encryption
const secretKey = process.env.JWT_SECRET!;

// Encode the secret key as bytes
const key = new TextEncoder().encode(secretKey);

const sessionCookieName = `wcc_session_cookie`;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Set the algorithm for JWT signing
    .setIssuedAt() // Set the issuance time of the JWT
    .setExpirationTime(payload.expires) // Set the expiration time of the JWT
    .sign(key); // Sign the JWT using the secret key
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"], // Specify the allowed algorithms for JWT verification
  });
  return payload; // Return the decrypted payload
}

export async function login({ email }: { email: string }) {
  const user = { email };

  // Create the session
  const expires = Date.now() + 60 * 15 * 1000; // Set session expiration time (15 minutes from now)
  const session = await encrypt({ user, expires }); // Encrypt user data and set expiration time

  // Save the session in a cookie
  cookies().set(sessionCookieName, session, { expires, httpOnly: true }); // Set session cookie with expiration time and HTTP only flag
}

export async function logout() {
  // Destroy the session by clearing the session cookie
  cookies().set(sessionCookieName, "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get(sessionCookieName)?.value; // Retrieve the session cookie value

  if (!session) return null; // If session is not found, return null
  return await decrypt(session); // Decrypt and return the session payload
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(sessionCookieName)?.value; // Retrieve the session cookie value from the request
  if (!session) return; // If session is not found, return

  // Refresh the session expiration time
  const parsed = await decrypt(session); // Decrypt the session data
  parsed.expires = new Date(Date.now() + 10 * 1000); // Set a new expiration time (10 seconds from now)
  const res = NextResponse.next(); // Create a new response
  res.cookies.set({
    name: sessionCookieName,
    value: await encrypt(parsed), // Encrypt and set the updated session data
    httpOnly: true,
    expires: parsed.expires, // Set the expiration time
  });
  return res; // Return the response
}
