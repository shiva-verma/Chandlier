import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

export const dynamic = "force-dynamic";

export default async function TradeCataloguePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <header>
        <p className="eyebrow">Trade Catalogue</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Product catalogue</h1>
        <p className="mt-4 text-taupe">Browse our collection for trade enquiries</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}