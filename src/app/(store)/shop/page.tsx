import Link from "next/link";
import { cn } from "@/lib/utils";
import { getProducts, filterProducts } from "@/lib/products";
import { PriceRangeSlider } from "@/components/ui/price-range-slider";
import { CATEGORIES, COLLECTIONS, FINISHES, CATEGORY_LABELS } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { ShopControls } from "@/components/store/shop-controls";

export const dynamic = "force-dynamic";

type Search = Record<string, string | string[] | undefined>;

function first(sp: Search, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

function buildQuery(sp: Search, updates: Record<string, string | undefined>) {
  const next = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (Array.isArray(v)) continue;
    if (v) next.set(k, v);
  }
  for (const [k, v] of Object.entries(updates)) {
    if (v) next.set(k, v);
    else next.delete(k);
  }
  const qs = next.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ink-line py-5">
      <p className="eyebrow">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-[0.72rem] tracking-wide transition-colors",
        active
          ? "border-brass bg-brass/15 text-mocha"
          : "border-ink-line text-taupe hover:border-brass/60 hover:text-gold-deep",
      )}
    >
      {children}
    </Link>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const category = first(sp, "category");
  const collection = first(sp, "collection");
  const finish = first(sp, "finish");
  const smart = first(sp, "smart") === "1";
  const q = first(sp, "q");
  const sort = first(sp, "sort");
  const budget = first(sp, "budget");

  let min: number | undefined;
  let max: number | undefined;
  if (budget === "under-40k") max = 4000000;
  else if (budget === "40-100k") {
    min = 4000000;
    max = 10000000;
  } else if (budget === "over-100k") min = 10000000;

  const [products, all] = await Promise.all([
    filterProducts({ category, collection, finish, smart, q, sort, min, max }),
    getProducts(),
  ]);

  const categoryLabel = category && CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]
    ? CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]
    : "The Collection";

  const countFor = (slug: string) => all.filter((p) => p.category === slug).length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">{categoryLabel}</h1>
        <p className="mt-4 text-taupe">
          {products.length} piece{products.length === 1 ? "" : "s"} — every fixture
          is stocked in-house and shipped white-glove nationwide.
        </p>
      </header>

      <div className="mt-10 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* --------------------------------------------------- Filters */}
        <aside className="hidden lg:block">
          <p className="eyebrow">Refine</p>
          <div className="mb-6">
            <PriceRangeSlider min={0} max={500000} />
          </div>

          <FilterGroup title="Category">
            <Chip href={buildQuery(sp, { category: undefined })} active={!category}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.slug}
                href={buildQuery(sp, { category: c.slug })}
                active={category === c.slug}
              >
                {c.name} · {countFor(c.slug)}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="Collection">
            {COLLECTIONS.map((c) => (
              <Chip
                key={c}
                href={buildQuery(sp, { collection: c })}
                active={collection === c}
              >
                {c}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="Finish">
            {FINISHES.map((f) => (
              <Chip key={f} href={buildQuery(sp, { finish: f })} active={finish === f}>
                {f}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="Features">
            <Chip href={buildQuery(sp, { smart: smart ? undefined : "1" })} active={smart}>
              Smart enabled
            </Chip>
          </FilterGroup>

          <FilterGroup title="Budget">
            {[
              { value: "under-40k", label: "Under ₹40k" },
              { value: "40-100k", label: "₹40k – ₹1L" },
              { value: "over-100k", label: "Over ₹1L" },
            ].map((b) => (
              <Chip key={b.value} href={buildQuery(sp, { budget: b.value })} active={budget === b.value}>
                {b.label}
              </Chip>
            ))}
            {budget && (
              <Chip href={buildQuery(sp, { budget: undefined })} active={false}>
                Clear
              </Chip>
            )}
          </FilterGroup>
        </aside>

        {/* ------------------------------------------------ Mobile filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {CATEGORIES.map((c) => (
            <Chip
              key={c.slug}
              href={buildQuery(sp, { category: c.slug })}
              active={category === c.slug}
            >
              {c.name}
            </Chip>
          ))}
          <Chip
            href={buildQuery(sp, { smart: smart ? undefined : "1" })}
            active={smart}
          >
            Smart
          </Chip>
        </div>

        {/* --------------------------------------------------- Results */}
        <div>
          <ShopControls />

          {(q || collection || finish || category || budget || smart) && (
            <p className="mt-4 text-sm text-taupe">
              Filters active —{" "}
              <Link
                href="/shop"
                className="gold-underline text-ink"
              >
                clear all
              </Link>
            </p>
          )}

          {products.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-ink-line py-20 text-center">
              <p className="font-display text-3xl text-ink">Nothing matches — yet.</p>
              <p className="mt-3 text-sm text-taupe">
                Loosen a filter, or ask the studio to make it for you.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center rounded-full border border-brass/60 px-7 text-[0.72rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass/15 hover:border-brass"
              >
                Enquire
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
