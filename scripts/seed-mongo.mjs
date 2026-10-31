/**
 * One-time migration: copy `data/products.json` into MongoDB and ensure an
 * admin account exists.
 *
 *   npm run seed
 *
 * Requires MONGODB_URI (and optionally MONGODB_DB, ADMIN_EMAIL, ADMIN_PASSWORD)
 * in `.env.local` or `.env`.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("✗ MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }

  const productsFile = path.join(root, "data", "products.json");
  let products = [];
  try {
    products = JSON.parse(await fs.readFile(productsFile, "utf8"));
  } catch {
    console.warn("! data/products.json not found — skipping product import.");
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || undefined,
  });
  const db = mongoose.connection.db;

  // --- products ---------------------------------------------------------
  let inserted = 0;
  if (Array.isArray(products) && products.length) {
    const productsCol = db.collection("products");
    for (const product of products) {
      const { id, collection, ...rest } = product;
      const _id = id || rest.slug;
      const result = await productsCol.replaceOne(
        { _id },
        { _id, collectionName: collection ?? "", ...rest },
        { upsert: true },
      );
      if (result.upsertedCount) inserted += 1;
    }
    await productsCol.createIndex({ slug: 1 }, { unique: true });
  }

  // --- admin user -------------------------------------------------------
  const email = (process.env.ADMIN_EMAIL || "admin@tejora.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "chandelier-admin";
  const users = db.collection("users");
  await users.createIndex({ email: 1 }, { unique: true });
  const existing = await users.findOne({ role: "admin" });
  if (!existing) {
    await users.insertOne({
      _id: `user_${Date.now().toString(36)}`,
      name: "Studio Admin",
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    console.log(`✓ Admin account created: ${email}`);
  } else {
    console.log(`• Admin account already exists: ${existing.email}`);
  }

  console.log(`✓ Imported ${inserted} new product(s) (of ${products.length}).`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error("✗ Seed failed:", error);
  process.exit(1);
});
