import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { attachDatabasePool } from "@vercel/functions";
import { MongoClient } from "mongodb";

// One shared client per serverless instance. Short idle timeouts and the pool hook keep
// connections healthy when a function is frozen and resumed on Vercel.
const globalForMongo = globalThis;
if (!globalForMongo._gearloopMongo) {
  const mongo = new MongoClient(process.env.MONGODB_URI, {
    maxPoolSize: 5,
    maxIdleTimeMS: 5000,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  try {
    attachDatabasePool(mongo);
  } catch {}
  globalForMongo._gearloopMongo = mongo;
}
const client = globalForMongo._gearloopMongo;
const db = client.db(process.env.DB_NAME || "gearloop");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.BETTER_AUTH_URL, process.env.NEXT_PUBLIC_APP_URL].filter(Boolean),
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      // Everyone starts as a customer, including Google sign-ups. Only an admin can change it.
      role: { type: "string", required: false, defaultValue: "customer", input: false },
      phone: { type: "string", required: false, defaultValue: "" },
      address: { type: "string", required: false, defaultValue: "" },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const password = ctx.body?.password || "";
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
          throw new APIError("BAD_REQUEST", {
            message: "Password must be 6+ characters with an uppercase and a lowercase letter",
          });
        }
      }
    }),
  },
});
