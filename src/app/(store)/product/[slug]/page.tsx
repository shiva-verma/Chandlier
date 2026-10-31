import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, ShieldCheck, RotateCcw, Zap } from "lucide-react";
import { getProductBySlug, getRelated } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/product-image";
import { Badge } from "@/components/ui/badge";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { EnquireLinks } from "@/components/product/enquire-links";
import { ProductCard } from "@/components/product/product-card";
import { WishlistButton } from "@/components/product/wishlist-button";
import { ShareButton } from "@/components/product/share-button";
import { RecentlyViewedTracker } from "@/components/product/recently-viewed-tracker";
import { RecentlyViewed } from "@/components/store/recently-viewed";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelated(product);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const specs: Array<[string, string]> = [
    ["Dimensions", product.dimensions],
    ["Finish", product.finish],
    ["Material", product.material],
    ["Wattage", product.wattage],
    ["Lumens", product.lumens],
    ["Colour temperature", product.colorTemp],
    ["Bulb type", product.bulbType],
    ["Smart", product.smart ? "App + voice, Matter enabled" : "Classic dimmable"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <RecentlyViewedTracker productId={product.id} />
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/" className="hover:text-gold-deep">
          Home
        </Link>
        <span className="mx-2 text-taupe/40">/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-gold-deep"
        >
          {product.collection}
        </Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ------------------------------------------------- Gallery */}
        <div className="relative">
          <ProductImage
            image={product.image}
            images={product.images}
            art={product.art}
            alt={product.name}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute left-5 top-5 flex flex-col gap-2">
            {product.badge && <Badge tone="dark">{product.badge}</Badge>}
            {onSale && <Badge tone="gold">Sale</Badge>}
          </div>
          {Array.isArray(product.images) && product.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[product.image, ...product.images]
                .filter((img): img is string => Boolean(img && typeof img === "string"))
                .slice(0, 3)
                .map((img, i) => (
                  <div
                    key={`${img}-${i}`}
                    className="aspect-square overflow-hidden rounded-xl border border-ink-line bg-white"
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* --------------------------------------------------- Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">
                {product.collection} · {product.category.replace("-", " ")}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
                {product.name}
              </h1>
            </div>
            <WishlistButton productId={product.id} className="mt-6" />
          </div>
          <p className="mt-4 max-w-lg text-lg text-taupe">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-2 text-sm text-taupe">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
            <span>· {product.reviewCount} reviews</span>
            <span className="text-taupe">· SKU {product.slug}</span>
          </div>

          <div className="mt-7 flex items-end gap-4">
            <p className="font-display text-4xl text-ink">{formatPrice(product.price)}</p>
            {onSale && (
              <p className="pb-1 text-lg text-taupe line-through">
                {formatPrice(product.compareAtPrice!)}
              </p>
            )}
          </div>

          <p
            className={
              product.stock > 0
                ? "mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink"
                : "mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-red-600"
            }
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.stock > 0 ? "bg-brass" : "bg-red-500"
              }`}
            />
            {product.stock > 0
              ? `In stock · ships in 5–7 days`
              : "Currently sold out"}
          </p>

          <p className="mt-6 leading-relaxed text-taupe">{product.description}</p>

          <ProductBuyBox product={product} />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <EnquireLinks product={product} />
            <ShareButton productName={product.name} />
          </div>

          <ul className="mt-8 grid gap-3 border-t border-ink-line pt-7 sm:grid-cols-2">
            {[
              { icon: Truck, label: "White-glove, insured delivery" },
              { icon: ShieldCheck, label: "2-year craft warranty" },
              { icon: RotateCcw, label: "30-day easy returns" },
              { icon: Zap, label: product.smart ? "App & voice control included" : "Dimmable by default" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm text-taupe">
                <item.icon className="h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --------------------------------------------------- Specs */}
      <section className="mt-20 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <p className="eyebrow">Specifications</p>
          <h2 className="mt-3 font-display text-4xl text-ink">Precise, as it should be.</h2>
          <p className="mt-4 text-sm leading-relaxed text-taupe">
            Every fixture is specified, finished and bench-tested in our Mumbai
            studio before it ships.
          </p>
        </div>
        <dl className="lg:col-span-2 grid content-start gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
          {specs.map(([k, v]) => (
            <div key={k} className="bg-white px-6 py-5">
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-taupe">
                {k}
              </dt>
              <dd className="mt-2 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* -------------------------------------------------- Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Pairs well with</p>
              <h2 className="mt-3 font-display text-4xl text-ink">Complete the room</h2>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed products={[product, ...related]} />
    </div>
  );
}
