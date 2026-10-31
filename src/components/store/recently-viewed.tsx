"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import { ProductCard } from "@/components/product/product-card";

export function RecentlyViewed({ products }: { products: Product[] }) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    setRecentIds(getRecentlyViewed());
    const handler = () => setRecentIds(getRecentlyViewed());
    window.addEventListener("recently-viewed-updated", handler);
    return () => window.removeEventListener("recently-viewed-updated", handler);
  }, []);

  const recent = products.filter((p) => recentIds.includes(p.id)).sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id));

  if (recent.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Recently viewed</p>
          <h2 className="mt-3 font-display text-4xl text-ink">Your browsing history</h2>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {recent.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}