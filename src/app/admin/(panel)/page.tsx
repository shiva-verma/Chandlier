import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS, type CategorySlug } from "@/lib/types";
import { ProductArt } from "@/components/ui/product-art";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q ?? "").toLowerCase();
  const products = await getProducts();
  const filtered = q
    ? products.filter((p) =>
        [p.name, p.collection, p.category, p.finish].join(" ").toLowerCase().includes(q),
      )
    : products;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="mt-2 font-display text-4xl">Products</h1>
          <p className="mt-2 text-sm text-ivory-dim">
            {products.length} pieces live · sell-through sorted first
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-7 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
        >
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <form className="relative mt-8 sm:w-80" action="/admin">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory-dim" />
        <input
          name="q"
          defaultValue={sp.q}
          placeholder="Search products…"
          className="h-11 w-full rounded-full border border-ink-line bg-ink-soft/60 pl-11 pr-10 text-sm placeholder:text-ivory-dim/50 focus:border-gold/70 focus:outline-none"
        />
        {q && (
          <Link
            href="/admin"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.62rem] uppercase tracking-[0.18em] text-gold"
          >
            Clear
          </Link>
        )}
      </form>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-ink-line py-20 text-center text-ivory-dim">
          No pieces match &ldquo;{q}&rdquo;.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-ink-line">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-line text-[0.62rem] uppercase tracking-[0.22em] text-ivory-dim">
                <th className="px-5 py-4 font-medium">Piece</th>
                <th className="px-5 py-4 font-medium">Price</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Stock</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-ink-soft/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="h-14 w-12 shrink-0 overflow-hidden rounded-lg border border-ink-line bg-ink-soft"
                      >
                        <ProductArt variant={p.art} />
                      </Link>
                      <div>
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="font-display text-lg hover:text-gold"
                        >
                          {p.name}
                        </Link>
                        <p className="text-xs text-ivory-dim">
                          {p.collection} · {formatPrice(p.price)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gold">{formatPrice(p.price)}</td>
                  <td className="px-5 py-4 text-ivory-dim">
                    {CATEGORY_LABELS[p.category as CategorySlug]}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        p.stock > 5
                          ? "text-ivory"
                          : p.stock > 0
                            ? "text-gold"
                            : "text-red-300"
                      }
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.featured && <Badge tone="muted">Featured</Badge>}
                      {p.smart && <Badge tone="gold">Smart</Badge>}
                      {p.badge && <Badge tone="dark">{p.badge}</Badge>}
                      {!p.featured && !p.smart && !p.badge && (
                        <span className="text-xs text-ivory-dim">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="rounded-full border border-ink-line px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-ivory-dim transition-colors hover:border-gold hover:text-gold"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}