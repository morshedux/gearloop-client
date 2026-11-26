import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { MongoClient } from "mongodb";

function build() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    maxPoolSize: 5,
    maxIdleTimeMS: 5000,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  const db = client.db(process.env.DB_NAME || "gearloop");

  const auth = betterAuth({
    database: mongodbAdapter(db),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [process.env.BETTER_AUTH_URL, process.env.NEXT_PUBLIC_APP_URL].filter(Boolean),
    emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: true },
    // Keep users signed in for a year; the session is extended each day they are active.
    session: { expiresIn: 60 * 60 * 24 * 365, updateAge: 60 * 60 * 24 },
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

  return { client, auth };
}

// A serverless instance can resume with a dead Mongo connection ("Topology is closed").
// Before reusing the cached auth instance we ping the database and rebuild it if needed.
const holder = globalThis;

export async function getAuth() {
  const current = holder._gearloopAuth;
  if (current) {
    try {
      await current.client.db("admin").command({ ping: 1 });
      return current.auth;
    } catch {
      try {
        await current.client.close();
      } catch {}
      holder._gearloopAuth = undefined;
    }
  }
  holder._gearloopAuth = build();
  return holder._gearloopAuth.auth;
}
