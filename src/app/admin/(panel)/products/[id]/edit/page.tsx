import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getProductById } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const saved = sp.saved === "1";
  const created = sp.created === "1";

  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <>
      <nav className="text-[0.66rem] uppercase tracking-[0.22em] text-taupe">
        <Link href="/admin" className="hover:text-gold-deep">
          Products
        </Link>
        <span className="mx-2 text-taupe/40">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="font-display text-4xl text-ink">Edit product</h1>
        {saved && (
          <span className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-4 py-1.5 text-xs text-ink">
            <CheckCircle2 className="h-3.5 w-3.5" /> Saved
          </span>
        )}
        {created && (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5" /> Created — it&apos;s live on the store
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-taupe">
        <Link href={`/product/${product.slug}`} target="_blank" className="gold-underline text-ink">
          View live product page ↗
        </Link>
      </p>

      <ProductForm product={product} />
    </>
  );
}
