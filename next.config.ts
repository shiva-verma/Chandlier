import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The storefront reads its catalog from disk at request time, so we opt out
  // of the Cache Components model to keep rendering predictable.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Allow admins to paste external image URLs for products.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
};

export default nextConfig;
