import mongoose from "mongoose";

/**
 * MongoDB is optional at build/dev time. When `MONGODB_URI` is absent the data
 * layer falls back to the original JSON file store so the storefront keeps
 * working with zero configuration. Set `MONGODB_URI` (and optionally
 * `MONGODB_DB`) to switch everything over to MongoDB.
 */
export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cache the connection across hot reloads in dev so we don't exhaust the pool.
const globalForMongoose = globalThis as unknown as { _mongoose?: MongooseCache };
const cached: MongooseCache =
  globalForMongoose._mongoose ?? { conn: null, promise: null };
globalForMongoose._mongoose = cached;

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || undefined,
      bufferCommands: false,
      serverSelectionTimeoutMS: 10_000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
