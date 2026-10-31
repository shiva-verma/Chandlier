import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/product-image";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./add-to-cart";
import { WishlistButton } from "./wishlist-button";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <article className="group relative flex flex-col">
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton productId={product.id} />
      </div>
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-2xl border border-ink-line transition-colors duration-500 group-hover:border-brass/60"
      >
        <ProductImage
          image={product.image}
          images={product.images}
          art={product.art}
          alt={product.name}
          showThumbnails={false}
          className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.badge && <Badge tone="dark">{product.badge}</Badge>}
          {onSale && <Badge tone="gold">Sale</Badge>}
        </div>
        <span className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-3 rounded-full bg-ink/85 py-3 text-center text-[0.68rem] uppercase tracking-[0.2em] text-brass opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View piece
        </span>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-[0.62rem] uppercase tracking-[0.24em] text-taupe">
          {product.collection} · {product.finish}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight">
          <Link href={`/product/${product.slug}`} className="hover:text-gold-deep">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-taupe">{product.tagline}</p>

        <div className="mt-3 flex items-center gap-2 text-xs text-taupe">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-taupe">({product.reviewCount})</span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-ink">{formatPrice(product.price)}</p>
            {onSale && (
              <p className="text-xs text-taupe line-through">
                {formatPrice(product.compareAtPrice!)}
              </p>
            )}
          </div>
          <AddToCartButton
            product={product}
            variant="outline"
            size="sm"
            label="Add"
            className="shrink-0"
          />
        </div>
      </div>
    </article>
  );
}
