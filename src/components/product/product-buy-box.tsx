"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AddToCartButton } from "./add-to-cart";
import type { Product } from "@/lib/types";

export function ProductBuyBox({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <div className="flex h-14 items-center rounded-full border border-ink-line">
        <button
          onClick={() => setQty((n) => Math.max(1, n - 1))}
          aria-label="Decrease quantity"
          className="grid h-full w-12 place-items-center hover:text-gold"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center text-sm" aria-live="polite">
          {qty}
        </span>
        <button
          onClick={() => setQty((n) => Math.min(99, n + 1))}
          aria-label="Increase quantity"
          className="grid h-full w-12 place-items-center hover:text-gold"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <AddToCartButton product={product} quantity={qty} size="lg" className="flex-1 sm:flex-none" />
    </div>
  );
}