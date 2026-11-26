import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  return toNextJsHandler(await getAuth()).GET(request);
}

export async function POST(request) {
  return toNextJsHandler(await getAuth()).POST(request);
}
