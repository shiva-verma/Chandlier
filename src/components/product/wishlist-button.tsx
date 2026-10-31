"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { isInWishlist, toggleWishlist } from "@/lib/wishlist";

export function WishlistButton({ productId, className }: { productId: string; className?: string }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInWishlist(isInWishlist(productId));
    const handler = () => setInWishlist(isInWishlist(productId));
    window.addEventListener("wishlist-updated", handler);
    return () => window.removeEventListener("wishlist-updated", handler);
  }, [productId]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
        inWishlist
          ? "border-red-500 bg-red-50 text-red-600"
          : "border-ink-line bg-white text-taupe hover:border-red-400 hover:text-red-500",
        className,
      )}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
    </button>
  );
}