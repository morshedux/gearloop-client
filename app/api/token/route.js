import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Issues a short-lived JWT access token for the signed-in user. The Express API verifies it.
export async function GET() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { email, role } = session.user;
  const expiresIn = 60 * 60; // 1 hour
  const token = jwt.sign({ email, role: role || "customer" }, process.env.JWT_SECRET, { expiresIn });
  return NextResponse.json({ token, expiresAt: Date.now() + expiresIn * 1000 });
}
