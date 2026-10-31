"use client";

import { useEffect, useState } from "react";
import { getWishlist } from "@/lib/wishlist";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";

export function WishlistFilter({ products }: { products: Product[] }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
    const handler = () => setWishlist(getWishlist());
    window.addEventListener("wishlist-updated", handler);
    return () => window.removeEventListener("wishlist-updated", handler);
  }, []);

  const filtered = products.filter((p) => wishlist.includes(p.id));

  if (filtered.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-ink-line bg-white p-12 text-center">
        <p className="font-display text-2xl text-ink">Your wishlist is empty</p>
        <p className="mt-2 text-sm text-taupe">Start saving pieces you love</p>
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}