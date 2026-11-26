// Creates demo accounts for each role (run once after setting .env.local).
// Usage: npm run seed:users
import { MongoClient } from "mongodb";
import { getAuth } from "../lib/auth.js";

const auth = await getAuth();

const users = [
  { name: "GearLoop Admin", email: "admin@gearloop.demo", password: "Admin@123", role: "admin" },
  { name: "Rafiq Hasan", email: "owner@gearloop.demo", password: "Owner@123", role: "owner" },
  { name: "Nadia Karim", email: "owner2@gearloop.demo", password: "Owner@123", role: "owner" },
  { name: "Tanvir Ahmed", email: "customer@gearloop.demo", password: "Customer@123", role: "customer" },
];

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const col = client.db(process.env.DB_NAME || "gearloop").collection("user");

for (const u of users) {
  const exists = await col.findOne({ email: u.email });
  if (!exists) {
    await auth.api.signUpEmail({ body: { name: u.name, email: u.email, password: u.password } });
    console.log(`created ${u.email}`);
  }
  await col.updateOne({ email: u.email }, { $set: { role: u.role } });
  console.log(`role of ${u.email} = ${u.role}`);
}

await client.close();
process.exit(0);
