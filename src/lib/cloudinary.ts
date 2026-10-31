import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary accepts either a single `CLOUDINARY_URL`
 * (`cloudinary://<key>:<secret>@<cloud_name>`) or three separate values. The
 * Cloudinary dashboard hands out the URL form by default, so honour both.
 */
export function isCloudinaryConfigured() {
  if (process.env.CLOUDINARY_URL) return true;
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

let configured = false;

export function cloudinaryClient() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }
  if (!configured) {
    // Only pass values that actually exist. Passing `undefined` would override
    // the credentials the SDK parsed from `CLOUDINARY_URL`.
    const config: Record<string, string | boolean> = { secure: true };
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      config.cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
    }
    if (process.env.CLOUDINARY_API_KEY) {
      config.api_key = process.env.CLOUDINARY_API_KEY;
    }
    if (process.env.CLOUDINARY_API_SECRET) {
      config.api_secret = process.env.CLOUDINARY_API_SECRET;
    }
    cloudinary.config(config);
    configured = true;
  }
  return cloudinary;
}

export const PRODUCT_IMAGE_FOLDER = "tejora/products";
