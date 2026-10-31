import bcrypt from "bcryptjs";
import { connectMongo, isMongoConfigured } from "@/lib/mongoose";
import { UserModel, type UserRole } from "@/lib/models/user";
import { newId } from "@/lib/utils";

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getUserByEmail(email: string): Promise<SafeUser | null> {
  if (!isMongoConfigured()) return null;
  await connectMongo();
  const doc = await UserModel.findOne({ email: normalizeEmail(email) }).lean();
  if (!doc) return null;
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    role: doc.role,
    createdAt: doc.createdAt,
  };
}

export async function getPasswordHash(email: string): Promise<string | null> {
  if (!isMongoConfigured()) return null;
  await connectMongo();
  const doc = await UserModel.findOne({ email: normalizeEmail(email) })
    .select("passwordHash")
    .lean();
  return doc?.passwordHash ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}): Promise<SafeUser> {
  if (!isMongoConfigured()) {
    throw new Error("Account creation requires a configured database.");
  }
  await connectMongo();
  const email = normalizeEmail(input.email);
  const user = {
    _id: newId("user"),
    name: input.name.trim(),
    email,
    passwordHash: await hashPassword(input.password),
    role: input.role ?? "customer",
    createdAt: new Date().toISOString(),
  };
  await UserModel.create(user);
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export function adminEmail() {
  return normalizeEmail(process.env.ADMIN_EMAIL || "admin@tejora.com");
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "chandelier-admin";
}

let bootstrapChecked = false;

/**
 * Ensures a single admin account exists in MongoDB, seeded from
 * `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Runs at most once per server process.
 */
export async function ensureAdminBootstrap() {
  if (!isMongoConfigured() || bootstrapChecked) return;
  bootstrapChecked = true;
  try {
    await connectMongo();
    const existing = await UserModel.findOne({ role: "admin" }).lean();
    if (existing) return;
    await createUser({
      name: "Studio Admin",
      email: adminEmail(),
      password: adminPassword(),
      role: "admin",
    });
  } catch (error) {
    bootstrapChecked = false;
    console.error("[auth] admin bootstrap failed", error);
  }
}
